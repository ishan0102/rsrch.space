import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-800 text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl tracking-tight font-extrabold text-white md:text-6xl -mt-40 mb-20 text-center">
        A space for <span className="italic text-blue-400 transform transition-all duration-500 hover:text-yellow-400 hover:scale-110">creative</span> exploration
      </h1>

      <div className="mt-6 space-y-4 animate-bounce text-center">
        <Link href="/crazy" className="text-blue-400 text-lg font-medium">
            "I need to do something crazy" by chloe21e8
        </Link>
      </div>
    </div>
  );
}

