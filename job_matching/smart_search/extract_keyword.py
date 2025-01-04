import spacy

class ExtractKeywords:
    def load_txt(self, file_path):
        with open(file_path, "r") as file:
            keywords = [line.strip().lower() for line in file if line.strip()]
        return set(keywords)  

    def extract_keywords(self, query):
        nlp = spacy.load("en_core_web_sm")  
        doc = nlp(query)
        
        skills_list = self.load_txt("./job_matching/smart_search/skills.txt")
        roles_list = self.load_txt("./job_matching/smart_search/roles.txt")
        loc_list = list(self.load_txt('./job_matching/smart_search/locations.txt'))
        loc_list = [x.lower() for x in loc_list]
        skills = []
        locations = []
        roles = []

        # Matching tokens with skills
        for token in doc:
            if token.text.lower() in skills_list:
                skills.append(token.text)

        # Matching tokens with job roles
        for token in doc:
            if token.text.lower() in roles_list:
                roles.append(token.text.capitalize())

        # Extracting locations
        for token in doc.ents:
            if token.text.lower() in loc_list:
                locations.append(token.text.capitalize())

        return {"skills": skills, "locations": locations, "roles": roles}

if __name__=="__main__":
    ek = ExtractKeywords()
    user_query = "Looking for a Python developer job in Mumbai with experience in Django and AI"
    result = ek.extract_keywords(user_query)
    print(result)

