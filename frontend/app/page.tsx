import { auth } from "@/auth";
import { signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      인프런 클론
      {session ? (
        <div>
          로그인 되었습니다.
          <p>{session.user?.email}</p>
        </div>
      ) : (
        <div>로그인 안 되었습니다.</div>
      )}
      {session ? 
        <button onClick={async () => { 'use server'; await signOut()}}>로그아웃</button> :
        <Link href='/signin'>로그인</Link>
      }
    </div>
  );
}
