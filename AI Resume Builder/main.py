import os
import sys
import json
import uvicorn 
from bson import ObjectId
from pymongo import MongoClient
from fastapi import FastAPI, HTTPException, Body
from dotenv import load_dotenv
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import FileResponse
from generate_resume import generate_resume_from_template

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from job_matching.student_search import main


load_dotenv(".env.local")

# Load environment variables
mongodb_uri = os.getenv("MONGODB_URI")
openai_api_key = os.getenv("OPENAI_API_KEY")


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
    api_key = openai_api_key
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
            "content": f"Generate a project description for a project titled '{proj_desc.project_title}' that uses the following skills: {proj_desc.skills}. The description should explain the purpose, technology used, and outcomes of the project. And write it less than 50 words only.",
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
            "content": f"Generate a job description to be included in a resume for the role of {job_des.job_title} at {job_des.company_name}. The description should highlight the user's key responsibilities, significant achievements, technologies worked on, and their overall contribution to the company's success. And write it less than 50 words."
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
            "content": f"Generate a career objective for a candidate with the following skills: {career_obj.skills} and past experience in {career_obj.past_experience}. The objective should highlight the candidate's aspirations, strengths, and how they plan to contribute to a future role. And write it less than 50 words.",
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

class request(BaseModel):
    name: str
    job_title: str
    address: str
    phone: str
    email: str
    career_objective: str
    education: list[dict]
    skills: list[str]
    projects: list[dict]

@app.post("/generate-resume")
async def generate_resume(request: request):
    form_data = request.dict()
    
    # Save the form data as JSON for record-keeping
    with open("AI Resume Builder/user_data/user_data.json", "w") as f:
        json.dump(form_data, f, indent=4)

    # Generate the resume
    sanitized_name = form_data['name'].replace(" ", "_")  # Replace spaces with underscores
    output_dir = "AI Resume Builder/Resume"
    output_file = f"{output_dir}/{sanitized_name}.docx"

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)
    generate_resume_from_template(form_data, output_file)

    # Return the file download link
    return {"downloaded": f"{sanitized_name}.docx"}

@app.get("/download/{filename}")
async def download_resume(filename: str):
    file_path = f"./AI Resume Builder/Resume/{filename}"
    file_path = os.path.join("AI Resume Builder", "Resume", filename)
    if os.path.exists(file_path):
        return FileResponse(
            path=file_path,
            media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            filename=filename,
        )
    else:
        return {"error": "File not found"}

# # Dependency Injection for StudentSearch
# class StudentSearch:
#     def __init__(self, mongodb_uri: str):
#         self.client = MongoClient(mongodb_uri)
#         self.db = self.client['test']
#         self.students_collection = self.db['students']

#     def search_students(self, employer_query: str):
#         # Mock implementation for demonstration
#         try:
#             results = list(self.students_collection.find({}, {"_id": 1, "name": 1}))
#             for student in results:
#                 student['_id'] = str(student['_id'])  # Convert ObjectId to string
#             return results
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=f"Error querying MongoDB: {str(e)}")

# # Initialize search system once
# search_system = StudentSearch(mongodb_uri)

@app.post("/candidate-search")
async def get_matching_students(query: str = Body(..., embed=True)):
    """
    Endpoint to search for students based on employer query.
    Args:
        query (str): Employer's search query
    Returns:
        List of matching student profiles
    """
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    try:
        matching_students = main(query)
        return {"matching_students": matching_students}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)