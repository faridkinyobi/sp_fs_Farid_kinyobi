import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center text-center space-y-4">
      <h2 className="font-bold text-4xl">404 | Not Found</h2>

      <Link href="/" className=" text-primary underline">
        Return Home
      </Link>
    </div>
  );
}
