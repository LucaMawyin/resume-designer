import os
import glob
from flask import Flask, request, Response
from flask_cors import CORS
from pylatex import Document, NoEscape, escape_latex
from datetime import datetime

app = Flask(__name__)
CORS(app)

'''
Commands:

cd .\python\
flask --app api run --debug
'''

@app.route('/api/route', methods=['POST'])
def generate():
    form = request.get_json() or {}

    pdf_path = create_pdf(form)

    # Store PDF to ram
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    # Delete files from storage
    try:
        cleanup_output_files()
    except Exception as e:
        print("Cleanup error:", e)


    return Response(
        pdf_bytes,
        mimetype="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=resume.pdf"
        }
    )

# -------------------------
# DELETE ALL FILES
# -------------------------
def cleanup_output_files():
    for file_path in glob.glob("output_doc*"):
        try:
            os.remove(file_path)
        except Exception as e:
            print("Failed to delete:", file_path, e)

# -------------------------
# CREATE FINAL PDF
# -------------------------
def create_pdf(form):
    name = form.get("name", "No Name")
    number = form.get("number","")
    formatted_number = format_phone(number)
    email = form.get("email","")

    doc = create_document(name)
    
    links = form.get("links",[])
    links_latex = " $|$ ".join(
        rf"\href{{{normalize_link(link['href'])}}}{{{link['title']}}}"
        for link in links if link.get("href") and link.get("title")
    )

    doc.append(NoEscape(rf"""
    \begin{{center}}
        {{\Huge \textbf{{{name}}}}} \\[1em]
        \href{{tel:{number}}}{{{formatted_number}}} $|$
        \href{{mailto:{email}}}{{{email}}}
        {f"$|$ {links_latex}" if links_latex else ""}
    \end{{center}}
    """))

    # --------------------
    # EDUCATION
    # --------------------
    education = form.get("education", [])
    if education:
        doc.append(NoEscape(r"\ressection{Education}"))

        for item in reversed(education):

            bullets = [escape_latex(b) for b in parse_bullets(item.get("content", ""))]

            doc.append(NoEscape(rf"""
            \begin{{tabularx}}{{\textwidth}}{{X r}}
                \textbf{{{escape_latex(item["title"])}}} $|$ \textit{{{escape_latex(item["subtitle"])}}} & {normalize_month_year(item["dateStart"])} -- {normalize_month_year(item["dateEnd"])}
            \end{{tabularx}}
            """))

            # Parsing bullet Points 
            if bullets:
                doc.append(NoEscape(r"\begin{itemize}[leftmargin=2.5em, rightmargin=1em, itemsep=-0.2em]"))
                for b in bullets:
                    doc.append(NoEscape(rf"\item {b}"))
                    
                doc.append(NoEscape(r"\end{itemize}"))
        
    # --------------------
    # EXPERIENCE
    # --------------------
    experience = form.get("experience", [])
    if experience:
        doc.append(NoEscape(r"\ressection{Experience}"))

        for item in reversed(experience):

            bullets = [escape_latex(b) for b in parse_bullets(item.get("content", ""))]

            doc.append(NoEscape(rf"""
            \begin{{tabularx}}{{\textwidth}}{{X r}}
                \textbf{{{escape_latex(item["title"])}}} $|$ \textit{{{escape_latex(item["subtitle"])}}} & {normalize_month_year(item["dateStart"])} -- {normalize_month_year(item["dateEnd"])}
            \end{{tabularx}}
            """))

            # Parsing bullet Points 
            if bullets:
                doc.append(NoEscape(r"\begin{itemize}[leftmargin=2.5em, rightmargin=1em, itemsep=-0.2em]"))
                for b in bullets:
                    doc.append(NoEscape(rf"\item {b}"))
                    
                doc.append(NoEscape(r"\end{itemize}"))

    # --------------------
    # PROJECTS
    # --------------------
    projects = form.get("projects", [])
    if projects:
        doc.append(NoEscape(r"\ressection{Projects}"))

        for item in projects:

            bullets = [escape_latex(b) for b in parse_bullets(item.get("content", ""))]
            
            # Space tech items evenly
            tech = item.get("subtitle", "")
            tech_list = ", ".join(
                escape_latex(t.strip())
                for t in tech.split(",")
                if t.strip()
            )

            # Add hyperlink if given
            link = normalize_link(item.get("dateEnd", "").strip())
            if link:
                doc.append(NoEscape(rf"""
                \begin{{tabularx}}{{\textwidth}}{{X r}}
                    \textbf{{\href{{{link}}}{{{escape_latex(item["title"])}}}}} $|$ \textit{{{tech_list}}} & {normalize_month_year(item["dateStart"])}
                \end{{tabularx}}
                """))
            else:
                doc.append(NoEscape(rf"""
                \begin{{tabularx}}{{\textwidth}}{{X r}}
                    \textbf{{{escape_latex(item["title"])}}} $|$ \textit{{{tech_list}}} & {normalize_month_year(item["dateStart"])}
                \end{{tabularx}}
                """))

            # Parsing bullet Points 
            if bullets:
                doc.append(NoEscape(r"\begin{itemize}[leftmargin=2.5em, rightmargin=1em, itemsep=-0.2em]"))
                for b in bullets:
                    doc.append(NoEscape(rf"\item {b}"))
                    
                doc.append(NoEscape(r"\end{itemize}"))

    # --------------------
    # TECHNICAL SKILLS
    # --------------------
    skills = form.get("skills",[])
    if skills:
        doc.append(NoEscape(rf"""
        \begin{{tabularx}}{{\textwidth}}{{X}}
        """))
        doc.append(NoEscape(r"\ressection{Technical Skills}"))
        doc.append(NoEscape(rf"\vspace{{-0.5em}}"))
        for item in skills:
            skill = item.get("content","")
            skill_list = ", ".join(
                escape_latex(t.strip())
                for t in skill.split(",")
                if t.strip()
            )
            doc.append(NoEscape(rf"""
            \textbf{{{escape_latex(item["title"])}:}} {skill_list} \\
            """))
        
        doc.append(NoEscape(rf"""
        \end{{tabularx}}
        """))


    file_path = "output_document"
    doc.generate_pdf(file_path, clean_tex=False)

    return file_path + ".pdf"

# -------------------------
# CREATE INITIAL DOCUMENT
# -------------------------
def create_document(name: str):
    doc = Document(
        documentclass="article",
        document_options=["letterpaper"]
    )

    doc.preamble.append(NoEscape(rf"""
    \usepackage[margin=0.75in]{{geometry}}
    \usepackage{{booktabs}}
    \usepackage[table]{{xcolor}}

    %% Support for hyperlinks and urls. The setting ``colorlinks'' sets how links
    %% are shown in the document (with a color, without underline). We put hyperref
    %% last---it has a tendency to break other packages when loaded before them.
    \usepackage[colorlinks=true,
                linkcolor=black,
                citecolor=black,
                urlcolor=black
            ]{{hyperref}}
    \usepackage{{graphicx}}
    \usepackage{{pgffor}}
    \usepackage{{caption}}
    \usepackage{{tabularx}}
    \usepackage{{enumitem}}
    \usepackage{{fancyhdr}}

    \newcommand{{\ressection}}[1]{{
        \noindent\textbf{{\large #1}}
        \par\vspace{{0.3em}}
        \hrule
        \vspace{{0.6em}}
    }}
    \pagenumbering{{gobble}}

    \setlength{{\parindent}}{{0pt}}
    """))

    # -------------------------
    # METADATA
    # -------------------------
    doc.preamble.append(NoEscape(rf"""
    \hypersetup{{
        pdftitle={{{name} Resume}},
        pdfauthor={name}
    }}
    """))

    return doc

# -------------------------
# FORMAT PHONE NUMBERS
# -------------------------
def format_phone(number: str) -> str:
    digits = "".join(filter(str.isdigit, number))

    if len(digits) != 10:
        return number  # fallback if invalid

    return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"

# -------------------------
# PARSE BULLET POINTS
# -------------------------
def parse_bullets(text: str):

    # Get bullet points
    bullets = [
        line.strip()
        for line in text.split("-")
        if line.strip()
    ]

    # Add a period if there isnt one
    normalized = [
        b if b.endswith(".") else b + "."
        for b in bullets
    ]

    return normalized

# -------------------------
# NORMALIZE LINKS WITH https://
# -------------------------
def normalize_link(link:str):
    if not link:
        return ""
    
    link = link.rstrip()

    if link.startswith("https://") or link.startswith("http://"):
        return link

    return f"https://{link}"

# -------------------------
# NORMALIZE MONTHS
# -------------------------
def normalize_month_year(value: str) -> str:
    if not value:
        return ""
    
    if value.lower().startswith("pre"):
        return "Present"

    value = value.strip()

    formats = [
        "%Y-%m",
        "%Y/%m",
        "%m/%Y",
        "%B %Y",
        "%b %Y",
        "%b %Y",
    ]

    for fmt in formats:
        try:
            dt = datetime.strptime(value, fmt)
            return dt.strftime("%b %Y")
        except ValueError:
            continue

    return value

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)