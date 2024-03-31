from flask import Flask, request, jsonify
import csv
import os
import json 
import random
import openai
from dotenv import load_dotenv
from prompts import match_prompt, explanation_prompt
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app) 
CSV_FILE = 'input.csv'

openai.api_type = "azure"
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT") 
openai.api_key = os.getenv("AZURE_OPENAI_KEY")
openai.api_version = "2023-05-15"


def LLM_call(prompt):
    prompt = prompt[:17576]
    response = openai.ChatCompletion.create(
    engine="testing-po-3-5",
    temperature=.2,
    messages=[
        {"role": "system", "content": "You are a world-class teacher."},
        {"role": "user", "content": prompt},
    ])

    return response['choices'][0]['message']['content']


def get_explanation(question, provided_answer, correct_answer):
    prompt = explanation_prompt.replace('{{correct_answer}}', correct_answer).replace('{{provided_answer}}', provided_answer).replace('{{provided_question}}', question)
    return LLM_call(prompt)


def read_topics_from_csv():
    topics = set()
    with open(CSV_FILE, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            topics.add(row['Domaine'])
    return list(topics)


def get_question(topic):
    questions = []
    with open(CSV_FILE, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['Domaine'] == topic:
                questions.append(row['Question'])
    return random.choice(questions) if questions else None


def get_answer(question):
    print(question)
    with open(CSV_FILE, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['Question'].strip() == question.strip():
                return row['Réponse correcte']
    return None


def is_correct_answer(question, provided_answer, correct_answer):
    prompt = match_prompt.replace('{{correct_answer}}', correct_answer).replace('{{provided_answer}}', provided_answer).replace('{{provided_question}}', question)
    llm_response = LLM_call(prompt).lower().strip().replace('\n', '').replace('.', '')
    print(prompt, llm_response)
    return llm_response == 'correct'


@app.route('/topics', methods=['GET'])
def get_topics():
    topics = read_topics_from_csv()
    return jsonify(topics)


@app.route('/question', methods=['GET'])
def get_question_for_topic():
    topic = request.args.get('topic')
    if not topic:
        return jsonify({'error': 'Topic parameter is missing'}), 400
    question = get_question(topic)
    if not question:
        return jsonify({'error': 'No question found for the given topic'}), 404
    return jsonify({'question': question})


@app.route('/answer', methods=['GET'])
def check_answer():
    question = request.args.get('question')
    provided_answer = request.args.get('answer')
    if not question or not provided_answer:
        return jsonify({'error': 'Both question and answer parameters are required'}), 400
    correct_answer = get_answer(question)
    if not correct_answer:
        return jsonify({'error': 'Question not found in the database'}), 404
    is_correct = is_correct_answer(question, provided_answer, correct_answer)
    explanation = get_explanation(question, provided_answer, correct_answer)
    return jsonify({'is_correct': is_correct, 'explanation': explanation})


@app.route('/summary', methods=['POST'])
def summary():
    questions = request.form.get('questions', '')
    
    summary = LLM_call(f'Please write 300 word {questions} course to help students understand the wrong questions better. \nOnly write the course, nothing else.')

    return jsonify({'summary': summary})


if __name__ == '__main__':
    app.run(debug=True)