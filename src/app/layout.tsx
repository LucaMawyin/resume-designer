import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { NotificationProvider } from "@/components/NotificationProvider";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: "Resumely",
    description: "A website to produce LaTex-based resumes",
    icons: {
            icon: [
            {
                url: "/favicon.svg",
                type: "image/svg+xml",
            },
        ],
    },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${inter.className} flex min-h-screen flex-col`}>
                <main className="
                    relative 
                    flex
                    flex-col
                    flex-1
                ">
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>       
                    <Footer/>             
                </main>
            </body>
		</html>
	);
}
