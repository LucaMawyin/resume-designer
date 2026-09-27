"use client";

import { ResumeLinkProps } from "@/lib/types";
import Button from "./Button";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function ResumeLink({
    items,
    onChange,
    onAdd,
    onRemove,
}: ResumeLinkProps) {
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
                        <label htmlFor={`name-${index}`}>Website Name</label>
                        <input
                            type="text"
                            id={`name-${index}`}
                            name={`name-${index}`}
                            value={item.title}
                            placeholder="GitHub, LinkedIn, etc..."
                            onChange={(e) => 
                                onChange(
                                    index,
                                    "title",
                                    e.target.value
                                )
                            }
                        />

                        <label htmlFor={`href-${index}`}>Website URL</label>
                        <input
                            type="text"
                            id={`href-${index}`}
                            name={`href-${index}`}
                            value={item.href}
                            placeholder="Enter URL"
                            onChange={(e) => 
                                onChange(
                                    index,
                                    "href",
                                    e.target.value
                                )
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
                    title="Remove From Links?"
                    message={
                        <>
                            <p>
                                Are you sure you want to remove{" "}
                                <strong>
                                    {items[removeIndex].title}
                                </strong>
                                {" "}from links?
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