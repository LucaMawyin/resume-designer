import os
import glob
from flask import Flask, request, Response
from flask_cors import CORS
from pylatex import Document, NoEscape, escape_latex
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

'''
Commands:

cd .\python\
flask --app api run --debug
'''

def non_empty_items(items):
    return [
        item for item in items
        if any(item.values())
    ]

@app.route('/api/route', methods=['POST'])
def generate():
    form = request.get_json() or {}

    output_file = uuid.uuid4().hex
    pdf_path = create_pdf(form,output_file)

    # Store PDF to ram
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()
        
    # Delete files from storage
    try:
        cleanup_output_files(output_file)
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
def cleanup_output_files(output_file:str):
    for file_path in glob.glob(f"{output_file}*"):
        try:
            os.remove(file_path)
        except Exception as e:
            print("Failed to delete:", file_path, e)

# -------------------------
# CREATE FINAL PDF
# -------------------------
def create_pdf(form, output_file:str):
    name = form.get("name", "No Name")
    number = form.get("number","")
    formatted_number = format_phone(number)
    email = form.get("email","")

    layout_sizes = {
        "small": {
            "margin": "0.5in",
            "section_before": "0.2em",
            "section_after": "0.4em",
        },
        "medium": {
            "margin": "0.75in",
            "section_before": "0.4em",
            "section_after": "0.7em",
        },
        "large": {
            "margin": "1in",
            "section_before": "0.6em",
            "section_after": "1em",
        },
    }
    
    margin_size = form.get("marginSize", "small")
    layout = layout_sizes.get(margin_size, layout_sizes["small"])

    margin = layout["margin"]
    section_before = layout["section_before"]
    section_after = layout["section_after"]

    doc = create_document(
        name,
        margin,
        section_before,
        section_after
    )

    links = non_empty_items(form.get("links", []))
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
    education = non_empty_items(form.get("education", []))
    if education:
        doc.append(NoEscape(r"\ressection{Education}"))

        for i, item in enumerate(education):

            if i > 0:
                doc.append(NoEscape(r"\vspace{-0.3em}"))

            bullets = [
                escape_latex(b)
                for b in parse_bullets(item.get("content", ""))
            ]

            title = item.get("title", "").strip()
            subtitle = item.get("subtitle", "").strip()
            date_start = item.get("dateStart", "").strip()
            date_end = item.get("dateEnd", "").strip()

            # Build title / subtitle
            left_side = rf"\textbf{{{escape_latex(title)}}}"

            if subtitle:
                left_side += (
                    rf" $|$ \textit{{{escape_latex(subtitle)}}}"
                )

            # Build date range
            if date_start and date_end:
                date = (
                    f"{normalize_month_year(date_start)} -- "
                    f"{normalize_month_year(date_end)}"
                )
            elif date_start:
                date = normalize_month_year(date_start)
            elif date_end:
                date = normalize_month_year(date_end)
            else:
                date = ""

            doc.append(NoEscape(rf"""
            \begin{{tabularx}}{{\textwidth}}{{X r}}
                {left_side} & {date}
            \end{{tabularx}}
            \vspace{{-1.75em}}
            """))

            if bullets:
                doc.append(
                    NoEscape(
                        r"\begin{itemize}"
                        r"[leftmargin=2.5em, rightmargin=1em, itemsep=-0.2em]"
                    )
                )

                for b in bullets:
                    doc.append(NoEscape(rf"\item {b}"))

                doc.append(NoEscape(r"\end{itemize}"))

    # --------------------
    # EXPERIENCE
    # --------------------
    experience = non_empty_items(form.get("experience", []))
    if experience:
        doc.append(NoEscape(r"\ressection{Experience}"))

        for i, item in enumerate(experience):

            if i > 0:
                doc.append(NoEscape(r"\vspace{-0.3em}"))

            bullets = [
                escape_latex(b)
                for b in parse_bullets(item.get("content", ""))
            ]

            title = item.get("title", "").strip()
            subtitle = item.get("subtitle", "").strip()
            date_start = item.get("dateStart", "").strip()
            date_end = item.get("dateEnd", "").strip()

            left_side = rf"\textbf{{{escape_latex(title)}}}"

            if subtitle:
                left_side += (
                    rf" $|$ \textit{{{escape_latex(subtitle)}}}"
                )

            if date_start and date_end:
                date = (
                    f"{normalize_month_year(date_start)} -- "
                    f"{normalize_month_year(date_end)}"
                )
            elif date_start:
                date = normalize_month_year(date_start)
            elif date_end:
                date = normalize_month_year(date_end)
            else:
                date = ""

            doc.append(NoEscape(rf"""
            \begin{{tabularx}}{{\textwidth}}{{X r}}
                {left_side} & {date}
            \end{{tabularx}}
            \vspace{{-1.75em}}
            """))

            if bullets:
                doc.append(
                    NoEscape(
                        r"\begin{itemize}"
                        r"[leftmargin=2.5em, rightmargin=1em, itemsep=-0.2em]"
                    )
                )

                for b in bullets:
                    doc.append(NoEscape(rf"\item {b}"))

                doc.append(NoEscape(r"\end{itemize}"))

    # --------------------
    # PROJECTS
    # --------------------
    projects = non_empty_items(form.get("projects", []))
    if projects:
        doc.append(NoEscape(r"\ressection{Projects}"))

        for i, item in enumerate(projects):

            if i > 0:
                doc.append(NoEscape(r"\vspace{-0.3em}"))

            bullets = [
                escape_latex(b)
                for b in parse_bullets(item.get("content", ""))
            ]

            title = item.get("title", "").strip()
            tech = item.get("subtitle", "").strip()
            date_start = item.get("dateStart", "").strip()
            link = item.get("dateEnd", "").strip()

            # Build title
            if link:
                normalized_link = normalize_link(link)

                left_side = (
                    rf"\textbf{{\href{{{normalized_link}}}"
                    rf"{{{escape_latex(title)}}}}}"
                )
            else:
                left_side = rf"\textbf{{{escape_latex(title)}}}"

            # Add technologies if provided
            if tech:
                tech_list = ", ".join(
                    escape_latex(t.strip())
                    for t in tech.split(",")
                    if t.strip()
                )

                if tech_list:
                    left_side += rf" $|$ \textit{{{tech_list}}}"

            # Build date
            date = (
                normalize_month_year(date_start)
                if date_start
                else ""
            )

            doc.append(NoEscape(rf"""
            \begin{{tabularx}}{{\textwidth}}{{X r}}
                {left_side} & {date}
            \end{{tabularx}}
            \vspace{{-1.75em}}
            """))

            # Bullet points
            if bullets:
                doc.append(
                    NoEscape(
                        r"\begin{itemize}"
                        r"[leftmargin=2.5em, rightmargin=1em, itemsep=-0.2em]"
                    )
                )

                for b in bullets:
                    doc.append(NoEscape(rf"\item {b}"))

                doc.append(NoEscape(r"\end{itemize}"))

    # --------------------
    # CUSTOM SECTIONS
    # --------------------
    custom_sections = form.get("custom", [])

    for section in custom_sections:
        section_title = section.get("title", "").strip()
        items = non_empty_items(section.get("items", []))

        if not section_title or not items:
            continue

        doc.append(
            NoEscape(
                rf"\ressection{{{escape_latex(section_title)}}}"
            )
        )

        for i, item in enumerate(items):

            if i > 0:
                doc.append(NoEscape(r"\vspace{-0.3em}"))

            title = item.get("title", "").strip()
            subtitle = item.get("subtitle", "").strip()
            date_start = item.get("dateStart", "").strip()
            date_end = item.get("dateEnd", "").strip()
            content = item.get("content", "").strip()

            bullets = [
                escape_latex(b)
                for b in parse_bullets(content)
            ]

            # Date display
            if date_start and date_end:
                date = (
                    f"{normalize_month_year(date_start)} -- "
                    f"{normalize_month_year(date_end)}"
                )
            elif date_start:
                date = normalize_month_year(date_start)
            elif date_end:
                date = normalize_month_year(date_end)
            else:
                date = ""

            # Title / subtitle / date
            left_side = rf"\textbf{{{escape_latex(title)}}}"

            if subtitle:
                left_side += (
                    rf" $|$ \textit{{{escape_latex(subtitle)}}}"
                )

            doc.append(
                NoEscape(
                    rf"""
                    \begin{{tabularx}}{{\textwidth}}{{X r}}
                        {left_side} & {date}
                    \end{{tabularx}}
                    \vspace{{-1.75em}}
                    """
                )
            )

            # Content / bullet points
            if bullets:
                doc.append(
                    NoEscape(
                        r"\begin{itemize}"
                        r"[leftmargin=2.5em, rightmargin=1em, itemsep=-0.2em]"
                    )
                )

                for bullet in bullets:
                    doc.append(
                        NoEscape(rf"\item {bullet}")
                    )

                doc.append(
                    NoEscape(r"\end{itemize}")
                )

    # --------------------
    # TECHNICAL SKILLS
    # --------------------
    skills = non_empty_items(form.get("skills", []))
    if skills:
        doc.append(NoEscape(rf"""
        \begin{{tabularx}}{{\textwidth}}{{X}}
        """))
        doc.append(NoEscape(r"\ressection{Technical Skills}"))
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


    file_path = output_file
    doc.generate_pdf(
        file_path, 
        clean_tex=False,
        compiler="pdflatex"
    )

    return file_path + ".pdf"
    

# -------------------------
# CREATE INITIAL DOCUMENT
# -------------------------
def create_document(
    name: str,
    margin: str,
    section_before: str,
    section_after: str
):
    doc = Document(
        documentclass="article",
        document_options=["letterpaper"]
    )

    doc.preamble.append(NoEscape(rf"""
    \usepackage[margin={margin}]{{geometry}}
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
        {{
            \noindent\MakeUppercase{{#1}}
            \par\vspace{{{section_before}}}
            \hrule
            \vspace{{{section_after}}}
        }}
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
    bullets = []

    for line in text.splitlines():
        line = line.strip()

        if line.startswith("-"):
            bullet = line[1:].strip()

            if bullet:
                bullets.append(
                    bullet if bullet.endswith(".") else bullet + "."
                )

    return bullets

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
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)