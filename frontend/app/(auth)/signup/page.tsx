'use client';

import { useState } from "react";
import { signUp } from "@/app/actions/auth-actions";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const result = await signUp(email, password);
    if (result.status === "error") {
      alert(result.message);
      return;
    }
    
    router.push('/signin');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>회원가입</h1>
      <p>인프런에서 성장의 기회를 발견하세요.</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2" placeholder="이메일" />
        <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md p-2" placeholder="비밀번호" />
        <input type="password" value={passwordConfirm} name="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} className="border border-gray-300 rounded-md p-2" placeholder="비밀번호 확인" />
        <button type="submit" className="bg-green-500 text-white rounded-md p-2">회원가입</button>
        <Link href='/signin' className="text-green-500 rounded-md border border-green-500 p-2 text-center">로그인하러 가기</Link>
      </form>
    </div>
  )
}