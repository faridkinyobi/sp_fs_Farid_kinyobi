import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-white md:bg-background">
      <div className=" bg-white py-10 md:px-20 flex flex-col items-center justify-center space-y-6  mx-4 md:mx-0 rounded-xl shadow-2xl">
        <Image
          src="icon.svg"
          alt="icon login"
          width={134}
          height={24}
          priority
        />
        <Image
          src="Welcome-cuate.svg"
          alt="icon login"
          width={334}
          height={334}
          priority
        />
        <p className="text-sm md:text-base">
          Already have an account?
          <Link href={'/login'} className="text-primary underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
