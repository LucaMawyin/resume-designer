import { ResumeSkillProps } from "@/lib/types";
import Button from "./Button";

export default function ResumeSkill({
    items,
    onChange,
    onAdd,
    onRemove,
}: ResumeSkillProps) {
    return (
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
                            onClick={() => onRemove(index)}
                        />                        
                    )}

                </div>
            ))}
            <Button
                text="Add"
                type="button"
                variant="secondary"
                x={8}
                y={2}
                onClick={onAdd}
            />

        </div>
    );
}