"use client";

import Button from "@/components/Button";
import { useNotifications } from "@/components/NotificationProvider";
import PersonalInformation from "@/components/PersonalInformation";
import ResumeItem from "@/components/ResumeItem";
import ResumeLink from "@/components/ResumeLinks";
import ResumeReview from "@/components/ResumeReview";
import ResumeSkill from "@/components/ResumeSkills";
import {
    ResumeItem as ResumeItemData,
    ResumeLink as ResumeLinkData,
    ResumeSkill as ResumeSkillData,
    FormState,
    SectionKey,
} from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const emptySectionItem: {
    [K in SectionKey]: FormState[K][number];
} = {
    links: {
        title: "",
        href: "",
    },
    education: {
        title: "",
        subtitle: "",
        dateStart: "",
        dateEnd: "",
        content: "",
    },
    experience: {
        title: "",
        subtitle: "",
        dateStart: "",
        dateEnd: "",
        content: "",
    },
    projects: {
        title: "",
        subtitle: "",
        dateStart: "",
        dateEnd: "",
        content: "",
    },
    skills: {
        title: "",
        content: "",
    },
};

const initialForm: FormState = {
    name: "",
    email: "",
    number: "",

    links: [
        {
            title: "",
            href: "",
        },
    ],

    education: [
        {
            title: "",
            subtitle: "",
            dateStart: "",
            dateEnd: "",
            content: "",
        },
    ],

    experience: [
        {
            title: "",
            subtitle: "",
            dateStart: "",
            dateEnd: "",
            content: "",
        },
    ],

    projects: [
        {
            title: "",
            subtitle: "",
            dateStart: "",
            dateEnd: "",
            content: "",
        },
    ],

    skills: [
        {
            title: "",
            content: "",
        },
    ],
};

export default function Build(){

    const formRef = useRef<HTMLFormElement>(null);
    const { notify } = useNotifications();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [ step, setStep ] = useState(0);
    const [form, setForm] = useState<FormState>(initialForm);
    const [skippedSections, setSkippedSections] = useState<
        Record<SectionKey, boolean>
    >({
        links: false,
        education: false,
        experience: false,
        projects: false,
        skills: false,
    });

    const [loaded, setLoaded] = useState(false);

    const isItemFilled = (item: object) => {
        return Object.values(item).some(
            value =>
                typeof value === "string" &&
                value.trim() !== ""
        );
    };

    const ensureSectionItems = <K extends SectionKey>(
        section: K,
        items: FormState[K]
    ): FormState[K] => {
        if (items.length > 0) {
            return items;
        }

        return [{ ...emptySectionItem[section] }] as FormState[K];
    };

    useEffect(() => {
        const saved = localStorage.getItem("resume-form");

        if (saved) {
            const parsed = JSON.parse(saved);

            const isSavedResume =
                searchParams.get("saved") === "true";

                const loadedForm: FormState = {
                    ...initialForm,
                    ...parsed,

                    links: ensureSectionItems(
                        "links",
                        isSavedResume
                            ? (parsed.links ?? []).filter(isItemFilled)
                            : parsed.links ?? initialForm.links
                    ),

                    education: ensureSectionItems(
                        "education",
                        isSavedResume
                            ? (parsed.education ?? []).filter(isItemFilled)
                            : parsed.education ?? initialForm.education
                    ),

                    experience: ensureSectionItems(
                        "experience",
                        isSavedResume
                            ? (parsed.experience ?? []).filter(isItemFilled)
                            : parsed.experience ?? initialForm.experience
                    ),

                    projects: ensureSectionItems(
                        "projects",
                        isSavedResume
                            ? (parsed.projects ?? []).filter(isItemFilled)
                            : parsed.projects ?? initialForm.projects
                    ),

                    skills: ensureSectionItems(
                        "skills",
                        isSavedResume
                            ? (parsed.skills ?? []).filter(isItemFilled)
                            : parsed.skills ?? initialForm.skills
                    ),
                };

            setForm(loadedForm);
        }

        setLoaded(true);
    }, [searchParams]);

    useEffect(() => {
        if (!loaded) {
            return;
        }

        localStorage.setItem(
            "resume-form",
            JSON.stringify(form)
        );
    }, [form, loaded]);

    useEffect(() => {
        if (!loaded) {
            return;
        }

        if (searchParams.get("saved") !== "true") {
            return;
        }

        const nameValid = form.name.trim() !== "";
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
        const numberValid = form.number.trim() !== "";

        if (nameValid && emailValid && numberValid) {
            notify("Successfully loaded saved resume","success");
            setStep(6);
        }
        
    }, [loaded, searchParams, form.name, form.email, form.number]);

    const [showStepTitle, setShowStepTitle] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStepTitle(window.scrollY >= window.innerHeight * 0.1);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // -------------------------
    // Personal Information
    // -------------------------

    const updatePersonalInformation = (
        key : "name" | "email" | "number",
        value: string,
    ) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    }

    // -------------------------
    // Generic Resume Items
    // -------------------------

    const handleSectionChange = (
        section: "education" | "experience" | "projects",
        index: number,
        key: keyof ResumeItemData,
        value: string,
    ) => {
        setForm(prev => {
            const updated = [...prev[section]];

            updated[index] = {
                ...updated[index],
                [key]: value,
            };

            return {
                ...prev,
                [section]: updated,
            };
        });
    };

    const handleSectionAdd = (section: SectionKey) => {
        setForm(prev => ({
            ...prev,
            [section]: [
                ...prev[section],
                emptySectionItem[section],
            ],
        }));
    };

    const handleSectionRemove = (
        section: SectionKey,
        index: number,
    ) => {
        setForm(prev => ({
            ...prev,
            [section]: prev[section].filter(
                (_, itemIndex) => itemIndex !== index
            ),
        }));
    };

    // -------------------------
    // Links
    // -------------------------

    const handleLinkChange = (
        index: number,
        key: keyof ResumeLinkData,
        value: string,
    ) => {
        setForm(prev => {
            const updated = [...prev.links];

            updated[index] = {
                ...updated[index],
                [key]: value,
            };

            return {
                ...prev,
                links: updated,
            };
        });
    };

    // -------------------------
    // Skills
    // -------------------------

    const handleSkillChange = (
        index: number,
        key: keyof ResumeSkillData,
        value: string,
    ) => {
        setForm(prev => {
            const updated = [...prev.skills];

            updated[index] = {
                ...updated[index],
                [key]: value,
            };

            return {
                ...prev,
                skills: updated,
            };
        });
    };

    // -------------------------
    // Submit Form
    // -------------------------

    const getSubmittedForm = () => {
        return {
            name: form.name,
            email: form.email,
            number: form.number,

            ...(skippedSections.links
                ? {}
                : { links: form.links.filter(isItemFilled) }),

            ...(skippedSections.education
                ? {}
                : { education: form.education.filter(isItemFilled) }),

            ...(skippedSections.experience
                ? {}
                : { experience: form.experience.filter(isItemFilled) }),

            ...(skippedSections.projects
                ? {}
                : { projects: form.projects.filter(isItemFilled) }),

            ...(skippedSections.skills
                ? {}
                : { skills: form.skills.filter(isItemFilled) }),
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        notify("Download request started");

        try {
            const submittedForm = getSubmittedForm();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/route`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(submittedForm),
                }
            );

            if (!res.ok) {
                notify("Failed to generate resume", "error");
                return;
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "resume.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);

            notify("Successfully downloaded resume", "success");
        } catch (error) {
            console.error(error);
            notify("Failed to generate resume", "error");
        }
    };

    const getSourceForm = (): FormState => {
        return {
            name: form.name,
            email: form.email,
            number: form.number,

            links: form.links.filter(isItemFilled),
            education: form.education.filter(isItemFilled),
            experience: form.experience.filter(isItemFilled),
            projects: form.projects.filter(isItemFilled),
            skills: form.skills.filter(isItemFilled),
        };
    };

    const handleDownloadSource = () => {
        try {
            const sourceForm = getSourceForm();
            const json = JSON.stringify(sourceForm, null, 4);

            const blob = new Blob([json], {
                type: "application/json",
            });

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "resume.json";

            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);

            notify("Successfully downloaded source file", "success");
        } catch (error) {
            console.error(error);
            notify("Failed to download source file", "error");
        }
    };

    // -------------------------
    // Check form completion
    // -------------------------

    const isFilled = (value: unknown): boolean => {
        if (typeof value === "string") {
            return value.trim() !== "";
        }

        if (Array.isArray(value)) {
            return value.every(isFilled);
        }

        if (typeof value === "object" && value !== null) {
            return Object.values(value).every(isFilled);
        }

        return true;
    };

    const isStepValid = (stepIndex: number) => {
        const currentStep = steps[stepIndex];
        if (!currentStep) return false;

        if (currentStep.key === "projects") {
            return form.projects.every(item =>
                isFilled({
                    ...item,
                    dateEnd: true,
                })
            );
        }

        return isFilled(currentStep.data);
    };

    const canNavigateToStep = (targetStep: number) => {
        // Going backward is always allowed
        if (targetStep <= step) {
            return true;
        }

        // Every step between the current step and target must be valid
        for (let i = step; i < targetStep; i++) {
            const key = steps[i].key;

            // Review doesn't need validation
            if (!key && i === steps.length - 1) {
                continue;
            }

            if (!isStepValid(i)) {
                return false;
            }
        }

        return true;
    };

    const isCurrentStepValid = () => {
        return isStepValid(step);
    };

    const getNavigationBlocker = (targetStep: number) => {
        // Going backward is always allowed
        if (targetStep <= step) {
            return null;
        }

        // Find the first incomplete step between current and target
        for (let i = step; i < targetStep; i++) {
            if (!isStepValid(i)) {
                return i;
            }
        }

        return null;
    };

    // -------------------------
    // Section changing
    // -------------------------

    const ensureSectionItem = (stepIndex: number) => {
        const key = steps[stepIndex]?.key;

        if (!key) {
            return;
        }

        setForm(prev => {
            if (prev[key].length > 0) {
                return prev;
            }

            return {
                ...prev,
                [key]: [{ ...emptySectionItem[key] }],
            };
        });
    };

    const handleNext = () => {
        if (!isCurrentStepValid()) {
            notify("Please fill in all fields", "error");
            return;
        }

        const key = steps[step].key;

        if (key) {
            setSkippedSections(prev => ({
                ...prev,
                [key]: false,
            }));
        }

        const nextStep = step + 1;

        ensureSectionItem(nextStep);
        notify(`Successfully added ${steps[step].title}`,"success")
        setStep(nextStep);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleReview = () => {
        if (!isCurrentStepValid()) {
            notify("Please fill in all fields", "error");
            return;
        }

        const key = steps[step].key;

        if (key) {
            setSkippedSections(prev => ({
                ...prev,
                [key]: false,
            }));
        }

        setStep(steps.length - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleSkip = () => {
        const key = steps[step].key;
        const nextStep = step + 1;

        if (key) {
            setSkippedSections(prev => ({
                ...prev,
                [key]: true,
            }));
        }

        ensureSectionItem(nextStep);
        notify(`Skipped ${steps[step].title} (not added)`,"warning");
        setStep(nextStep);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleBack = () => {
        if (step === 0) {
            router.push("/");
            return;
        }

        const previousStep = step - 1;

        ensureSectionItem(previousStep);
        setStep(previousStep);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const steps: {
        title: string;
        key: SectionKey | null;
        data?: unknown;
        component: React.ReactNode;
    }[] = [
        {
            title: "Personal Information",
            key: null,
            data: {
                name: form.name,
                email: form.email,
                number: form.number,
            },
            component : (
                <PersonalInformation
                    items={{
                        name: form.name,
                        email: form.email,
                        number: form.number,
                    }}
                    onChange={(key, value) => {
                        updatePersonalInformation(key, value);
                    }}
                />
            ),
        },
        {
            title: "Links",
            key: "links",
            data: form.links,
            component: (
                <ResumeLink
                    items={form.links}
                    onChange={handleLinkChange}
                    onAdd={() => handleSectionAdd("links")}
                    onRemove={(index) =>
                        handleSectionRemove(
                            "links",
                            index
                        )
                    }
                />
            ),
        },
        {
            title: "Education",
            key: "education",
            data: form.education,
            component: (
                <ResumeItem
                    title="Education"
                    items={form.education}
                    onChange={(index, key, value) =>
                        handleSectionChange(
                            "education",
                            index,
                            key,
                            value
                        )
                    }
                    onAdd={() =>
                        handleSectionAdd("education")
                    }
                    onRemove={(index) =>
                        handleSectionRemove(
                            "education",
                            index
                        )
                    }
                />
            ),
        },
        {
            title: "Experience",
            key: "experience",
            data: form.experience,
            component: (
                <ResumeItem
                    title="Experience"
                    items={form.experience}
                    onChange={(index, key, value) =>
                        handleSectionChange(
                            "experience",
                            index,
                            key,
                            value
                        )
                    }
                    onAdd={() =>
                        handleSectionAdd("experience")
                    }
                    onRemove={(index) =>
                        handleSectionRemove(
                            "experience",
                            index
                        )
                    }
                />
            ),
        },
        {
            title: "Projects",
            key: "projects",
            data:form.projects,
            component: (
                <ResumeItem
                    title="Projects"
                    items={form.projects}
                    onChange={(index, key, value) =>
                        handleSectionChange(
                            "projects",
                            index,
                            key,
                            value
                        )
                    }
                    onAdd={() =>
                        handleSectionAdd("projects")
                    }
                    onRemove={(index) =>
                        handleSectionRemove(
                            "projects",
                            index
                        )
                    }
                />
            ),
        },
        {
            title: "Technical Skills",
            key: "skills",
            data: form.skills,
            component: (
                <ResumeSkill
                    items={form.skills}
                    onChange={handleSkillChange}
                    onAdd={() => handleSectionAdd("skills")}
                    onRemove={(index) =>
                        handleSectionRemove(
                            "skills",
                            index
                        )
                    }
                />
            ),
        },
        {
            title: "Review",
            key: null,
            component: (
                <ResumeReview
                    form={getSubmittedForm()}
                    onEdit={setStep}
                />
            ),
        },
    ];

    return (
        <>
            <div className={`
                sticky 
                top-[10dvh] 
                z-50 
                w-full 
                bg-(--bg) 
                px-4 
                pb-3
                border-gray-300 
                border-b
                transition-opacity
                duration-(--transition-duration)
                ${showStepTitle ? "opacity-100" : "border-transparent pt-3"}
            `}>
                <div
                    className={`
                        mx-auto
                        w-full
                        max-w-2xl
                        text-center
                        text-sm
                        font-semibold
                        text-gray-600
                        overflow-hidden
                        transition-all
                        duration-(--transition-duration)
                        ease-in-out
                        ${
                            showStepTitle
                                ? "mb-3 max-h-8 opacity-100"
                                : "mb-0 max-h-0 opacity-0"
                        }
                    `}
                >
                    {steps[step].title}
                </div>

                <div className={`
                    relative 
                    mx-auto
                    flex 
                    w-full 
                    max-w-2xl 
                    items-center 
                    justify-between
                `}>
                    
                    {/* Progress line */}
                    <div className="
                        absolute 
                        left-0 
                        right-0 
                        top-1/2
                        h-1 
                        -translate-y-1/2 
                        bg-gray-300
                    ">
                        <div
                            className="
                                h-full 
                                bg-green-500 
                                transition-[width] 
                                duration-300 
                                ease-in-out
                            "
                            style={{
                                width: `${(step / (steps.length - 1)) * 100}%`,
                            }}
                        />
                    </div>

                    {/* Step bubbles */}
                    {steps.map((item, index) => {

                        const blocker = getNavigationBlocker(index);
                        const canNavigate = blocker === null;

                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => {
                                    if (blocker !== null) {
                                        // Only notify if the current step is the blocker
                                        if (blocker === step) {
                                            notify("Please fill in all fields", "error");
                                        }
                                        else {
                                            notify("You have not completed each step yet", "error");
                                        }

                                        return;
                                    }

                                    setStep(index);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                className={`
                                    relative
                                    z-10
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-sm
                                    font-semibold
                                    transition-all
                                    duration-300
                                    ${
                                        index <= step
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-300 text-gray-600"
                                    }
                                    ${
                                        canNavigate
                                            ? "cursor-pointer hover:scale-110"
                                            : "cursor-not-allowed opacity-60"
                                    }
                                `}
                                title={item.title}
                            >
                                {index + 1}
                            </button>
                        );
                    })}

                </div>
            </div>

            <div className="
                flex 
                flex-1
                w-full
                items-center
                justify-center
            ">
                <div className="
                    flex
                    w-full
                    max-w-2xl
                    flex-col
                    mb-8
                    mx-4
                    sm:mb-8
                    gap-8
                ">
                    <form
                        id="resume-form"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="
                            flex
                            flex-col
                            p-8
                            squircle
                            pillow
                            shadow-[0_0_20px_rgba(0,0,0,0.1)]
                            bg-white
                        "
                    >
                        <div className="
                            flex
                            flex-row
                            justify-between
                        ">
                            <h2 className="w-fit">{steps[step].title}</h2>
                            {steps[step].key && (
                                <Button
                                    text="skip"
                                    variant="transparent"
                                    x={0}
                                    y={0}
                                    className="text-gray-400 hover:text-gray-500 pt-4!"
                                    onClick={handleSkip}
                                />                        
                            )}

                        </div>
                        {steps[step].component}

                
                    </form>

                        <div className="
                            flex 
                            flex-wrap-reverse
                            gap-4
                            justify-between
                            px-8
                        ">

                            {step !== steps.length - 1 ? (
                                <>
                                    <Button
                                        text="Review"
                                        variant="secondary"
                                        type="button"
                                        className="block md:hidden w-full"
                                        x={8}
                                        y={2}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleReview();
                                        }}
                                    />

                                    <Button
                                        text={step === 0 ? "Home" : "Back"}
                                        variant="tertiary"
                                        type="button"
                                        x={8}
                                        y={2}
                                        onClick={handleBack}
                                        className={`${step !== steps.length - 1 ? "w-fit" : "w-full"} sm:w-fit`}
                                    />

                                    <Button
                                        text="Review"
                                        variant="secondary"
                                        type="button"
                                        className="hidden md:block"
                                        x={8}
                                        y={2}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleReview();
                                        }}
                                    />

                                    <Button
                                        text="Next"
                                        type="button"
                                        x={8}
                                        y={2}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNext();
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        text="I'm Not Done Yet"
                                        variant="tertiary"
                                        type="button"
                                        x={8}
                                        y={2}
                                        onClick={handleBack}
                                        className="w-full"
                                    />
                                    <Button
                                        text="Download Source File"
                                        type="button"
                                        variant="secondary"
                                        className="w-full sm:w-fit"
                                        x={4}
                                        y={2}
                                        onClick={handleDownloadSource}
                                    />
                                    <Button
                                        text="Download Resume"
                                        variant="primary"
                                        type="submit"
                                        form="resume-form"
                                        x={8}
                                        y={2}
                                        className="w-full sm:w-fit"
                                    />


                                </>
                            )}


                        </div>
                </div>


            </div>        
        </>

    );

}