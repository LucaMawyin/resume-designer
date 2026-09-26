"use client";

import { ResumeItemProp } from "@/lib/types";
import Button from "./Button";

export default function ResumeItem({
    title,
    items,
    onChange,
    onAdd,
    onRemove,
} : ResumeItemProp ){

    return (
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
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={item.title}
                        onChange={(e) => onChange(index, "title", e.target.value)}
                        placeholder={`Enter ${title} name`}
                    />

                    <label htmlFor={`subtitle-${index}`}>Subtitle</label>
                    <input
                        type="text"
                        id={`subtitle-${index}`}
                        name={`subtitle-${index}`}
                        value={item.subtitle}
                        onChange={(e) => onChange(index, "subtitle", e.target.value)}
                        placeholder="Institution, Role, etc..."
                    />

                    <label htmlFor={`dateStart-${index}`}>Start Date</label>
                    <input
                        type="text"
                        id={`dateStart-${index}`}
                        name={`dateStart-${index}`}
                        value={item.dateStart}
                        onChange={(e) => onChange(index, "dateStart", e.target.value)}
                        placeholder="Enter start date"
                    />

                    <label htmlFor={`dateEnd-${index}`}>
                        {title === "Projects" ? "URL" : "End Date"}
                    </label>

                    <input
                        type={title === "Projects" ? "url" : "text"}
                        id={`dateEnd-${index}`}
                        name={`dateEnd-${index}`}
                        value={item.dateEnd}
                        onChange={(e) =>
                            onChange(index, "dateEnd", e.target.value)
                        }
                        placeholder={
                            title === "Projects"
                                ? "https://github.com/..."
                                : "Enter end date"
                        }
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