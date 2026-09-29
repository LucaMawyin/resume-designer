export default function Documentation() {
    return (
        <main className="flex w-full justify-center px-4 py-12">
            <div className="flex w-full max-w-4xl flex-col gap-8">
                
                {/* Header */}
                <section className="
                    pillow
                    squircle
                    bg-white
                    p-8
                    sm:p-12
                ">
                    <p className="mb-3 text-sm font-semibold text-green-500">
                        DOCUMENTATION
                    </p>

                    <h1>Resumely</h1>

                    <p className="mt-4 max-w-2xl text-gray-500">
                        Resumely is an open-source resume builder for creating
                        clean, professional resumes from structured information.
                    </p>
                </section>

                {/* Getting Started */}
                <section className="
                    pillow
                    squircle
                    bg-white
                    p-8
                    sm:p-10
                ">
                    <h2>Getting Started</h2>

                    <p className="mt-4 text-gray-600">
                        Creating a resume with Resumely is straightforward:
                    </p>

                    <ol className="
                        mt-6
                        flex
                        flex-col
                        gap-4
                        text-gray-600
                    ">
                        <li className="flex gap-4">
                            <span className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-green-500
                                text-sm
                                font-semibold
                                text-white
                            ">
                                1
                            </span>
                            <span>
                                Enter your personal information and resume
                                sections.
                            </span>
                        </li>

                        <li className="flex gap-4">
                            <span className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-green-500
                                text-sm
                                font-semibold
                                text-white
                            ">
                                2
                            </span>
                            <span>
                                Review the information you entered and make
                                any necessary changes.
                            </span>
                        </li>

                        <li className="flex gap-4">
                            <span className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-green-500
                                text-sm
                                font-semibold
                                text-white
                            ">
                                3
                            </span>
                            <span>
                                Download your completed resume as a PDF.
                            </span>
                        </li>

                        <li className="flex gap-4">
                            <span className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-green-500
                                text-sm
                                font-semibold
                                text-white
                            ">
                                4
                            </span>
                            <span>
                                Optionally download the source file so your
                                resume can be edited or restored later.
                            </span>
                        </li>
                    </ol>
                </section>

                {/* Resume Sections */}
                <section className="
                    pillow
                    squircle
                    bg-white
                    p-8
                    sm:p-10
                ">
                    <h2>Resume Sections</h2>

                    <p className="mt-4 text-gray-600">
                        Resumely supports several built-in sections as well as
                        custom sections.
                    </p>

                    <div className="
                        mt-6
                        grid
                        gap-4
                        sm:grid-cols-2
                    ">
                        {[
                            {
                                title: "Personal Information",
                                description:
                                    "Your name, email address, and phone number.",
                            },
                            {
                                title: "Links",
                                description:
                                    "Websites, GitHub profiles, LinkedIn profiles, and other relevant links.",
                            },
                            {
                                title: "Education",
                                description:
                                    "Schools, degrees, programs, dates, and descriptions.",
                            },
                            {
                                title: "Experience",
                                description:
                                    "Professional experience, positions, dates, and accomplishments.",
                            },
                            {
                                title: "Projects",
                                description:
                                    "Personal, academic, or professional projects.",
                            },
                            {
                                title: "Technical Skills",
                                description:
                                    "Technical skills and their descriptions or proficiency information.",
                            },
                        ].map((section) => (
                            <div
                                key={section.title}
                                className="
                                    squircle
                                    border
                                    border-gray-200
                                    bg-gray-50
                                    p-5
                                "
                            >
                                <h3 className="text-base">
                                    {section.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    {section.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Custom Sections */}
                <section className="
                    pillow
                    squircle
                    bg-white
                    p-8
                    sm:p-10
                ">
                    <h2>Custom Sections</h2>

                    <p className="mt-4 text-gray-600">
                        Custom sections allow you to add information that does
                        not fit into the standard resume sections.
                    </p>

                    <p className="mt-4 text-gray-600">
                        Each custom section has its own title and can contain
                        multiple items. Each item supports a title, subtitle,
                        dates, and content.
                    </p>

                    <div className="
                        mt-6
                        squircle
                        bg-gray-50
                        border
                        border-gray-200
                        p-5
                    ">
                        <p className="text-sm font-bold text-gray-700">
                            Example
                        </p>

                        <div className="mt-4 space-y-3 text-sm text-gray-500">
                            <p>
                                <span className="font-medium text-gray-700">
                                    Awards
                                </span>
                                {" "}→ Dean's List
                            </p>

                            <p>
                                <span className="font-medium text-gray-700">
                                    Certifications
                                </span>
                                {" "}→ AWS Certified Developer
                            </p>

                            <p>
                                <span className="font-medium text-gray-700">
                                    Activities
                                </span>
                                {" "}→ Computer Science Club
                            </p>
                        </div>
                    </div>
                </section>

                {/* Saved Resumes */}
                <section className="
                    pillow
                    squircle
                    bg-white
                    p-8
                    sm:p-10
                ">
                    <h2>Saved Resumes</h2>

                    <p className="mt-4 text-gray-600">
                        Resumely automatically saves your current resume in
                        your browser's local storage while you work.
                    </p>

                    <p className="mt-4 text-gray-600">
                        When you return to Resumely, you can continue working
                        on your saved resume instead of starting over.
                    </p>

                    <div className="
                        mt-6
                        squircle
                        border
                        border-yellow-200
                        bg-yellow-50
                        p-5
                        text-sm
                        text-yellow-800
                    ">
                        Your saved resume is stored locally in your browser.
                        Clearing your browser's site data can remove it.
                    </div>
                </section>

                {/* Source Files */}
                <section className="
                    pillow
                    squircle
                    bg-white
                    p-8
                    sm:p-10
                ">
                    <h2>Source Files</h2>

                    <p className="mt-4 text-gray-600">
                        Resumely can export your resume's structured data as a
                        <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-sm">
                            .resumely
                        </code>
                        source file.
                    </p>

                    <p className="mt-4 text-gray-600">
                        Source files allow you to keep a portable copy of your
                        resume data and upload it again later.
                    </p>

                    <div className="
                        mt-6
                        squircle
                        bg-gray-900
                        p-5
                        font-mono
                        text-sm
                        text-gray-200
                        overflow-x-auto
                    ">
                        <pre>{`{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "number": "555-123-4567",
    "education": [...],
    "experience": [...],
    "projects": [...],
    "skills": [...],
    "custom": [...]
}`}</pre>
                    </div>
                </section>

                {/* Privacy */}
                <section className="
                    pillow
                    squircle
                    bg-white
                    p-8
                    sm:p-10
                ">
                    <h2>Privacy</h2>

                    <p className="mt-4 text-gray-600">
                        Resume information entered into the builder is stored
                        locally in your browser while you work. Resumely does
                        not require an account to create a resume.
                    </p>

                    <p className="mt-4 text-gray-600">
                        When you download a resume, the information you provide
                        is processed to generate the requested document.
                    </p>
                </section>
            </div>
        </main>
    );
}

