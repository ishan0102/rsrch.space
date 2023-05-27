import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
        A space for <span className="italic text-blue-400">creative</span> exploration
      </h1>

      <h2 className="mt-6 text-3xl font-bold text-gray-200">Posts:</h2>

      <div className="mt-6 space-y-4">
        <Link href="/crazy" legacyBehavior>
          <a className="text-blue-400 hover:underline text-lg font-medium">
            "I need to do something crazy" by chloe21e8
          </a>
        </Link>
        {/* More posts go here... */}
      </div>
    </div>
  );
}
