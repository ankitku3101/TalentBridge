from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from pymongo import MongoClient
from dotenv import load_dotenv

class JobMatching:
    def __init__(self):
        load_dotenv('.env.local')
        connection_string = os.getenv('MONGODB_URI')
        client = MongoClient(connection_string)
        dbname = client['test']
        self.student_collection = dbname['students'] 
        self.job_collection = dbname['jobs']



    def get_user_info(self, student_id: str):
        document = self.student_collection.find({"_id": student_id})
        skills = document['skills']
        yoe = document['yoe']
        return {
            'skills': skills,
            'yoe': yoe
        }
    def get_job_info(self, job_id: str):
        document = self.job_collection.find({"_id": job_id})
        req_skills = document['skillsRequired']
        return {
            "req_skills": req_skills,
        }

    async def find_match_percent(self, student_id, job_id):
        self.get_user_info(student_id)
        self.get_job_info(job_id)
        res = 0.0 # Demo variable for matching percentage.
        # TODO : Find the matching percentage of the skills in user and reqired skills in Job
        return {
            "match_percent": res,
        }

