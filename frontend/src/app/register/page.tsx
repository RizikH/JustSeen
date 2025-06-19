'use client';

import React, { useEffect, Suspense } from "react";
import RegisterForm from "@/components/Auth/Register";
import { useAuth } from "@/components/hooks/useAuth";

const Register: React.FC = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const timeout = setTimeout(() => {
                window.location.href = "/";
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-[var(--page-height)] w-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">You are already logged in!</h1>
                    <p className="text-gray-400">Redirecting to home in 3 seconds...</p>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex items-center justify-center min-h-[var(--page-height)] w-screen">
                <RegisterForm />
            </div>
        </Suspense>
    );
};

export default Register;
