import Footer from "@/components/Footer";
import "../globals.css";
import { Inter } from "next/font/google";
import { NotificationProvider } from "@/components/NotificationProvider";
import BuildShell from "@/components/BuildShell";

const inter = Inter({
    subsets: ["latin"],
});

export default function BuildLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`
            ${inter.className}
            flex
            flex-col
            w-full
        `}>
            <BuildShell>
                {children}
            </BuildShell>
        </div>
    );
}