"use client";
// import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect } from "react";
import { useUser } from "../../lib/store/user";

export default function SessionProvider() {
	const setUser = useUser((state) => state.setUser);

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	

	const readUserSession = async () => {
		const { data } = await supabase.auth.getSession();
		setUser(data.session?.user);

		// if (userSesssion.session) {
		// 	const { data } = await supabase
		// 		.from("users")
		// 		.select("*")
		// 		.eq("id", userSesssion.session?.user.id)
		// 		.single();
		// 	setUser(data);
		// }
	};

    useEffect(() => {
        readUserSession();
        // eslint-disable-next-line
    },[])

	return <></>;
}