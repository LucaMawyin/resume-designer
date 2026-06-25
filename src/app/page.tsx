"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";

type ResumeLink = {
    title:string;
    href:string;
}

type ResumeItem = {
    title: string;
    subtitle: string;
    dateStart: string;
    dateEnd: string;
    content: string;
};

type FormState = {
    name: string;
    number: string;
    email: string;
    education: ResumeItem[];
    experience: ResumeItem[];
    projects: ResumeItem[];
    links: ResumeLink[];
};

export default function Home() {

    const initialForm = {
        name: "",
        number: "",
        email: "",
        links:[{
            title:"",
            href:""
        }],
        education: [{
            title: "",
            subtitle: "",
            dateStart: "",
            dateEnd: "",
            content: "",
        }],
        experience: [{
            title: "",
            subtitle: "",
            dateStart: "",
            dateEnd: "",
            content: "",
        }],
        projects: [{
            title: "",
            subtitle: "",
            dateStart: "",
            dateEnd: "",
            content: "",
        }],
    };

    const [form, setForm] = useState<FormState>(initialForm);

    useEffect(() => {
        const saved = localStorage.getItem("resume-form");

        if (saved) {
            const parsed = JSON.parse(saved);

            setForm({
            ...initialForm,
            ...parsed,
            links: parsed.links ?? initialForm.links,
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("resume-form", JSON.stringify(form));
    }, [form]);

    // Update form field
    const updateField = (field: string, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    // Update form fields that have arrays
    const updateResumeItem = (
        section: "education" | "experience" | "projects",
        index: number,
        key: keyof ResumeItem,
        value: string
    ) => {
        setForm(prev => {
            const updated = [...prev[section]];

            updated[index] = {
            ...updated[index],
            [key]: value,
            };

            return {
            ...prev,
            [section]: updated,
            };
        });
    };

    // Add items to form array
    const addResumeItem = (section: "education" | "experience" | "projects") => {
        setForm(prev => ({
            ...prev,
            [section]: [
            ...prev[section],
            {
                title: "",
                subtitle: "",
                dateStart: "",
                dateEnd: "",
                content: "",
            },
            ],
        }));
    };

    // Remove item in array
    const removeResumeItem = (
        section: "education" | "experience" | "projects",
        index: number
    ) => {
        setForm(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    // Add resume link
    const addLink = () => {
        setForm(prev => ({
            ...prev,
            links: [...prev.links, { title: "", href: "" }],
        }));
    };

    // Remove resume link
    const removeLink = (index: number) => {
        setForm(prev => ({
            ...prev,
            links: prev.links.filter((_, i) => i !== index),
        }));
    };

    // Update resume links
    const updateLink = (index: number, key: keyof ResumeLink, value: string) => {
    setForm(prev => {
        const updated = [...prev.links];

        updated[index] = {
        ...updated[index],
        [key]: value,
        };

        return {
        ...prev,
        links: updated,
        };
    });
    };

    // Submit info
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(process.env.NEXT_PUBLIC_EC2_URL);

        const res = await fetch(`${process.env.NEXT_PUBLIC_EC2_URL}/api/route`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };


  return (

    // Wrapper for body
    <div 
        className="
            h-full 
            flex 
        "
    >
        {/* TILE */}
        <div
            className=" 
                my-auto
                mx-auto
                h-fit
                bg-white 
                shadow-[0_0_20px_rgba(0,0,0,0.1)]
                rounded-2xl 
                p-8
                space-y-4
                lg:w-[50vw]
                w-full
            "
        >

            <h1
                className="
                    text-center
                    leading-tight
                    border-b
                    pb-2
                "
            >
                Resume Generator
            </h1>

            <form 
                onSubmit={handleSubmit} 
                className="
                    flex flex-col 
                "
            >

                {/* PERSONAL INFO */}
                <div
                    className="flex flex-col"
                >
                    <h2>Personal Information</h2>
                    <label htmlFor="name">Full Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="border"
                        placeholder="Enter full name"
                        required
                    />
                    

                    <label htmlFor="number">Phone Number (10 digits)</label>
                    <input
                        type="tel"
                        name="number"
                        value={form.number}
                        onChange={(e) => updateField("number", e.target.value)}
                        className="border"
                        placeholder="Enter phone number"
                        minLength={10}
                        maxLength={10}
                        pattern="[0-9]{10}" 
                        required
                    />         

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="border"
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* LINKS */}
                <div className="flex flex-col gap-2 mt-4">
                    <h2>Links</h2>

                    {form.links.map((link, i) => (
                        <div key={i} className="flex flex-col gap-2 border border-gray-300 p-2 rounded-lg">
                            <h3 className="mb-2">Link {i+1}</h3>

                            <label>Website Name</label>
                            <input
                                placeholder="GitHub, LinkedIn, etc..."
                                value={link.title}
                                onChange={(e) => updateLink(i, "title", e.target.value)}
                                className="border"
                            />

                            <label>Website URL</label>
                            <input
                                placeholder="Enter URL"
                                value={link.href}
                                onChange={(e) => updateLink(i, "href", e.target.value)}
                                className="border"
                            />

                            <Button
                                text="Remove"
                                type="button"
                                variant="red"
                                className="py-2! px-4! min-h-fit!"
                                onClick={() => removeLink(i)}
                            />
                        </div>
                    ))}

                    <Button 
                        text="+ Add Link"
                        type="button" 
                        variant="secondary"
                        className="w-fit self-center"
                        onClick={addLink}
                    />
                        
                </div>
                
                {/* EDUCATION */}
                <div
                    className="flex flex-col gap-4 mb-4"
                >
                    <h2>Education</h2>
                    {form.education.map((val, i) => (
                        <div key={i} className="flex flex-col gap-2 border border-gray-300 p-2 rounded-lg">
                            <h3 className="mb-2">Education {i+1}</h3>
                            <label>Institution</label>
                            <input
                                value={val.title}
                                placeholder="Enter Institution Name"
                                onChange={(e) =>
                                    updateResumeItem("education", i, "title", e.target.value)
                                }
                                required
                            />

                            <label>Degree/Program</label>
                            <input
                                value={val.subtitle}
                                placeholder="Enter Degree/Program"
                                onChange={(e) =>
                                    updateResumeItem("education", i, "subtitle", e.target.value)
                                }
                                required
                            />

                            <label>Start Date</label>
                            <input
                                value={val.dateStart}
                                placeholder="Month Year"
                                onChange={(e) =>
                                    updateResumeItem("education", i, "dateStart", e.target.value)
                                }
                                required
                            />

                            <label>End Date</label>
                            <input
                                value={val.dateEnd}
                                placeholder="Month Year (or Present)"
                                onChange={(e) =>
                                    updateResumeItem("education", i, "dateEnd", e.target.value)
                                }
                                required
                            />

                            <label>Content (Point Form)</label>
                            <textarea
                                value={val.content}
                                rows={5}
                                placeholder={"- First point\n- Second point\n- Third point"}
                                onChange={(e) =>
                                    updateResumeItem("education", i, "content", e.target.value)
                                }
                                required
                            />

                            <Button
                                text="Remove"
                                type="button"
                                variant="red"
                                className="py-2! px-4! min-h-fit"
                                onClick={() => removeResumeItem("education", i)}
                            />
                        </div>
                    ))}

                    <Button 
                        text="+ Add Education"
                        type="button" 
                        variant="secondary"
                        className="w-fit self-center"
                        onClick={() => addResumeItem("education")}
                    />
                </div>

                {/* EXPERIENCE */}
                <div
                    className="flex flex-col gap-4 mb-4"
                >
                    <h2>Experience</h2>
                    {form.experience.map((val, i) => (
                        <div key={i} className="flex flex-col gap-2 border border-gray-300 p-2 rounded-lg">
                            <h3 className="mb-2">Experience {i+1}</h3>
                            <label>Job Title</label>
                            <input
                                value={val.title}
                                placeholder="Enter Job Title"
                                onChange={(e) =>
                                    updateResumeItem("experience", i, "title", e.target.value)
                                }
                                required
                            />

                            <label>Company</label>
                            <input
                                value={val.subtitle}
                                placeholder="Enter Company Name"
                                onChange={(e) =>
                                    updateResumeItem("experience", i, "subtitle", e.target.value)
                                }
                                required
                            />

                            <label>Start Date</label>
                            <input
                                value={val.dateStart}
                                placeholder="Month Year"
                                onChange={(e) =>
                                    updateResumeItem("experience", i, "dateStart", e.target.value)
                                }
                                required
                            />

                            <label>End Date</label>
                            <input
                                value={val.dateEnd}
                                placeholder="Month Year (or Present)"
                                onChange={(e) =>
                                    updateResumeItem("experience", i, "dateEnd", e.target.value)
                                }
                                required
                            />

                            <label>Content (Point Form)</label>
                            <textarea
                                value={val.content}
                                rows={5}
                                placeholder={"- First point\n- Second point\n- Third point"}
                                onChange={(e) =>
                                    updateResumeItem("experience", i, "content", e.target.value)
                                }
                                required
                            />

                            <Button
                                text="Remove"
                                type="button"
                                variant="red"
                                className="py-2! px-4! min-h-fit"
                                onClick={() => removeResumeItem("experience", i)}
                            />
                        </div>
                    ))}

                    <Button 
                        text="+ Add Experience"
                        type="button" 
                        variant="secondary"
                        className="w-fit self-center"
                        onClick={() => addResumeItem("experience")}
                    />
                </div>

                {/* PROJECTS */}
                <div
                    className="flex flex-col gap-4 mb-4"
                >
                    <h2>Projects</h2>
                    {form.projects.map((val, i) => (
                        <div key={i} className="flex flex-col gap-2 border border-gray-300 p-2 rounded-lg">
                            <h3 className="mb-2">Project {i+1}</h3>
                            <label>Project Name</label>
                            <input
                                value={val.title}
                                placeholder="Enter Project Name"
                                onChange={(e) =>
                                    updateResumeItem("projects", i, "title", e.target.value)
                                }
                                required
                            />

                            <label>Tech Used (Comma Seperated)</label>
                            <input
                                value={val.subtitle}
                                placeholder="Enter Tech Stack"
                                onChange={(e) =>
                                    updateResumeItem("projects", i, "subtitle", e.target.value)
                                }
                                required
                            />

                            <label>Creation Date</label>
                            <input
                                value={val.dateStart}
                                placeholder="Month Year"
                                onChange={(e) =>
                                    updateResumeItem("projects", i, "dateStart", e.target.value)
                                }
                                required
                            />

                            <label>Link</label>
                            <input
                                value={val.dateEnd}
                                placeholder="Enter Project Link"
                                onChange={(e) =>
                                    updateResumeItem("projects", i, "dateEnd", e.target.value)
                                }
                            />

                            <label>Content (Point Form)</label>
                            <textarea
                                value={val.content}
                                rows={5}
                                placeholder={"- First point\n- Second point\n- Third point"}
                                onChange={(e) =>
                                    updateResumeItem("projects", i, "content", e.target.value)
                                }
                                required
                            />

                            <Button
                                text="Remove"
                                type="button"
                                variant="red"
                                className="py-2! px-4! min-h-fit"
                                onClick={() => removeResumeItem("projects", i)}
                            />
                        </div>
                    ))}

                    <Button 
                        text="+ Add Project"
                        type="button" 
                        variant="secondary"
                        className="w-fit self-center"
                        onClick={() => addResumeItem("projects")}
                    />
                </div>

                <Button
                    text="Submit"
                    variant="primary"
                    type="submit" 
                    className="
                        bg-blue-500 
                        text-white p-2
                    "
                />

            </form>
        </div>
    </div>
  );
}