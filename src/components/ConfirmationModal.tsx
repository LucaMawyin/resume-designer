import { ReactNode } from "react";
import Button from "./Button";

type ConfirmationModalProps = {
    title: string;
    message: ReactNode;
    confirmText?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmationModal({
    title,
    message,
    confirmText = "Confirm",
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {
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
            onClick={onCancel}
        >
            <div 
                className="
                    w-full
                    max-w-sm
                    p-6
                    pillow
                    squircle
                "
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{title}</h2>

                <div className="flex flex-col gap-2 mt-2 text-sm text-gray-500">
                    {message}
                </div>

                <div className="
                    mt-6
                    flex
                    justify-between
                    gap-3
                ">
                    <Button
                        text="Cancel"
                        variant="tertiary"
                        type="button"
                        x={4}
                        y={2}
                        onClick={onCancel}
                    />

                    <Button
                        text={confirmText}
                        type="button"
                        variant="red"
                        x={4}
                        y={2}
                        onClick={onConfirm}
                    />
                </div>

            </div>
        </div>
    );
}
