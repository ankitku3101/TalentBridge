import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env.local file
load_dotenv('.env.local')

# Get the connection string from environment variable
connection_string = os.getenv('MONGODB_URI')

# Create a MongoClient to connect to the MongoDB server
client = MongoClient(connection_string)

# db_names = client.list_database_names()
# print(db_names)

# Access the desired database
dbname = client['test']

# Access the desired collection
student_collection = dbname['jobapplications'] 

# Example: Retrieve all documents from the collection
documents = student_collection.find()

skills_count = {}

# Print each document
for document in documents:
    print(document)
            
