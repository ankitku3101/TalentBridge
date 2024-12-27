import openai
import os
from pathlib import Path
from dotenv import load_dotenv
from flask import Flask, request, jsonify

load_dotenv(Path(".env"))
openai.api_key = os.getenv("api_key")

app = Flask(__name__)

def generate_project_description(project_title, skills):
    prompt = f"Generate a project description for a project titled '{project_title}' that uses the following skills: {skills}. The description should explain the purpose, technology used, and outcomes of the project."
    response = openai.Completion.create(
        model="gpt-4o-mini",  
        prompt=prompt,
        max_tokens=50
    )
    return response['choices'][0]['text'].strip()

def generate_job_description(job_title, company_name):
    prompt = f"Generate a job description for the role of {job_title} at {company_name}. The description should include key responsibilities, skills required, and a brief overview of the company."
    response = openai.Completion.create(
        model="gpt-4o-mini",  
        prompt=prompt,
        max_tokens=50
    )
    return response['choices'][0]['text'].strip()

def generate_career_objective(skills, past_experience):
    prompt = f"Generate a career objective for a candidate with the following skills: {skills} and past experience in {past_experience}. The objective should highlight the candidate's aspirations, strengths, and how they plan to contribute to a future role."
    response = openai.Completion.create(
        model="gpt-4o-mini",  
        prompt=prompt,
        max_tokens=50
    )
    return response['choices'][0]['text'].strip()

@app.route('/generate-descriptions', methods=['POST'])
def generate_descriptions():
    data = request.json  

    project_title = data.get('project_title')
    skills = data.get('skills')
    job_title = data.get('job_title')
    company_name = data.get('company_name')
    past_experience = data.get('past_experience')

    project_description = generate_project_description(project_title, skills)
    job_description = generate_job_description(job_title, company_name)
    career_objective = generate_career_objective(skills, past_experience)

    return jsonify({
        'project_description': project_description,
        'job_description': job_description,
        'career_objective': career_objective
    })

if __name__ == "__main__":
    app.run(debug=True)
