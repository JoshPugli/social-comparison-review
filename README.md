# React + Django Application

This project is a full-stack application with a React frontend and a Django backend.

## Getting Started with the React Frontend

Before you start, make sure you have [Node.js](https://nodejs.org/) installed. This will include `npm`, which is necessary to install the dependencies and run the React application.

### Installing Dependencies

Navigate to the `frontend` directory where the `package.json` file is located and run the following command to install the required dependencies:

```bash
cd frontend
npm install --legacy-peer-deps
```

### Running the Development Server
After installing the dependencies, you can start the development server by running:
```bash
npm start
```
Now you're ready to work on the frontend!

---

## Setting Up the Django Backend

To set up the Django backend, you need Python installed on your machine. If you don't have Python installed, you can download it from python.org. Additionally, using a virtual environment is recommended to keep dependencies organized and separated from other projects.

### Installing Dependencies

Navigate to the `backend` directory where the `requirements.txt` file is located and run the following command to install the required dependencies:

```bash
cd backend
pip install
python -m venv venv
# On Windows
venv\Scripts\activate
# On MacOS/Linux
source venv/bin/activate
pip install -r requirements.txt
```

### Running the Development Server
After installing the dependencies, you can start the development server by running:
```bash
./manage.py runserver
```
Now you're ready to work on the backend!
---
## Setting up Env variables

Navigate to the `root` directory, then create the following file: `.env`. Then, put your OpenAI API as follows:
```python
OPENAI_API_KEY=[api_key]
```

