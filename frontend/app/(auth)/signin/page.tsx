'use client';

import { useState } from "react";
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>로그인</h1>
      <p>인프런 클론</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2" placeholder="이메일" />
        <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md p-2" placeholder="비밀번호" />
        <button type="submit" className="bg-green-500 text-white rounded-md p-2">로그인</button>
        <Link href='/signup' className="text-green-500 rounded-md border border-green-500 p-2 text-center">회원가입</Link>
      </form>
    </div>
  )
}