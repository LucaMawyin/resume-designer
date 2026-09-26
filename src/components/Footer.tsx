export default function Footer() {
    return (
        <footer className="
            border-t
            border-gray-200
            relative
            bottom-0
        ">
            <div className="
                flex
                flex-col
                items-center
                justify-between
                gap-4
                px-6
                py-6
                text-sm
                sm:flex-row
                text-gray-500
            ">
                <p>
                    &copy; {new Date().getFullYear()} Resumely by{" "}
                    <a
                        href="https://lucamawyin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-800"
                    >
                        Luca Mawyin
                    </a>
                </p>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/LucaMawyin/resume-designer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-800"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://lucamawyin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-800"
                    >
                        Luca Mawyin
                    </a>
                </div>
            </div>
        </footer>
    );
}
