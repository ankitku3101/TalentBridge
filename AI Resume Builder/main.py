import os
from fastapi import FastAPI, UploadFile, Form
import uvicorn 
from dotenv import load_dotenv
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import FileResponse
import json
from generate_resume import generate_resume_from_template

load_dotenv()

app = FastAPI()

allowed_origins = [
    "http://localhost:5500",
    "http://localhost:5501", # Fallback condition in case port 5500 is busy for live server
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501",
    "http://localhost",
    "http://127.0.0.1",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
openai = OpenAI(
    api_key = os.environ.get("API_KEY")
)

class Proj_desc(BaseModel):
    project_title: str
    skills: str
    

@app.post('/project-desc')
async def generate_project_description(proj_desc : Proj_desc):
    message = [
        {
            'role':"developer",
            'content': "You are a IT professional and knows what are the important aspects what an interviewer sees in an candidate. Provide an impressive project description to an interview candidate highlighting his/her skills without any formatting.",
        },
        {
            "role":"user",
            "content": f"Generate a project description for a project titled '{proj_desc.project_title}' that uses the following skills: {proj_desc.skills}. The description should explain the purpose, technology used, and outcomes of the project.",
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

class Job_des(BaseModel):
    job_title: str
    company_name: str

@app.post('/job-desc')
async def generate_job_description(job_des: Job_des):
    message = [
        {
            'role':"developer",
            'content': "You are a IT professional and knows what are the important aspects what an interviewer sees in an candidate. Provide an impressive Job description to an interview candidate highlighting his/her importance in the potential workplace without any formatting.",
        },
        {
            "role":"user",
            "content": f"Generate a job description to be included in a resume for the role of {job_des.job_title} at {job_des.company_name}. The description should highlight the user's key responsibilities, significant achievements, technologies worked on, and their overall contribution to the company's success."
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

class Career_obj(BaseModel):
    skills: str
    past_experience: str

@app.post('/career-obj')
async def generate_career_objective(career_obj: Career_obj):
    message = [
        {
            'role':"developer",
            'content': "You are a IT professional and knows what are the important aspects what an interviewer sees in an candidate. Provide an impressive career objective to an interview candidate without any formatting.",
        },
        {
            "role":"user",
            "content": f"Generate a career objective for a candidate with the following skills: {career_obj.skills} and past experience in {career_obj.past_experience}. The objective should highlight the candidate's aspirations, strengths, and how they plan to contribute to a future role.",
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

@app.post("/generate-resume")
async def generate_resume(
    name: str = Form(...),
    job_title: str = Form(...),
    address: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    career_objective: str = Form(...),
    education: str = Form(...),
    skills: str = Form(...),
    projects: str = Form(...),
    profile_picture: UploadFile = None,
):

    # Parse form data
    education_data = json.loads(education)
    skills_data = skills.split(",")
    projects_data = json.loads(projects)

    # Save the profile picture if uploaded
    profile_picture_path = None
    if profile_picture:
        profile_picture_path = f"profile_pictures/{profile_picture.filename}"
        os.makedirs("profile_pictures", exist_ok=True)
        with open(profile_picture_path, "wb") as f:
            f.write(await profile_picture.read())

    # Create form data dictionary
    form_data = {
        "name": name,
        "job_title": job_title,
        "address": address,
        "phone": phone,
        "email": email,
        "career_objective": career_objective,
        "education": education_data,
        "skills": skills_data,
        "projects": projects_data,
        "profile_picture": profile_picture_path,
    }

    # Save the form data as JSON for record-keeping
    with open("user_data.json", "w") as f:
        json.dump(form_data[0:-1], f, indent=4)

    # Generate the resume
    output_file = "AI Resume Builder/Resume/generated_resume.docx"
    generate_resume_from_template(form_data, output_file)

    # Return the file download link
    return {"download_link": f"AI Resume Builder/Resume/{output_file}"}

@app.get("/download/{filename}")
async def download_resume(filename: str):
    file_path = f"./{filename}"
    return FileResponse(file_path, media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document', filename=filename)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)
