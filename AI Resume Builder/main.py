from openai import OpenAI
import os
from pathlib import Path
from dotenv import load_dotenv

from fastapi import FastAPI
import uvicorn 

load_dotenv()

app = FastAPI()
openai = OpenAI(
    api_key = os.environ.get("API_KEY")
)

@app.post('/project-desc')
async def generate_project_description(project_title, skills):
    message = [
        {
            'role':"developer",
            'content': "You are a IT professional and knows what are the important aspects what an interviewer sees in an candidate. Provide an impressive project description to an interview candidate highlighting his/her skills without any formatting.",
        },
        {
            "role":"user",
            "content": f"Generate a project description for a project titled '{project_title}' that uses the following skills: {skills}. The description should explain the purpose, technology used, and outcomes of the project.",
        },
    ]
    response = openai.chat.completions.create(
        model = "gpt-4o-mini",
        messages = message,
        max_tokens = 50,
    )
    return {
        "data": response.choices[0].message.content.strip()
    }

@app.post('/job-desc')
async def generate_job_description(job_title, company_name):
    message = [
        {
            'role':"developer",
            'content': "You are a IT professional and knows what are the important aspects what an interviewer sees in an candidate. Provide an impressive Job description to an interview candidate highlighting his/her importance in the potential workplace without any formatting.",
        },
        {
            "role":"user",
            "content": f"Generate a job description for the role of {job_title} at {company_name}. The description should include key responsibilities, skills required, and a brief overview of the company.",
        },
    ]
    response = openai.chat.completions.create(
        model = "gpt-4o-mini",
        messages = message,
        max_tokens = 100,
    )
    return {
        "data": response.choices[0].message.content.strip()
    }

@app.post('/career-obj')
async def generate_career_objective(skills: str, past_experience: str):
    message = [
        {
            'role':"developer",
            'content': "You are a IT professional and knows what are the important aspects what an interviewer sees in an candidate. Provide an impressive career objective to an interview candidate without any formatting.",
        },
        {
            "role":"user",
            "content": f"Generate a career objective for a candidate with the following skills: {skills} and past experience in {past_experience}. The objective should highlight the candidate's aspirations, strengths, and how they plan to contribute to a future role.",
        },
    ]
    response = openai.chat.completions.create(
        model = "gpt-4o-mini",
        messages = message,
        max_tokens = 100,
    )
    return {
        "data": response.choices[0].message.content.strip()
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
