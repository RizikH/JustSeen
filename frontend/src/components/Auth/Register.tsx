// components/Auth/Login.tsx
'use client';

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, username, password }),
        });

        if (res.ok) {
            setStatus("✅ Registration successful!");
            window.location.href = redirect;
        } else {
            setStatus("❌ Failed to Register.");
        }
    };

    return (
        <div className="min-h-(--page-height) w-screen flex items-center justify-center bg-black text-white">
            <Card className="p-0 w-1/4 shadow-none border-none bg-transparent">
                <MagicCard gradientColor="#262626" className="p-0 dark bg-[#111] rounded-xl">
                    <CardHeader className="border-b border-[#2a2a2a] p-4 pb-2">
                        <CardTitle className="text-white">Login</CardTitle>
                        <CardDescription className="text-gray-400">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleRegister}>
                        <CardContent className="p-4">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-[#1a1a1a] text-white border-[#333]"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="text" className="text-gray-300">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-[#1a1a1a] text-white border-[#333]"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-[#1a1a1a] text-white border-[#333]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t border-[#2a2a2a] pt-4">
                            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 transition">
                                Register
                            </Button>
                        </CardFooter>
                    </form>
                    {status && (
                        <p className="text-center text-sm text-gray-400 mt-2 pb-4">
                            {status}
                        </p>
                    )}
                </MagicCard>
            </Card>
        </div>
    );
};

export default LoginForm;
