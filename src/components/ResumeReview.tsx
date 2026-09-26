"use client";

import { FormState } from "@/lib/types";

type ResumeReviewProps = {
    form: Partial<FormState>;
    onEdit: (step: number) => void;
};

export default function ResumeReview({
    form,
    onEdit
}: ResumeReviewProps) {
    return (
        <div className="
            min-w-0
            w-full
            flex
            flex-col
            gap-4
            py-4
            wrap-anywhere
            [&_h3]:text-center
            [&_h3]:border-b
            [&_h3]:border-gray-300
            [&_h3]:mb-2
            [&_h4]:mt-2
        ">
            <div 
                className="
                    cursor-pointer
                    rounded-xl
                    p-2
                    transition
                    hover:bg-black/5
                "
                onClick={() => onEdit(0)}
            >
                <h3>Personal Information</h3>
                <h4>{form.name}</h4>
                <p>{form.email}</p>
                <p>{form.number}</p>                
            </div>

            {form.links && form.links.length > 0 && (
                <div 
                    className="
                        cursor-pointer
                        rounded-xl
                        p-2
                        transition
                        hover:bg-black/5
                    "
                    onClick={() => onEdit(1)}
                >
                    <h3>Links</h3>
                    {form.links?.map((link, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <h4>{link.title}</h4>

                            <a
                                href={
                                    link.href.startsWith("http://") ||
                                    link.href.startsWith("https://")
                                        ? link.href
                                        : `https://${link.href}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="
                                    text-blue-400 
                                    hover:text-blue-700
                                    w-fit
                                "
                            >
                                {link.href}
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {form.education && form.education.length > 0 && (
                <div 
                    className="
                        cursor-pointer
                        rounded-xl
                        p-2
                        transition
                        hover:bg-black/5
                    "
                    onClick={() => onEdit(2)}
                >
                    <h3>Education</h3>
                    {form.education?.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col gap-2"
                        >
                            <h4 
                                className="
                                    flex 
                                    flex-col 
                                    sm:flex-row 
                                    sm:flex-wrap 
                                    gap-x-2
                            ">
                                {item.title}
                                <span>
                                    {item.dateStart} - {item.dateEnd}
                                </span>
                            </h4>
                            <i>{item.subtitle}</i>
                            {item.content.split(/\r?\n/).map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    ))}                
                </div>
            )}

            {form.experience && form.experience.length > 0 && (
                <div 
                    className="
                        cursor-pointer
                        rounded-xl
                        p-2
                        transition
                        hover:bg-black/5
                    "
                    onClick={() => onEdit(3)}
                >
                    <h3>Experience</h3>
                    {form.experience?.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col gap-2"
                        >
                            <h4 
                                className="
                                    flex 
                                    flex-col 
                                    sm:flex-row 
                                    sm:flex-wrap 
                                    gap-x-2
                            ">
                                {item.title}
                                <span>
                                    {item.dateStart} - {item.dateEnd}
                                </span>
                            </h4>
                            <i>{item.subtitle}</i>
                            {item.content.split(/\r?\n/).map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {form.projects && form.projects.length > 0 && (
                <div 
                    className="
                        cursor-pointer
                        rounded-xl
                        p-2
                        transition
                        hover:bg-black/5
                    "
                    onClick={() => onEdit(4)}
                >
                    <h3>Projects</h3>
                    {form.projects?.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col gap-2"
                        >
                            <h4 
                                className="
                                    flex 
                                    flex-col 
                                    sm:flex-row 
                                    sm:flex-wrap 
                                    gap-x-2
                            ">
                                {item.title}
                                <span>
                                    {item.dateStart}
                                </span>
                            </h4>
                            <i>{item.subtitle}</i>
                            {item.dateEnd.length > 0 && (
                                <a
                                    href={
                                        item.dateEnd.startsWith("http://") ||
                                        item.dateEnd.startsWith("https://")
                                            ? item.dateEnd
                                            : `https://${item.dateEnd}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="
                                        text-blue-400 
                                        hover:text-blue-700 
                                        w-fit

                                    "
                                >
                                    {item.dateEnd}
                                </a>

                            )}
                            {item.content.split(/\r?\n/).map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {form.skills && form.skills.length > 0 && (
                <div 
                    className="
                        cursor-pointer
                        rounded-xl
                        p-2
                        transition
                        hover:bg-black/5
                    "
                    onClick={() => onEdit(5)}
                >
                    <h3>Technical Skills</h3>
                    {form.skills?.map((skill, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <h4>{skill.title}</h4>
                            <p>{skill.content}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}