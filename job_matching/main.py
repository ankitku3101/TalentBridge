import os
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId

class JobMatching:

    def __init__(self):
        load_dotenv('.env.local')
        connection_string = os.getenv('MONGODB_URI')
        client = MongoClient(connection_string)
        db = client['test']
        self.student_collection = db['students'] 
        self.job_collection = db['jobs']
        self.applied_students = {}

    def get_student_info(self, student_id):
        document = self.student_collection.find({"_id": student_id})
        if not document:
            return None
        return {
            "id": student_id,
            'skills': document['skills'],
            'yoe': document['yoe']
        }
    
    def get_job_info(self, job_id):
        document = self.job_collection.find({"_id": job_id})
        if not document:
            return None
        return {
            "req_skills": document['skillsRequired'],
            "applied_student": document['applicants']
        }
    
    def get_applied_student_list(self, job_info):
        student_ids = list(job_info["applied_student"])
        student_ids_obj = [ObjectId(id_str) for id_str in student_ids]
        query = {"_id": {"$in": student_ids_obj}}
        students = self.student_collection.find(query)
        return students
            

    def find_match_percent(self, student_info, job_info):
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
    
    
    def assign_scores(self, students):
        #TODO: assign the scores to the students list
        for student in students:
            pass
            
    
    def search_results(self):
        #TODO: this is the top-level function for the serach engine
        pass
    
    def recommended_students(self, student_id, job_id):
        #TODO: This is top-level function for recommened student that are applied for a job
        # student_info = self.get_student_info(student_id)
        job_info = self.get_job_info(job_id)
        appliedStudents = self.get_applied_student_list(job_info=job_info)
        
        self.assign_scores(appliedStudents, job_info)
        
        
        
if __name__ == "__main__":
    pass