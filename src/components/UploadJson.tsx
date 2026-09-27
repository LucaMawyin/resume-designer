"use client";

import { useRef, useState } from "react";
import { useNotifications } from "./NotificationProvider";
import Button from "./Button";

type UploadJsonProps = {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (data: unknown, file: File) => void;
};

export default function UploadJson({
    isOpen,
    onClose,
    onUpload,
}: UploadJsonProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const { notify } = useNotifications();

    if (!isOpen) {
        return null;
    }

    const processFile = (file: File) => {

        if (!file.name.toLowerCase().endsWith(".json")) {
            notify("Please select a JSON file.", "error");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string);
                onUpload(data, file);
            } catch {
                notify("The file contains invalid JSON.", "error");
            }
        };

        reader.onerror = () => {
            notify("Unable to read the file.", "error");
        };

        reader.readAsText(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];

        if (file) {
            processFile(file);
        }
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            processFile(file);
        }

        // Allows selecting the same file again.
        event.target.value = "";
    };

    return (
        <div
            className="
                fixed 
                inset-0 
                z-50 
                flex 
                items-center 
                justify-center 
                bg-black/50 
                p-4
            "
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="
                flex
                flex-col
                w-fit 
                pillow 
                squircle
                p-10
                gap-6
            ">

                <h2 className="text-xl font-semibold">
                    Upload JSON
                </h2>


                <input
                    ref={inputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div
                    onDragEnter={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={(event) => {
                        event.preventDefault();
                        setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`
                        flex 
                        flex-col
                        cursor-pointer 
                        items-center 
                        justify-center 
                        rounded-lg 
                        border-2
                        border-dashed 
                        p-8 
                        text-center 
                        transition
                        ${
                            isDragging
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-gray-400"
                        }
                    `}
                >
                    <div className="mb-3 text-4xl">📄</div>

                    <p className="font-medium">
                        Drop your JSON file here
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        or click to browse
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                        JSON files only
                    </p>
                </div>

                <div className="flex justify-end">
                    <Button
                        text="Cancel"
                        type="button"
                        variant="red"
                        x={4}
                        y={2}
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
}