"use client";

import Button from "@/components/Button";
import ResumeItem from "@/components/ResumeItem";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
    CustomSection,
    ResumeItem as ResumeItemData,
} from "@/lib/types";
import { useState } from "react";

type CustomSectionsProps = {
    items: CustomSection[];
    onSectionChange: (
        sectionIndex: number,
        value: string
    ) => void;
    onSectionAdd: () => void;
    onSectionRemove: (sectionIndex: number) => void;
    onItemChange: (
        sectionIndex: number,
        itemIndex: number,
        key: keyof ResumeItemData,
        value: string
    ) => void;
    onItemAdd: (sectionIndex: number) => void;
    onItemRemove: (
        sectionIndex: number,
        itemIndex: number
    ) => void;
};

export default function CustomSections({
    items,
    onSectionChange,
    onSectionAdd,
    onSectionRemove,
    onItemChange,
    onItemAdd,
    onItemRemove,
}: CustomSectionsProps) {

    const [removeSectionIndex, setRemoveSectionIndex] =
        useState<number | null>(null);

    const handleRemoveSection = () => {
        if (removeSectionIndex === null) return;

        onSectionRemove(removeSectionIndex);
        setRemoveSectionIndex(null);
    };

    return (
        <>
            <div className="flex flex-col gap-8">

                {items.map((section, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col">
                            <label>Section Name (required)</label>
                            <input
                                type="text"
                                value={section.title}
                                placeholder="Section title"
                                onChange={e =>
                                    onSectionChange(
                                        sectionIndex,
                                        e.target.value
                                    )
                                }
                            />

                            <ResumeItem
                                title={section.title}
                                items={section.items}
                                isCustom
                                onChange={(itemIndex, key, value) =>
                                    onItemChange(
                                        sectionIndex,
                                        itemIndex,
                                        key,
                                        value
                                    )
                                }
                                onAdd={() => onItemAdd(sectionIndex)}
                                onRemove={itemIndex =>
                                    onItemRemove(
                                        sectionIndex,
                                        itemIndex
                                    )
                                }
                            />                        
                        </div>


                        {items.length > 1 && (
                            <Button
                                text="Remove Section"
                                variant="red"
                                type="button"
                                className="mt-4"
                                x={0}
                                y={2}
                                onClick={() =>
                                    setRemoveSectionIndex(sectionIndex)
                                }
                            />
                        )}
                    </div>
                ))}

                <Button
                    text={`Add Another Section`}
                    variant="secondary"
                    x={0}
                    y={2}
                    type="button"
                    onClick={onSectionAdd}
                />

            </div>

            {removeSectionIndex !== null && (
                <ConfirmationModal
                    title="Remove Section?"
                    message={
                        <>
                            <p>
                                Are you sure you want to remove{" "}
                                <strong>
                                    {items[removeSectionIndex].title ||
                                        "this section"}
                                </strong>
                                ?
                            </p>
                            <p>
                                This will also remove all items in this
                                section.
                            </p>
                            <p>
                                This cannot be undone.
                            </p>
                        </>
                    }
                    confirmText="Remove"
                    onConfirm={handleRemoveSection}
                    onCancel={() => setRemoveSectionIndex(null)}
                />
            )}
        </>
    );
}