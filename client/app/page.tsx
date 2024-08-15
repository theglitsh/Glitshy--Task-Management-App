import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to the Task Management Dashboard
        </h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/auth/register"
                className="text-xl text-blue-500 hover:text-blue-400"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="text-xl text-blue-500 hover:text-blue-400"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="text-xl text-blue-500 hover:text-blue-400"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
