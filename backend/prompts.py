
match_prompt = '''Is the provided answer close enough to the correct answer for the following question?

Question: {{provided_question}}
Correct answer: {{correct_answer}}
Provided answer: {{provided_answer}}

Correct or Incorrect? if correct, please type "correct", if incorrect, please type "incorrect".
Only write "correct" or "incorrect", nothing else.
'''

explanation_prompt = '''Please provide an explanation for the following question and answer:
Correct answer: {{correct_answer}}
Provided answer: {{provided_answer}}

Only answer the explanation, do not provide any other information.
'''

