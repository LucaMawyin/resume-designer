"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useNotifications } from "@/components/NotificationProvider";
import UploadJson from "@/components/UploadJson";

export default function Home(){

    const router = useRouter();
    const [savedResume, setSavedResume] = useState<string | null>(null);
    const [showNewResumeConfirm, setShowNewResumeConfirm] = useState(false);
    const [showUploadJson, setShowUploadJson ] = useState(false);
    const [pendingUpload, setPendingUpload] = useState<{
        data: unknown;
        file: File;
    } | null>(null);

    const [showUploadConfirm, setShowUploadConfirm] = useState(false);

    const { notify } = useNotifications();

    const welcomeShown = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("resume-form");

        if (saved) {
            const resume = JSON.parse(saved);

            if (resume.name?.trim() && !welcomeShown.current) {
                welcomeShown.current = true;
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
        
        notify("New resume started");
        router.push("/build");
    };

    const confirmNewResume = () => {
        localStorage.removeItem("resume-form");
        notify("New resume started");
        router.push("/build");
    };

    const handleUpload = (data: unknown, file: File) => {
        const existingResume = localStorage.getItem("resume-form");

        if (existingResume && existingResume.length > 0) {
            setPendingUpload({
                data,
                file,
            });

            setShowUploadConfirm(true);
            setShowUploadJson(false);

            return;
        }

        saveUploadedResume(data, file);
    };

    const saveUploadedResume = (data: unknown, file: File) => {
        try {
            const json = JSON.stringify(data);

            localStorage.setItem("resume-form", json);
            setSavedResume(json);

            notify(`${file.name} uploaded successfully`, "success");

            router.push("/build");
        } catch {
            notify("Unable to save the uploaded resume", "error");
        }
    };

    const confirmUpload = () => {
        if (!pendingUpload) {
            return;
        }

        saveUploadedResume(
            pendingUpload.data,
            pendingUpload.file
        );

        setPendingUpload(null);
        setShowUploadConfirm(false);
    };

    const cancelUpload = () => {
        setPendingUpload(null);
        setShowUploadConfirm(false);
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
                        text="Continue Resume"
                        onClick={() => {router.push("/build?saved=true")}}
                        x={0}
                        y={2}
                    />
                )}
                <Button
                    text="New Resume"
                    variant="secondary"
                    x={0}
                    y={2}
                    onClick={handleNewResume}
                />

                <Button
                    text="Upload Source File"
                    variant="secondary"
                    x={0}
                    y={2}
                    onClick={() => setShowUploadJson(true)}
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
                            <strong>
                                Starting a new one will delete it.
                            </strong>
                        </>
                    }
                    confirmText="New Resume"
                    onConfirm={confirmNewResume}
                    onCancel={() => setShowNewResumeConfirm(false)}
                />
            )}

            {showUploadConfirm && (
                <ConfirmationModal
                    title="Replace saved resume?"
                    message={
                        <>
                            <p>
                                You already have a saved resume.
                            </p>

                            <strong>
                                Uploading this source file will replace it.
                            </strong>
                        </>
                    }
                    confirmText="Replace Resume"
                    onConfirm={confirmUpload}
                    onCancel={cancelUpload}
                />
            )}

            {showUploadJson && (
                <UploadJson
                    isOpen={showUploadJson}
                    onClose={() => setShowUploadJson(false)}
                    onUpload={handleUpload}
                />
            )}

        </div>
    );
}