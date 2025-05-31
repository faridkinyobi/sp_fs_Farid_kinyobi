import Image from 'next/image';
import RegisterForm from '@/features/register/components/registerForm';
import Link from 'next/link';

export default function page() {
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
        <RegisterForm />
        <p className="text-sm">
          already have an account?
          <Link href={'/'} className=" text-primary underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
