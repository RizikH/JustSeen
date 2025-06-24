'use client';

import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";
import Link from "next/link";
import { useAuthStore } from "@/components/stores/AuthStore/useAuthStore";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const fetchUser = useAuthStore(state => state.fetchUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      try {
        await fetchUser();
        router.push(redirect);
      } catch (err) {
        console.error("Failed to fetch user after login:");
        setStatus("❌ Login succeeded, but failed to fetch user.");
        setIsSubmitting(false);
      }

    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setStatus("❌ Invalid credentials. Please try again.");
      } else {
        console.error("Login request failed:", err);
        setStatus("❌ Login failed due to server error.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-(--page-height) w-screen flex items-center justify-center bg-black text-white">
      <Card className="p-0 w-full md:w-1/2 lg:w-1/3 shadow-none border-none bg-transparent px-8 md:px-0">
        <MagicCard gradientColor="#262626" className="p-0 dark bg-[#111] rounded-xl">
          <CardHeader className="border-b border-[#2a2a2a] p-4 pb-2">
            <CardTitle className="text-white">Login</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
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
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 transition cursor-pointer"
                disabled={isSubmitting || !email || !password}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>

          <div className="text-center mt-4 pb-6">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register?redirect=${encodeURIComponent(redirect)}`}
                className="text-white font-medium underline hover:text-gray-200 transition"
              >
                Register
              </Link>
            </p>
          </div>
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
