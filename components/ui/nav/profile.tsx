import React from "react";
import Image from "next/image";
import { useUser } from "@/lib/store/user";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function Profile() {
    const user = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(undefined);
    };

    const isAdmin = user?.user_metadata?.role === "admin";

    return (
        <Popover>
            <PopoverTrigger>
                {user?.user_metadata?.avatar_url ? (
                    <Image
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.user_name || "User Avatar"}
                        width={50}
                        height={50}
                        className="rounded-full ring-2 ring-green-500"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full ring-2 ring-green-500 bg-gray-300"></div>
                )}
            </PopoverTrigger>
            <PopoverContent className="p-2 space-y-3 divide-y">
                <div className="px-4 text-sm">
                    <p>{user?.user_metadata?.user_name}</p>
                    <p className="text-gray-500">{user?.user_metadata?.email}</p>
                </div>
                {isAdmin && (
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full flex items-center justify-between">
                            Dashboard
                            <DashboardIcon />
                        </Button>
                    </Link>
                )}
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between"
                    onClick={handleLogout}
                >
                    Log Out
                    <LockOpen1Icon />
                </Button>
            </PopoverContent>
        </Popover>
    );
}
