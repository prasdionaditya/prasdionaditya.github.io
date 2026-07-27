import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.units import inch

pdf_path = os.path.join(os.path.dirname(__file__), "cv.pdf")

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    leftMargin=0.45 * inch,
    rightMargin=0.45 * inch,
    topMargin=0.45 * inch,
    bottomMargin=0.45 * inch
)

styles = getSampleStyleSheet()

# Custom styles
primary_color = colors.HexColor("#000000")
accent_color = colors.HexColor("#1E45FB")
text_dark = colors.HexColor("#111111")

title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=21,
    textColor=primary_color
)

subtitle_style = ParagraphStyle(
    'DocSubTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=accent_color
)

contact_style = ParagraphStyle(
    'ContactText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    textColor=text_dark
)

sec_title_style = ParagraphStyle(
    'SecTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=13,
    textColor=primary_color,
    spaceBefore=8,
    spaceAfter=3
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=text_dark
)

bullet_style = ParagraphStyle(
    'BulletCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=text_dark,
    leftIndent=12,
    spaceAfter=2
)

story = []

# --- Header ---
header_html = """
<b>MUHAMMAD AKSAL PRASDION ADITYA</b><br/>
<font color="#1E45FB" size="10"><b>Web Developer Intern</b></font><br/>
<font size="8">Kendari, Southeast Sulawesi | dionaditya59@gmail.com | 081240843530<br/>
linkedin.com/in/prasdionaditya | prasdionaditya.github.io</font>
"""
story.append(Paragraph(header_html, title_style))
story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#111111"), spaceBefore=2, spaceAfter=6))

# --- Professional Summary ---
story.append(Paragraph("<b>PROFESSIONAL SUMMARY</b>", sec_title_style))
story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#333333"), spaceBefore=1, spaceAfter=4))
summary_text = (
    "Computer Science student in semester 7 at Universitas Halu Oleo with a focus on web application development "
    "(Frontend &amp; Backend). Skilled in building responsive web applications using Laravel and managing SQL databases. "
    "Experienced in working with RESTful APIs, Git version control, and delivering web projects both independently and "
    "collaboratively in team environments."
)
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 4))

# --- Technical & Interpersonal Skills ---
story.append(Paragraph("<b>TECHNICAL &amp; INTERPERSONAL SKILLS</b>", sec_title_style))
story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#333333"), spaceBefore=1, spaceAfter=4))

skills_data = [
    ("Languages:", "JavaScript (ES6+), PHP, HTML5, CSS3, SQL, Python"),
    ("Frameworks &amp; Libraries:", "Laravel, React.js, Tailwind CSS, Bootstrap"),
    ("Database Management:", "MySQL, PostgreSQL"),
    ("Tools &amp; Platforms:", "Git, GitHub, Postman, VS Code, Antigravity, Figma"),
    ("Core Concepts:", "RESTful API Design, Responsive Web Design, MVC Architecture, Version Control"),
    ("Soft Skills:", "Problem Solving, Team Collaboration, Technical Documentation, Adaptability, Attention to Detail"),
    ("Languages Spoken:", "Indonesian (Native), English (B2 - Upper Intermediate)")
]
for label, val in skills_data:
    p_text = f"<b>{label}</b> {val}"
    story.append(Paragraph(p_text, body_style))
story.append(Spacer(1, 4))

# --- Project Experiences ---
story.append(Paragraph("<b>PROJECT EXPERIENCES</b>", sec_title_style))
story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#333333"), spaceBefore=1, spaceAfter=4))

# Project 1: MEAMBO
story.append(Paragraph("<b>MEAMBO</b> | <b>Frontend Developer (Community Service Project)</b> <font align='right'>2025</font>", body_style))
story.append(Paragraph("<b>Tech Stack:</b> HTML5, CSS3, JavaScript, Bootstrap, Laravel (Blade) &nbsp;|&nbsp; <b>Link:</b> meambo.id", body_style))
meambo_bullets = [
    "Engineered the frontend interface for Kelurahan Tipulu's public digital administration platform to streamline online community service requests.",
    "Designed responsive, accessible, and user-friendly web pages ensuring seamless navigation across desktop and mobile devices.",
    "Integrated dynamic frontend components with backend endpoints and REST APIs to display real-time service data and forms.",
    "Collaborated closely with backend developers and project stakeholders to align UI implementation with government service workflows."
]
for b in meambo_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
story.append(Spacer(1, 3))

# Project 2: Switchy
story.append(Paragraph("<b>Switchy – Web Media Converter</b> | <b>Full-Stack Developer (Personal Project)</b> <font align='right'>2026</font>", body_style))
story.append(Paragraph("<b>Tech Stack:</b> JavaScript (ES6+), HTML5, CSS3, Node.js &nbsp;|&nbsp; <b>Link:</b> prasdionaditya.github.io/Switchy", body_style))
switchy_bullets = [
    "Developed a responsive web application that converts media files across various formats (e.g., PNG to JPG, MOV to MP4, M4A to MP3).",
    "Implemented file processing logic to handle asynchronous file uploads, format conversions, and downloads efficiently.",
    "Optimized UI/UX to ensure seamless handling of file uploads across different screen sizes."
]
for b in switchy_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
story.append(Spacer(1, 3))

# Project 3: SiPaling Paham
story.append(Paragraph("<b>SiPaling Paham – AI-Powered Learning Assistant</b> | <b>Full-Stack Developer (Personal Project)</b> <font align='right'>2026</font>", body_style))
story.append(Paragraph("<b>Tech Stack:</b> Python, OpenAI API (LLM), JavaScript, Tailwind CSS &nbsp;|&nbsp; <b>Link:</b> github.com/prasdionaditya/SiPaling-Paham", body_style))
sipaling_bullets = [
    "Built an AI-driven web application designed to simplify complex university lecture materials into digestible summaries for students.",
    "Integrated Large Language Model (LLM) APIs (OpenAI) to process context-heavy academic text and generate structured study guides.",
    "Designed an intuitive, clean user interface focused on fast response times and readable content presentation."
]
for b in sipaling_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
story.append(Spacer(1, 4))

# --- Education ---
story.append(Paragraph("<b>EDUCATION</b>", sec_title_style))
story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#333333"), spaceBefore=1, spaceAfter=4))
story.append(Paragraph("<b>Halu Oleo University</b> — Kendari, Southeast Sulawesi, Indonesia &nbsp;&nbsp;&nbsp;&nbsp; 2023 – Present", body_style))
story.append(Paragraph("Bachelor of Science in Computer Science | GPA: 3.56 / 4.00", body_style))
story.append(Paragraph("<b>Relevant Coursework:</b> Web Development, Database Systems, Data Structures &amp; Algorithms, Software Engineering, Computer Networks, Artificial Intelligence, Data Science.", body_style))
story.append(Spacer(1, 4))

# --- Experience & Leadership ---
story.append(Paragraph("<b>EXPERIENCE &amp; LEADERSHIP</b>", sec_title_style))
story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#333333"), spaceBefore=1, spaceAfter=4))

# UKM Bahasa Asing UHO
story.append(Paragraph("<b>UKM Bahasa Asing UHO (Foreign Language Student Activity Unit)</b> — Kendari, Indonesia &nbsp;&nbsp;&nbsp;&nbsp; 2025 – Present", body_style))
story.append(Paragraph("<b>Head of Media &amp; Information Division</b>", body_style))
ukm_bullets = [
    "Spearheaded the development of the organization's official web platform to centralize member registration, event announcements, and digital publication.",
    "Led a media team in designing digital publication assets, managing official communications, and optimizing public engagement."
]
for b in ukm_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
story.append(Spacer(1, 3))

# Royal AI
story.append(Paragraph("<b>Royal AI</b> — Istanbul, Turkey (Remote) &nbsp;&nbsp;&nbsp;&nbsp; Dec 2024", body_style))
royal_bullets = [
    "Collaborated with university faculty/lecturers to develop an AI-powered Medical HR Chatbot for a healthcare organization in Turkey.",
    "Assisted in building a responsive web interface to manage user logs, chatbot interactions, and administrative dashboards."
]
for b in royal_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))

doc.build(story)
print("PDF generated successfully at:", pdf_path)
