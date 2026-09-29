"use client";

import { FormState, SectionKey } from "@/lib/types";
import Button from "./Button";

type ResumeReviewProps = {
    form: Partial<FormState>;
    skippedSections: Record<SectionKey, boolean>;
    skippedCustom: boolean;
    onEdit: (step: number) => void;
    onMarginChange: (value: FormState["marginSize"]) => void;
};

const marginOptions: {
    value: FormState["marginSize"];
    label: string;
}[] = [
    { value: "small", label: "Compact" },
    { value: "medium", label: "Standard" },
    { value: "large", label: "Spacious" },
];

export default function ResumeReview({
    form,
    skippedSections,
    skippedCustom,
    onEdit,
    onMarginChange
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
            <div className="flex flex-col gap-2 rounded-xl p-2">
                <h3>Resume Margins</h3>

                <div className="flex flex-nowrap gap-2 justify-center">
                    {marginOptions.map((option) => (
                        <Button
                            key={option.value}
                            type="button"
                            text={option.label}
                            onClick={() => onMarginChange(option.value)}
                            className={`
                                flex-1
                                border
                                transition
                                ${
                                    form.marginSize === option.value
                                        ? "border-black bg-black text-white hover:bg-zinc-800"
                                        : "border-gray-300 bg-white text-black! hover:bg-gray-100"
                                }
                            `}
                            x={4}
                            y={2}
                        />
                    ))}
                </div>
            </div>
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

            {form.links && (
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
                    {skippedSections.links ? (
                        <p className="text-gray-400 italic">
                            Skipped (won't appear on resume).
                        </p>
                    ) : form.links.length === 0 ? (
                        <p className="text-gray-400 italic">
                            No links added (won't appear on resume).
                        </p>
                    ) : (
                        form.links?.map((link, index) => (
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
                        ))                       
                    )}

                </div>
            )}

            {form.education && (
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
                    {skippedSections.education ? (
                        <p className="text-gray-400 italic">
                            Skipped (won't appear on resume).
                        </p>
                    ) : form.education.length === 0 ? (
                        <p className="text-gray-400 italic">
                            No education added (won't appear on resume).
                        </p>
                    ) : (
                        form.education?.map((item, index) => (
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
                                    {(item.dateStart || item.dateEnd) && (
                                        <span>
                                            {item.dateStart}
                                            {item.dateStart && item.dateEnd
                                                ? " - "
                                                : ""}
                                            {item.dateEnd}
                                        </span>
                                    )}
                                </h4>
                                <i>{item.subtitle}</i>
                                {item.content.split(/\r?\n/).map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        ))     
                    )}
          
                </div>
            )}

            {form.experience && (
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
                    {skippedSections.experience ? (
                        <p className="text-gray-400 italic">
                            Skipped (won't appear on resume).
                        </p>
                    ) : form.experience.length === 0 ? (
                        <p className="text-gray-400 italic">
                            No experience added (won't appear on resume).
                        </p>
                    ) : (
                        form.experience?.map((item, index) => (
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
                                    {(item.dateStart || item.dateEnd) && (
                                        <span>
                                            {item.dateStart}
                                            {item.dateStart && item.dateEnd
                                                ? " - "
                                                : ""}
                                            {item.dateEnd}
                                        </span>
                                    )}
                                </h4>
                                <i>{item.subtitle}</i>
                                {item.content.split(/\r?\n/).map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            )}

            {form.projects && (
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
                    {skippedSections.projects ? (
                        <p className="text-gray-400 italic">
                            Skipped (won't appear on resume).
                        </p>
                    ) : form.projects.length === 0 ? (
                        <p className="text-gray-400 italic">
                            No projects added (won't appear on resume).
                        </p>
                    ) : (
                        form.projects?.map((item, index) => (
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
                        ))
                    )}

                </div>
            )}

            {form.skills && (
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
                    {skippedSections.skills ? (
                        <p className="text-gray-400 italic">
                            Skipped (won't appear on resume).
                        </p>
                    ) : form.skills.length === 0 ? (
                        <p className="text-gray-400 italic">
                            No skills added (won't appear on resume).
                        </p>
                    ) : (
                        form.skills?.map((skill, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <h4>{skill.title}</h4>
                                <p>{skill.content}</p>
                            </div>
                        ))
                    )}

                </div>
            )}

            {form.custom && (
                <div
                    className="
                        cursor-pointer
                        rounded-xl
                        p-2
                        transition
                        hover:bg-black/5
                    "
                    onClick={() => onEdit(6)}
                >
                    <h3>Custom Sections</h3>
                    {skippedCustom ? (
                        <p className="text-gray-400 italic">
                            Skipped (won't appear on resume).
                        </p>
                    ) : form.custom.length === 0 ? (
                        <p className="text-gray-400 italic">
                            No custom section added (won't appear on resume).
                        </p>
                    ) : (
                        form.custom.map((section, sectionIndex) => (
                            <div
                                key={sectionIndex}
                                className="flex flex-col gap-4"
                            >
                                <h4>{section.title}</h4>

                                {section.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex flex-col gap-2"
                                    >
                                        <h4
                                            className="
                                                flex
                                                flex-col
                                                sm:flex-row
                                                sm:flex-wrap
                                                gap-x-2
                                            "
                                        >
                                            {item.title}

                                            {(item.dateStart || item.dateEnd) && (
                                                <span>
                                                    {item.dateStart}
                                                    {item.dateStart && item.dateEnd
                                                        ? " - "
                                                        : ""}
                                                    {item.dateEnd}
                                                </span>
                                            )}
                                        </h4>

                                        {item.subtitle && (
                                            <i>{item.subtitle}</i>
                                        )}

                                        {item.content &&
                                            item.content
                                                .split(/\r?\n/)
                                                .map((line, i) => (
                                                    <p key={i}>{line}</p>
                                                ))}
                                    </div>
                                ))}
                            </div>
                        ))                        
                    )}


                </div>
            )}

        </div>
    );
}