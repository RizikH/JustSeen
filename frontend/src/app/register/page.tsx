'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const RegisterForm = dynamic(() => import('@/components/Auth/Register'), { ssr: false });

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
