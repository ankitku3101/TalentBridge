from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT


def generate_resume_from_template(data, output_file):
    """
    Generate a resume Word document based on a given template.
    :param data: Dictionary containing form inputs
    :param output_file: Path to save the Word file
    """
    doc = Document()

    # Title Section: Name and Job Title
    name_title = doc.add_heading(level=1)
    name_run = name_title.add_run(f"{data['name']}")
    name_run.bold = True
    name_run.font.size = Pt(18)
    name_title.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER

    job_title = doc.add_paragraph(data['job_title'])
    job_title.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    job_title.runs[0].italic = True
    job_title.runs[0].font.size = Pt(14)

    doc.add_paragraph()  # Add spacing

    # Contact Information
    doc.add_heading("Contact Information", level=2)
    doc.add_paragraph(f"Address: {data['address']}")
    doc.add_paragraph(f"Phone: {data['phone']}")
    doc.add_paragraph(f"Email: {data['email']}")
    doc.add_paragraph(f"LinkedIn: {data['linkedin']}")
    doc.add_paragraph()

    # Career Objective
    doc.add_heading("Career Objective", level=2)
    doc.add_paragraph(data['career_objective'])
    doc.add_paragraph()

    # Educational Qualifications
    doc.add_heading("Educational Qualifications", level=2)
    for edu in data['education']:
        para = doc.add_paragraph(style="List Bullet")
        para.add_run(f"{edu['degree']} - {edu['institute']}").bold = True
        para.add_run(f"\nYear: {edu['year']} - CGPA: {edu.get('cgpa', 'N/A')}")
    doc.add_paragraph()

    # Technical Skills
    doc.add_heading("Technical Skills", level=2)
    for skill in data['skills']:
        doc.add_paragraph(skill, style="List Bullet")
    doc.add_paragraph()

    # Achievements
    doc.add_heading("Achievements", level=2)
    for achievement in data['achievements']:
        doc.add_paragraph(achievement, style="List Bullet")
    doc.add_paragraph()

    # Projects Undertaken
    doc.add_heading("Projects Undertaken", level=2)
    for project in data['projects']:
        para = doc.add_paragraph(style="List Bullet")
        para.add_run(f"{project['name']} - {project['duration']}").bold = True
        para.add_run(f"\n{project['description']}\nGitHub Link: {project['github_link']}")
    doc.add_paragraph()

    # Personal Details
    doc.add_heading("Personal Details", level=2)
    personal_details = data['personal_details']
    for key, value in personal_details.items():
        doc.add_paragraph(f"{key}: {value}")
    doc.add_paragraph()

    # Save the document
    doc.save(output_file)


# Example form data
form_data = {
    "name": "Mohanty Hitesh Rabindranath",
    "job_title": "Software Engineer",
    "address": "Jatani, Khurdha, Odisha",
    "phone": "+91-7205374495",
    "email": "mohantyhitesh4495@gmail.com",
    "linkedin": "https://www.linkedin.com/in/hitesh-mohanty8",
    "career_objective": "To secure a challenging position where I can apply my problem-solving skills and contribute to innovative projects.",
    "education": [
        {"degree": "B.Tech in Computer Science & Engineering", "institute": "GIFT Autonomous", "year": "2024", "cgpa": "9.1"},
        {"degree": "Intermediate", "institute": "Aska Science College, Odisha", "year": "2022", "cgpa": "75%"},
        {"degree": "Matriculation", "institute": "Shree Dhanvantary International School, Gujarat", "year": "2019", "cgpa": "81%"},
    ],
    "skills": [
        "Python, Java, C",
        "Machine Learning, Deep Learning, NLP",
        "Data Structures and Algorithms, OOPs, DBMS",
        "SQL, Git, GitHub, Jupyter Notebook, IntelliJ IDEA",
    ],
    "achievements": [
        "Elite + Silver Certification in NPTEL 'Introduction to Machine Learning'",
        "Secured Second Prize in the Coding Competition 'Byte-Rush'",
        "Solved 100+ DSA problems on LeetCode and HackerRank",
    ],
    "projects": [
        {
            "name": "Indian Script Classification",
            "duration": "May 2024 – Jul 2024",
            "description": "Developed a deep learning model using CNNs to classify textual images of 12 Indian scripts.",
            "github_link": "https://github.com/Mohanty-Hitesh-4495/Indian-Script-Classification",
        },
        {
            "name": "Hospital Management System",
            "duration": "Jul 2023 – Aug 2023",
            "description": "Created modules for managing patient records, appointments, and billing using Java and MySQL.",
            "github_link": "https://github.com/Mohanty-Hitesh-4495/Hospital-Management-System",
        },
    ],
    "personal_details": {
        "Date of Birth": "25/09/2002",
        "Gender": "Male",
        "Marital Status": "Unmarried",
        "Languages Known": "Hindi, Odia, Gujarati, English",
    },
}

# Generate the resume
generate_resume_from_template(form_data, "Hitesh_Resume.docx")
