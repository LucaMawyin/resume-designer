type HeaderProps = {
    showStepTitle: boolean;
};

export default function Header({ showStepTitle }: HeaderProps) {
    return (
        <header
            className={`
                flex
                items-center
                justify-center
                sticky
                top-0
                z-100
                bg-(--bg)
                h-[10dvh]
                border-b
                transition-colors
                duration-(--transition-duration)
                ${
                    showStepTitle
                        ? "border-transparent"
                        : "border-gray-300"
                }
            `}
        >
            <h1 className="text-center leading-tight">
                <a
                    href="/"
                    className="
                        inline-block
                        transition-transform
                        duration-200
                        hover:scale-105
                    "
                >
                    Resumely
                </a>
            </h1>
        </header>
    );
}