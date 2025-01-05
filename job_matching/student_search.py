from dotenv import load_dotenv
from pymongo import MongoClient
from openai import OpenAI
from typing import List, Dict
import os
from datetime import datetime

class StudentSearch:
    def __init__(self, mongodb_uri: str, openai_api_key: str):
        """
        Initialize the StudentSearch class with MongoDB and OpenAI credentials
        
        Args:
            mongodb_uri (str): MongoDB connection string
            openai_api_key (str): OpenAI API key
        """
        # Initialize MongoDB connection
        self.client = MongoClient(mongodb_uri)
        self.db = self.client['test']  
        self.students_collection = self.db['students'] 
        
        # Initialize OpenAI
        self.openai = OpenAI(
            api_key = openai_api_key
        )
        
    def extract_search_criteria(self, query: str) -> Dict:
        """
        Use OpenAI to extract key skills and requirements from natural language query
        
        Args:
            query (str): Natural language search query from employer
            
        Returns:
            Dict: Structured search criteria
        """
        system_prompt = """
        Extract key skills and requirements from the following job search query.
        The technical skill should be only specific name and not any extra word like Java programming is saved as java only and similarly for other programming langurages.
        The year of experince should be an interger value and not some word.
        Make sure to not have those skills that have negation like "not having java" should not include java in technical skills.
        Make sure to autocorrect and understand the context of the phase provided.
        Return a JSON object with the following structure:
        {
            "technical_skills": [],
            "degree": "",
            graduation_year: "",
            "year_of_experience": "",
        }
        """
        
        message = [
            {
                "role": "developer",
                "content": system_prompt,
            },
            {
                'role': "user",
                "content": query,
            }
        ]
        
        try:
            response = self.openai.chat.completions.create(
                model="gpt-4o-mini", 
                messages=message,
                max_tokens=100,
                temperature=0.5
            )
            
            print(response.choices[0].message.content)
            
            return eval(response.choices[0].message.content.strip())  # Convert the string to a dictionary
            
        except Exception as e:
            print(f"Error in OpenAI API call: {str(e)}")
            return None
            
    def build_mongodb_query(self, search_criteria: Dict) -> Dict:
        """
        Convert structured search criteria into MongoDB query
        
        Args:
            search_criteria (Dict): Structured search criteria from OpenAI
            
        Returns:
            Dict: MongoDB query
        """
        query = {"$and": []}
        
        # Add technical skills criteria
        if search_criteria.get("technical_skills"):
            query["$and"].append({
                "skills": {
                    "$in": [skill.lower() for skill in search_criteria["technical_skills"]]
                }
            })
            
        # Add degree criteria
        if search_criteria.get("degree"):
            query["$and"].append({
                "degree": {
                    "$regex": search_criteria["degree"],
                    "$options": "i"
                }
            })
            
        # Add graduation year criteria
        if search_criteria.get("graduation_year"):
            query["$and"].append({
                "graduationYear": {
                    "$gte": search_criteria["graduation_year"]
                }
            })
            
        # Add experience level criteria
        if search_criteria.get("experience_level"):
            query["$and"].append({
                "yoe": {
                    "$gte": search_criteria["experience_level"]
                }
            })
            
        return query if query["$and"] else {}
        
    def search_students(self, employer_query: str) -> List[Dict]:
        """
        Main search function that processes employer query and returns matching students
        
        Args:
            employer_query (str): Natural language query from employer
            
        Returns:
            List[Dict]: List of matching student profiles
        """
        # Extract search criteria using OpenAI
        search_criteria = self.extract_search_criteria(employer_query)
        if not search_criteria:
            return []
            
        # Build MongoDB query
        mongo_query = self.build_mongodb_query(search_criteria)
        
        # Execute search
        try:
            results = list(self.students_collection.find(
                mongo_query,
                {"_id": 1, "name": 1, "skills": 1, "degree": 1, "graduationYear": 1, "yoe": 1}
            ))
            for student in results:
                student['_id'] = str(student['_id'])  # Convert ObjectId to string
            return results
        except Exception as e:
            print(f"Error querying MongoDB: {str(e)}")
            return []


def main(employer_query):
    load_dotenv('.env.local')
    # Load environment variables
    mongodb_uri = os.getenv("MONGODB_URI")
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    # Initialize search system
    search_system = StudentSearch(mongodb_uri, openai_api_key)
    
    # Perform search
    matching_students = search_system.search_students(employer_query)
    
    return matching_students
    
if __name__ == "__main__":
    main()
