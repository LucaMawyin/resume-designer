# [Resumely - Online Resume Designer](https://resumelyonline.vercel.app)

**Resumely** is a web-based application for creating and customizing resumes through an interactive editor and generating professional LaTeX documents.

**Live Application**: https://resumelyonline.vercel.app

## Features

- Interactive resume editor
- Real-time resume preview
- Dynamic resume customization
- Resume source file import and export
- Local resume persistence
- Automated LaTeX generation
- REST API for document generation

## How It Works

Resumely seperates the resume editing experience from document generation.

1. The user enters and customizes their resume through the React interface.
2. Resume data can be saved locally or exported as a source file.
3. Previously exported source files can be uploaded to restore a resume.
4. Resume data is sent to the document-generation API.
5. The Flask API processes the submitted information.
6. A LaTeX document is generated from the resume data.
7. LaTeX compiles the document into a formatted PDF.
8. The generated document is returned to the application.

This architecture allows the frontend to focus on the editing experience while the backend handles document generation and LaTeX compilation.

## Tech Stack

### Frontend

- **TypeScript**
- **React**

### Backend

- **Python**
- **Flask**
- **PyLaTeX**
- **LaTeX**

### Infrastructure

- **Vercel**
- **Raspberry Pi**
- **Cloudflare**
- **GitHub Actions**

## Architecture

```
┌─────────────────────┐
│      React App      │
│                     │
│ Resume Editor       │
│ Live Preview        │
│ Request Console     │
└──────────┬──────────┘
           │
           │ HTTPS
           ▼
┌─────────────────────┐
│  Cloudflare Tunnel  │
│                     │
│ Securely forwards   │
│ traffic to server   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Raspberry Pi      │
│                     │
│     Flask API       │
│                     │
│ Request Validation  │
│ Resume Processing   │
│ PyLaTeX Generation  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       LaTeX         │
│                     │
│ Document Compilation│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Generated PDF    │
└─────────────────────┘
```

## Project Structure

```
.
├── src/
│   └── app/
│       ├── page.tsx
│       ├── layout.tsx
│       └── global.css
│
├── build/
│   ├── page.tsx
│   └── layout.tsx
│
├── deprecated/     # Deprecated/legacy code
│
└── python/
    └── api.py      # Flask document-generation API
```

## Deployment

The frontend is deployed using Vercel.

The Flask API and LaTeX document-generation environment are hosted on a Raspberry Pi server. The server is exposed to the internet through a Cloudflare Tunnel, allowing the API to be accessed without directly exposing the Raspberry Pi to the public internet.

GitHub Actions is used to automate project workflows and deployment.

## API

The application utilizes a REST API for generating documents from submitted resume data.

The API accepts structured resume information and returns the generated document after LaTeX compilation.

## Source Files

**Resumely** supports exporting and importing resume source files.

Users can download their resume data as a JSON source file, which can later be uploaded to restore and continue editing the resume.

This allows resumes to be backed up, transferred between devices, or reused without requiring an account or server-side storage.
