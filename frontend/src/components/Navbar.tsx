import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const navLink = (path: string, label: string) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-lg transition-colors ${
        pathname === path ? "text-indigo-400" : "text-gray-300 hover:text-indigo-300"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-black/40 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-indigo-400">PixlAgent</h1>
      <div className="flex gap-6">
        {navLink("/", "Home")}
        {navLink("/features", "Features")}
        {navLink("/how-it-works", "How It Works")}
      </div>
    </nav>
  );
}
