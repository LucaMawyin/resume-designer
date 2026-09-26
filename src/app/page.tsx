"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useNotifications } from "@/components/NotificationProvider";

export default function Home(){

    const router = useRouter();
    const [savedResume, setSavedResume] = useState<string | null>(null);
    const [showNewResumeConfirm, setShowNewResumeConfirm] = useState(false);
    const { notify } = useNotifications();

    useEffect(() => {
        const saved = localStorage.getItem("resume-form");

        if (saved) {
            const resume = JSON.parse(saved);

            if (resume.name?.trim()) {
                notify(`Welcome back ${resume.name}`.trim());
            }
        }

        setSavedResume(saved);
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
                            target="__blank"
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
                <ConfirmationModal
                    title="Start a new resume?"
                    message={
                        <>
                            <p>
                                You already have a saved resume.
                            </p>
                            <p>
                                Starting a new one will delete it.
                            </p>
                        </>
                    }
                    confirmText="New Resume"
                    onConfirm={confirmNewResume}
                    onCancel={() => setShowNewResumeConfirm(false)}
                />
            )}

        </div>
    );
}