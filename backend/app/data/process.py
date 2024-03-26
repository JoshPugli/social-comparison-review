import pandas as pd
import os
from tqdm import tqdm
from copy import deepcopy
import json

CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))

# df = pd.read_csv(os.path.join(CURRENT_FILE, "reframing_dataset.csv"))
# print(df.head())

DISTORTIONS = [
    "disqualifying the positive",
    "comparing and despairing",
    "personalizing",
    "should statements",
    "emotional reasoning",
    "catastrophizing",
    "labeling",
    "fortune telling",
    "blaming",
    "magnification",
    "negative feeling or emotion",
    "mind reading",
    "overgeneralizing",
    "all-or-nothing thinking",
]

distortion_jsonl_template = {
    "messages": [
        {
            "role": "system",
            "content": "Given a distorted thought, the situation the user is in, and a list of 1-3 thinking traps that the user resonates with, generate four specific types of reframes: 'Thinking Trap Challenge Reframe', 'Direct Challenge Reframe', 'Self-Compassion Reframe', and 'Contextual Reframe'. Each reframe should address the cognitive distortions differently, providing alternative perspectives and challenging the distorted thinking in unique ways.",
        },
        {"role": "user", "content": ""},
        {"role": "assistant", "content": ""},
    ]
}

with open(os.path.join(CURRENT_FILE, "reframe_format.jsonl"), "w") as f:
    pass

data = [
    {
        "user": {
            "Thought": "I'm never going to be good at math.",
            "Situation": "Struggling with a math assignment.",
            "Thinking Traps": ["Overgeneralization", "Labeling"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "While overgeneralization may lead you to believe you're permanently stuck with your current math abilities, remember that learning is a process, and improvement is possible with time and practice. Instead of labeling yourself as 'not good at math,' consider how you have grown in other areas through perseverance and effort. What specific steps can you take to improve your understanding of math concepts, just as you have improved in other areas of your life?",
            "Direct Challenge Reframe": "Experiencing difficulty with a math problem doesn’t necessarily mean you're bad at it; it's a normal part of the learning process that everyone goes through..",
            "Self-Compassion Reframe": "Feeling overwhelmed or challenged by a math assignment is a common experience and doesn’t reflect your overall capability. It’s important to acknowledge the effort you're putting in and the progress you're making, even if it feels small right now. Be gentle with yourself during this learning process; everyone faces ups and downs in their learning journey. What steps can you take right now to support yourself and make this experience more manageable?",
            "Contextual Reframe": "Struggling with this assignment doesn't mean you're bad at math overall. It's just one aspect of the subject at one point in time.",
        },
    },
    {
        "user": {
            "Thought": "I'm going to get fired because I can't do anything right at work.",
            "Situation": "Received constructive criticism from a supervisor.",
            "Thinking Traps": ["Catastrophizing", "All-or-Nothing Thinking"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Catastrophizing leads to expecting the worst-case scenario, like getting fired, from a single instance of feedback. All-or-Nothing Thinking overlooks the times you’ve performed well. Reflect on past successes and how they can inform your response to feedback. How can you use the constructive criticism as a stepping stone for improvement rather than a prediction of failure?",
            "Direct Challenge Reframe": "Receiving feedback is a normal part of professional growth and doesn’t mean you can’t do anything right. Everyone has areas to improve. How can you view this feedback as an opportunity for development rather than a sign of impending failure?",
            "Self-Compassion Reframe": "It’s tough to hear criticism, and feeling upset is natural. But it doesn’t define your entire job performance. How can you treat yourself with kindness during this time and recognize the effort you’ve been putting into your work?",
            "Contextual Reframe": "A moment of criticism in your career doesn’t define your overall job security or capabilities. How have you navigated challenges before, and what can this teach you about handling current and future workplace situations?",
        },
    },
    {
        "user": {
            "Thought": "I always mess up presentations. I'm terrible at public speaking.",
            "Situation": "Preparing for an upcoming presentation at work.",
            "Thinking Traps": ["Overgeneralization", "Labeling"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Overgeneralization makes you believe that past presentation difficulties will always recur, which isn’t necessarily true. Rather than labeling yourself as 'terrible at public speaking,' reflect on aspects of presentations you handled well or times you communicated effectively in other settings. How can these reflections guide your preparation for the upcoming presentation?",
            "Direct Challenge Reframe": "Having challenging experiences with presentations doesn't mean you're inherently bad at public speaking. It’s an acquired skill that improves with practice and experience. What part of speaking do you find most challenging, and how can we address it specifically?",
            "Self-Compassion Reframe": "Feeling nervous about presentations is common and doesn’t imply a lack of skill. It's okay to feel anxious; it shows you care about doing well. What comforting words would you offer a colleague in your situation, and how can you apply them to yourself?",
            "Contextual Reframe": "This presentation is just one of many you will give, and each one is an opportunity to learn and improve. How have you grown from past presentations, and how might this experience contribute to your growth in public speaking skills?",
        },
    },
    {
        "user": {
            "Thought": "I know my upcoming job interview will be a disaster.",
            "Situation": "Feeling anxious about a scheduled job interview.",
            "Thinking Traps": ["Fortune Telling", "Catastrophizing"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Predicting a disaster is an example of fortune-telling, which can amplify anxiety. Can you recall instances where anticipated outcomes were much better than expected?",
            "Direct Challenge Reframe": "While it’s normal to feel anxious about important events like job interviews, assuming it will be a disaster isn’t based on fact. What preparations can you make to feel more confident and reduce anxiety?",
            "Self-Compassion Reframe": "Feeling nervous about a job interview is common. What would you tell a friend in your situation to offer support and reduce their anxiety?",
            "Contextual Reframe": "An interview is just one step in your career path, not the final determinant of your future. How can seeing it as part of a larger journey change your feelings about it?",
        },
    },
    {
        "user": {
            "Thought": "I'm a bad parent because I get frustrated with my children.",
            "Situation": "Dealing with challenging behavior from children.",
            "Thinking Traps": ["Labeling", "Emotional Reasoning"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Feeling frustrated doesn’t make you a bad parent; it makes you human. Labeling yourself negatively ignores all the care and love you provide. Can you think of moments when you felt proud of your parenting?",
            "Direct Challenge Reframe": "Parenting is incredibly challenging, and frustration is a normal emotion. How can you differentiate between feeling frustrated in a moment and your overall identity as a parent?",
            "Self-Compassion Reframe": "It’s tough to manage everything as a parent, and it’s okay to feel overwhelmed at times. How can you show yourself the same understanding and support you offer to your children?",
            "Contextual Reframe": "A moment of frustration doesn’t define your entire parenting journey. Each day offers new opportunities for learning and growth for both you and your children. How can this perspective influence your view of difficult moments?",
        },
    },
    {
        "user": {
            "Thought": "Everyone on social media has a better life than me.",
            "Situation": "Scrolling through social media and seeing friends' success posts.",
            "Thinking Traps": ["comparing and despairing"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Comparing often highlights selective, polished aspects of others’ lives, ignoring their challenges. What’s the impact of comparing your behind-the-scenes to their highlight reel?",
            "Direct Challenge Reframe": "Social media is a curated display, not a full reflection of life. How can you focus on your journey and values instead of comparisons?",
            "Self-Compassion Reframe": "It’s easy to feel inadequate when comparing. How can you be kind to yourself and appreciate your own achievements and growth?",
            "Contextual Reframe": "Everyone’s path is unique, with its ups and downs. How can recognizing the curated nature of social media change your perspective on these comparisons?",
        },
    },
    {
        "user": {
            "Thought": "My friend is in a bad mood, it must be because of something I did.",
            "Situation": "Noticing a friend’s mood change.",
            "Thinking Traps": ["personalizing"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Personalizing assumes direct responsibility for others' emotions, which are influenced by numerous factors. What evidence supports that you are the cause?",
            "Direct Challenge Reframe": "Individuals’ moods can change due to a variety of reasons not related to you. What might be other factors affecting your friend's mood?",
            "Self-Compassion Reframe": "Taking on the weight of others' emotions is burdensome. How can you acknowledge your concern for your friend's feelings while also recognizing that you’re not in control of their emotions?",
            "Contextual Reframe": "Moods are complex and fluctuating. How can understanding the broader context of your friend’s life help you see this situation differently?",
        },
    },
    {
        "user": {
            "Thought": "I should always be productive and never waste time.",
            "Situation": "Feeling guilty for taking a break.",
            "Thinking Traps": ["should statements"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "'Should' statements impose harsh and often unrealistic standards. Is constant productivity actually attainable or healthy, and what does 'wasting time' really mean to you?",
            "Direct Challenge Reframe": "The notion that one should always be productive ignores the necessity of rest and self-care. How can balancing work and relaxation contribute to long-term productivity and well-being?",
            "Self-Compassion Reframe": "Expecting uninterrupted productivity sets the stage for guilt and burnout. How can you give yourself permission to rest and recharge without feeling guilty?",
            "Contextual Reframe": "Life’s value isn’t measured solely by productivity. How might recognizing the importance of downtime change your view on taking breaks?",
        },
    },
    {
        "user": {
            "Thought": "I didn't complete my tasks today; I'm useless and my team must think I'm incompetent.",
            "Situation": "Had a less productive day at work.",
            "Thinking Traps": ["labeling", "mind reading", "overgeneralizing"],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Labeling yourself as 'useless' based on one day's productivity overlooks your broader contributions. Mind reading assumes you know what your team thinks, which might not be accurate. Overgeneralizing a single day’s performance to judge your overall competence ignores the complexity and variability of work productivity.",
            "Direct Challenge Reframe": "Everyone has off days; it doesn’t make you useless or incompetent. How can you assess your performance in a more balanced way, considering both achievements and areas for growth?",
            "Self-Compassion Reframe": "It's tough to feel behind at work, but self-criticism only adds to the stress. How can you treat yourself with kindness and understanding, as you would a team member in the same situation?",
            "Contextual Reframe": "A single day's productivity isn't the full measure of your professional worth. How does this day fit into your overall career journey and contributions to the team?",
        },
    },
    {
        "user": {
            "Thought": "I'm always awkward at social events, and people must find me boring. I'll never make any friends.",
            "Situation": "Feeling anxious about attending a party.",
            "Thinking Traps": [
                "fortune telling",
                "mind reading",
                "all-or-nothing thinking",
            ],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Fortune telling predicts social failure, which may not happen. Mind reading assumes others find you boring, without real evidence. All-or-nothing thinking ignores the middle ground, where some interactions might go well and others might be awkward.",
            "Direct Challenge Reframe": "Feeling awkward doesn’t mean you are inherently boring or that you can't make friends. Social skills can improve with practice and exposure. What are some small steps you can take to ease your anxiety and engage more comfortably with others?",
            "Self-Compassion Reframe": "Social situations can be nerve-wracking, and it's okay to feel anxious. How can you acknowledge your feelings of awkwardness without letting them define your social identity?",
            "Contextual Reframe": "One social event doesn't set the pattern for all future interactions. How can past experiences where you felt more at ease help adjust your expectations and reduce anxiety for upcoming events?",
        },
    },
    {
        "user": {
            "Thought": "If I don’t get this project perfect, I'll be seen as a failure and it will ruin my career.",
            "Situation": "Working on an important project at work.",
            "Thinking Traps": [
                "catastrophizing",
                "all-or-nothing thinking",
                "labeling",
            ],
        },
        "assistant": {
            "Thinking Trap Challenge Reframe": "Catastrophizing predicts a disastrous career impact from a single project, while all-or-nothing thinking sees only perfection or failure, with no middle ground. Labeling yourself as a 'failure' based on one project outcome ignores your overall career achievements and growth.",
            "Direct Challenge Reframe": "Perfection is an unrealistic standard. Success is often a result of learning from mistakes and setbacks. How can you aim for excellence in your project while accepting that imperfection is part of the process?",
            "Self-Compassion Reframe": "The pressure to be perfect is intense but remember that you're not alone in feeling this way. How can you show yourself compassion and recognize the effort you are putting into this project?",
            "Contextual Reframe": "Your career is not defined by one project but by your continuous learning and development. How can viewing the project as a learning opportunity rather than a make-or-break moment change your approach?",
        },
    },
]

for item in data:
    distortion_jsonl = deepcopy(distortion_jsonl_template)
    distortion_jsonl["messages"][1]["content"] = json.dumps(item["user"])
    distortion_jsonl["messages"][2]["content"] = json.dumps(item["assistant"])
    with open(os.path.join(CURRENT_FILE, "reframe_format.jsonl"), "a") as f:
        f.write(json.dumps(distortion_jsonl) + "\n")