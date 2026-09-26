export type FormState = {
    name: string;
    email: string;
    number: string;
    links: ResumeLink[];
    education: ResumeItem[];
    experience: ResumeItem[];
    projects: ResumeItem[];
    skills: ResumeSkill[];
};

export type ResumeItem = {
    title: string;
    link?: string;
    subtitle: string;
    dateStart: string;
    dateEnd: string;
    content: string;
};

export type ResumeItemProp = {
    title: string;
    items: ResumeItem[];
    onChange: (
        index: number,
        key: keyof ResumeItem,
        value: string
    ) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export type ResumeSection = {
    id: string;
    title: string;
    type: "items";
    items: ResumeItem[];
};

export type PersonalInformation = {
    name: string;
    number: string;
    email: string;
};

export type PersonalInformationProps = {
    items: {
        name: string;
        number: string;
        email: string;
    };
    onChange: (
        key: "name" | "number" | "email",
        value: string
    ) => void;
};

export type ResumeLink = {
    title: string;
    href: string;
}

export type ResumeLinkProps = {
    items: ResumeLink[];
    onChange: (
        index: number,
        key: keyof ResumeLink,
        value: string
    ) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export type ResumeSkill = {
    title: string;
    content: string;
};

export type ResumeSkillProps = {
    items: ResumeSkill[];
    onChange: (
        index: number,
        key: keyof ResumeSkill,
        value: string
    ) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
};

export type SectionKey = 
    "links" 
    | "education" 
    | "experience" 
    | "projects" 
    | "skills";
