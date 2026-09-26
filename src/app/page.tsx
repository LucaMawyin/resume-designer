"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(){

    const router = useRouter();
    const [savedResume, setSavedResume] = useState<string | null>(null);
    const [showNewResumeConfirm, setShowNewResumeConfirm] = useState(false);

    useEffect(() => {
        setSavedResume(localStorage.getItem("resume-form"));
    }, []);

    const handleNewResume = () => {
        if (savedResume && savedResume.length > 0) {
            setShowNewResumeConfirm(true);
            return;
        }

        router.push("/build");
    };

    const confirmNewResume = () => {
        localStorage.removeItem("resume-form");
        router.push("/build");
    };

    
    return (
        <div className="
            flex
            flex-col
            w-full
            justify-center
            items-center
        ">
            <div className="
                flex
                flex-col
                p-12
                squircle
                pillow
                bg-white
                gap-8
            ">
                <div>
                    <h1>Resumely</h1>
                    <p className="text-sm text-gray-400">
                        By{" "}
                        <a 
                            className="hover:text-gray-800"
                            href="https://lucamawyin.com"
                        >   
                            Luca Mawyin
                        </a>                            
                    </p>
                
                </div>

                {savedResume && savedResume.length > 0 && (
                    <Button
                        text="Load Resume"
                        onClick={() => {router.push("/build?saved=true")}}
                        x={0}
                        y={2}
                    />
                )}
                <Button
                    text="New Resume"
                    className="bg-blue-400 hover:bg-blue-600"
                    x={0}
                    y={2}
                    onClick={handleNewResume}
                />
            </div>

            {showNewResumeConfirm && (
                <div 
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        p-4
                    "
                    onClick={() => setShowNewResumeConfirm(false)}
                >
                    <div 
                        className="
                            flex
                            w-full
                            max-w-sm
                            flex-col
                            gap-6
                            bg-white
                            p-8
                            shadow-xl
                            squircle
                        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-2">
                            <h2>Start a new resume?</h2>

                            <p className="text-sm text-gray-500">
                                You already have a saved resume.
                                
                            </p>
                            <p className="text-sm text-gray-500">
                                Starting a new one will delete it.
                            </p>
                        </div>

                        <div className="
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
                                onClick={() =>
                                    setShowNewResumeConfirm(false)
                                }
                            />

                            <Button
                                text="New Resume"
                                type="button"
                                variant="red"
                                x={4}
                                y={2}
                                onClick={confirmNewResume}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}