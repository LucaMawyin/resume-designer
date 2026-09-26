"use client";

export default function Button(props : {
    text : string; 
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "tertiary" | "red" | "transparent";
    children?:React.ReactNode;
    className?:string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    name?:string;
    value?:string;
    form?: string;
    x:number;
    y:number;
}){

    // Handle click event
    function clickEvent(e: React.MouseEvent<HTMLButtonElement>) {
        props.onClick?.(e);
    }

    // Base button style
    const base = `
        h-fit 
        rounded-lg 
        whitespace-nowrap
        transition 
        duration-(--transition-duration) 
        cursor-pointer
    `;

    // Variant styles
    const styles = {
        primary:
            `bg-(--primary-colour) text-white ${props.disabled ? "" : "hover:bg-(--primary-dark) hover:shadow-xl"}`,
        secondary: 
            `bg-blue-400 text-white ${props.disabled ? "" : "hover:bg-blue-600 hover:shadow-md"}`,
        tertiary:
            `bg-gray-200 border border-gray-300 text-black ${props.disabled ? "" : "hover:bg-gray-300 hover:border-gray-400 hover:shadow-md"}`,
        red : 
            `bg-red-600 text-white ${props.disabled ? "" : "hover:bg-red-700 hover:shadow-md"}`,
        transparent:
            "bg-transparent text-black",
    };

    // Add disabled styles if the button is disabled
    const disabledStyle = props.disabled
        ? "opacity-50 cursor-default!"
        : "";

    return(
        <button 
            style={{
                paddingTop: `${props.y * 0.25}rem`,
                paddingBottom: `${props.y * 0.25}rem`,
                paddingLeft: `${props.x * 0.25}rem`,
                paddingRight: `${props.x * 0.25}rem`,
            }}
            type={props.type ?? "button"}
            onClick={clickEvent} 
            disabled={props.disabled}
            className={`${base} ${styles[props.variant ?? "primary"]} ${props.className ?? ""} ${disabledStyle}`}
            name={props.name}
            value={props.value}
            form={props.form}
        >
                
            {props.text}
            {props.children}
        </button>
    )
}