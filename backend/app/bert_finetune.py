import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from torch.optim import AdamW
from torch.nn import BCEWithLogitsLoss
import torch
import numpy as np
from transformers import BertModel
import torch.nn as nn
from transformers import BertTokenizer
from torch.utils.data import Dataset, DataLoader
import os
from sklearn.model_selection import train_test_split

curr_dir = os.path.dirname(os.path.realpath(__file__))
data_path = os.path.join(curr_dir, "data/reframing_dataset.csv")

df = pd.read_csv(data_path)
df['text'] = df['situation'] + " " + df['thought']
df['labels'] = df['thinking_traps_addressed'].apply(lambda x: x.split(','))
mlb = MultiLabelBinarizer()
labels = mlb.fit_transform(df['labels'])

train_texts, val_texts, train_labels, val_labels = train_test_split(df['text'], labels, test_size=0.1)

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

train_encodings = tokenizer(train_texts.tolist(), truncation=True, padding=True, max_length=512)
val_encodings = tokenizer(val_texts.tolist(), truncation=True, padding=True, max_length=512)

class BertForMultiLabelClassification(nn.Module):
    def __init__(self, num_labels):
        super(BertForMultiLabelClassification, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.classifier = nn.Linear(self.bert.config.hidden_size, num_labels)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs.pooler_output
        logits = self.classifier(pooled_output)
        return logits

class ReframingDataset(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx], dtype=torch.float)
        return item

    def __len__(self):
        return len(self.labels)

train_dataset = ReframingDataset(train_encodings, train_labels)
val_dataset = ReframingDataset(val_encodings, val_labels)

model = BertForMultiLabelClassification(num_labels=len(mlb.classes_))

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

optimizer = AdamW(model.parameters(), lr=5e-5)
loss_fn = BCEWithLogitsLoss()

early_stopping_counter = 0
best_loss = np.inf
patience = 2

for epoch in range(10):  
    model.train()
    for batch in DataLoader(train_dataset, batch_size=16, shuffle=True):
        optimizer.zero_grad()
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)
        outputs = model(input_ids, attention_mask)
        loss = loss_fn(outputs, labels)
        loss.backward()
        optimizer.step()
    print(f'Epoch {epoch}, Loss: {loss.item()}')

    if loss.item() < best_loss:
        best_loss = loss.item()
        early_stopping_counter = 0
    else:
        early_stopping_counter += 1
    if early_stopping_counter >= patience:
        print("Stopping early.")
        break
    
output_path = os.path.join(curr_dir, "bert_finetuned.pth")
torch.save(model.state_dict(), output_path)