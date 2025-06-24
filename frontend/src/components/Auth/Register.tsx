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
import { useAuthStore } from "@/components/stores/AuthStore/useAuthStore";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();

  const fetchUser = useAuthStore((state) => state.fetchUser);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setStatus("❌ Username must contain only letters and numbers (no spaces or special characters).");
      setIsSubmitting(false);
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, username, password }),
    });

    if (res.ok) {
      try {
        await fetchUser();
        setStatus("✅ Registered successfully! Redirecting...");
        router.push(redirect);
      } catch (err) {
        console.error("Failed to fetch user after registration:");
        setStatus("✅ Registered, but failed to sync auth state.");
        setIsSubmitting(false);
      }
    } else {
      setStatus("❌ Failed to register.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-(--page-height) w-screen flex items-center justify-center bg-black text-white">
      <Card className="p-0 w-full md:w-1/2 lg:w-1/3 shadow-none border-none bg-transparent px-8 md:px-0">
        <MagicCard gradientColor="#262626" className="p-0 dark bg-[#111] rounded-xl">
          <CardHeader className="border-b border-[#2a2a2a] p-4 pb-2">
            <CardTitle className="text-white">Register</CardTitle>
            <CardDescription className="text-gray-400">
              Create a new account to get started
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
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username" className="text-gray-300">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="JohnDoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-[#1a1a1a] text-white border-[#333]"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                    className="bg-[#1a1a1a] text-white border-[#333]"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t border-[#2a2a2a] pt-4">
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 transition"
                disabled={isSubmitting || !email || !username || !password}
              >
                {isSubmitting ? "Registering..." : "Register"}
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

export default RegisterForm;
