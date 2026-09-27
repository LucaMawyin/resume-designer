"use client";

import { ResumeSkillProps } from "@/lib/types";
import Button from "./Button";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function ResumeSkill({
    items,
    onChange,
    onAdd,
    onRemove,
}: ResumeSkillProps) {
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
                        className="flex flex-col"
                    >
                        <label htmlFor={`title-${index}`}>Skill Name</label>
                        <input
                            type="text"
                            id={`title-${index}`}
                            name={`title-${index}`}
                            value={item.title}
                            placeholder="Tools, Languages, etc..."
                            onChange={(e) =>
                                onChange(index, "title", e.target.value)
                            }
                        />

                        <label htmlFor={`content-${index}`}>
                            Content (Comma separated)
                        </label>
                        <input
                            type="text"
                            id={`content-${index}`}
                            name={`content-${index}`}
                            value={item.content}
                            placeholder="Enter content"
                            onChange={(e) =>
                                onChange(index, "content", e.target.value)
                            }
                        />
                        {items.length > 1 && (
                            <Button
                                text="Remove"
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
                    title="Remove From Skills?"
                    message={
                        <>
                            <p>
                                Are you sure you want to remove{" "}
                                <strong>
                                    {items[removeIndex].title}
                                </strong>
                                {" "}from skills?
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