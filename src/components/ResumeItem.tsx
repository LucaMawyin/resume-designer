"use client";

import { ResumeItemProp } from "@/lib/types";
import Button from "./Button";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function ResumeItem({
    title,
    items,
    onChange,
    onAdd,
    onRemove,
    isCustom = false,
}: ResumeItemProp) {

    const [removeIndex, setRemoveIndex] = useState<number | null>(null);

    const handleRemove = () => {
        if (removeIndex === null) return;

        onRemove(removeIndex);
        setRemoveIndex(null);
    };

    return (
        <>
            <div className="
                flex
                flex-col
                gap-4
            ">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="
                            flex
                            flex-col
                        "
                    >
                        <label htmlFor={`title-${index}`}>Title {isCustom && "(required)"}</label>
                        <input
                            type="text"
                            id={`title-${index}`}
                            name={`title-${index}`}
                            value={item.title}
                            onChange={(e) => onChange(index, "title", e.target.value)}
                            placeholder={`Enter ${title.length > 0 ? `${title} ` : ""}name`}
                        />

                        <label htmlFor={`subtitle-${index}`}>Subtitle (optional)</label>
                        <input
                            type="text"
                            id={`subtitle-${index}`}
                            name={`subtitle-${index}`}
                            value={item.subtitle}
                            onChange={(e) => onChange(index, "subtitle", e.target.value)}
                            placeholder="Institution, Role, etc..."
                        />

                        <label htmlFor={`dateStart-${index}`}>Start Date (optional)</label>
                        <input
                            type="text"
                            id={`dateStart-${index}`}
                            name={`dateStart-${index}`}
                            value={item.dateStart}
                            onChange={(e) => onChange(index, "dateStart", e.target.value)}
                            placeholder="Enter start date"
                        />

                        <label htmlFor={`dateEnd-${index}`}>
                            {title === "Projects" ? "URL" : "End Date"} (optional)
                        </label>

                        <input
                            type={title === "Projects" ? "url" : "text"}
                            id={`dateEnd-${index}`}
                            name={`dateEnd-${index}`}
                            value={item.dateEnd}
                            onChange={(e) =>
                                onChange(index, "dateEnd", e.target.value)
                            }
                            placeholder={`${
                                title === "Projects"
                                    ? "https://github.com/..."
                                    : "Enter end date"
                                } (or leave empty)
                            `}
                        />

                        <label>Content (Point Form)</label>
                        <textarea
                            id={`content-${index}`}
                            name={`content-${index}`}
                            value={item.content}
                            rows={5}
                            placeholder={"- First point\n- Second point\n- Third point"}
                            onChange={(e) => onChange(index, "content", e.target.value)}
                            required
                        />
                        {items.length > 1 && (
                            <Button
                                text="Remove Item"
                                type="button"
                                variant="red"
                                x={8}
                                y={2}
                                onClick={() => setRemoveIndex(index)}
                            />                        
                        )}

                    </div>
                ))}
                <Button
                    text={`Add ${items.length === 0 ? "An" : "Another"} Item`}
                    type="button"
                    variant="secondary"
                    x={8}
                    y={2}
                    onClick={onAdd}
                />

            </div>      

            {removeIndex !== null && (
                <ConfirmationModal
                    title={`Remove From ${title}?`}
                    message={
                        <>
                            <p>
                                Are you sure you want to remove{" "}
                                <strong>
                                    {items[removeIndex].title}
                                </strong>
                                {" "}from {title.toLowerCase()}?
                            </p>
                            <p>
                                This cannot be undone.
                            </p>                        
                        </>

                    }
                    confirmText="Remove"
                    onConfirm={handleRemove}
                    onCancel={() => setRemoveIndex(null)}
                />
            )}  
        </>

    );
}