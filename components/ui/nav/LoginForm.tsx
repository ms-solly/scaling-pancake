"use client";
import react from "react";
import { Button } from "../button";
import { SiGithub } from "react-icons/si";
import { createBrowserClient } from "@supabase/ssr";
import { usePathname } from "next/navigation";

export default function LoginForm() {
    const pathname = usePathname();
    const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);


	const handleLogin = () => {
		supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: process.env.PROD_URL + "auth/callback?next=" + pathname,
			},
		});
	};

	return (
		<Button
			className="flex items-center gap-2"
			variant="outline"
			onClick={handleLogin}
		>
			<SiGithub /> Login
		</Button>
	);
}
