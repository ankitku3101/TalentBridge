from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT


def generate_resume_from_template(data, output_file):

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
        para.add_run(f"\nYear: {edu['year']}")
    doc.add_paragraph()

    # Technical Skills
    doc.add_heading("Technical Skills", level=2)
    for skill in data['skills']:
        doc.add_paragraph(skill, style="List Bullet")
    doc.add_paragraph()

    # Projects Undertaken
    doc.add_heading("Projects Undertaken", level=2)
    for project in data['projects']:
        para = doc.add_paragraph(style="List Bullet")
        para.add_run(f"{project['name']}").bold = True
        para.add_run(f"\n{project['description']}")
    doc.add_paragraph()

    # Save the document
    doc.save(output_file)