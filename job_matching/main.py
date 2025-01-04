import os
from pymongo import MongoClient
from dotenv import load_dotenv

class JobMatching:

    def __init__(self):
        load_dotenv('.env.local')
        connection_string = os.getenv('MONGODB_URI')
        client = MongoClient(connection_string)
        db = client['test']
        self.student_collection = db['students'] 
        self.job_collection = db['jobs']

    def get_user_info(self, student_id: str):
        document = self.student_collection.find({"_id": student_id})
        if not document:
            return None
        return {
            'skills': document.get('skills', []),
            'yoe': document.get('yoe', 0)
        }
    
    def get_job_info(self, job_id: str):
        document = self.job_collection.find({"_id": job_id})
        if not document:
            return None
        return {
            "req_skills": document.get('skillsRequired', []),
        }

    async def find_match_percent(self, student_id, job_id):
        student_info = self.get_user_info(student_id)
        job_info = self.get_job_info(job_id)

        student_skills = set(student_info['skills'])
        required_skills = set(job_info['req_skills'])
        skill_overlap = len(student_skills.intersection(required_skills))
        skill_match_score = skill_overlap / len(required_skills) if required_skills else 0

        skill_weight = 0.7
        exp_weight = 0.3
        experience_score = student_info['yoe'] * exp_weight

        total_match_score = (skill_match_score * skill_weight) + experience_score

        return {
            "match_percent": total_match_score,
        }

