"use client";


import React from "react";
import {Button} from "@/components/ui/button";
import {  SiGithub } from "react-icons/si";
import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";
import Profile  from "@/components/ui/nav/profile"; 

export default function Navbar(){
	const user = useUser((state) => state.user);
	console.log(user);
	return (
	<nav className="flex items-center justify-between">
		<div className=" group">
           <link href="/" className="text-2xl font-bold" />
		      EsportWs
		   
		   <div className=" h-1 w-0 group-hover:w-full transition-all bg-green-500"></div>
		</div>
		{user?.id ? <Profile/> : <LoginForm />}
	</nav>
);
}