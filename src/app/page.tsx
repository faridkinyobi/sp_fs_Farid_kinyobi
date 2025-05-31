import AuthForm from '@/features/Auth/components/authForm';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-white md:bg-background">
      <div className=" bg-white py-10 px-4 flex flex-col  items-center justify-center space-y-6 w-[400px] mx-4 md:mx-0  rounded-xl">
        <Image
          src="icon.svg"
          alt="icon login"
          width={134}
          height={24}
          priority
        />
        <AuthForm />
        <p className="text-sm">
          Don’t have an account? 
          <Link href={'/register'} className=" text-primary underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
