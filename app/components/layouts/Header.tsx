import Link from "next/link";

function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
                    {/* Logo */}
            <div className="text-2xl font-bold text-green-600">
                🌿 HabitFlow
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
                <Link href='/' className="hover:text-green-600">Home</Link>
                <Link href='#' className="hover:text-green-600">My Habits</Link>
                <Link href='#' className="hover:text-green-600">Goals</Link>
                <Link href='#' className="hover:text-green-600">Groups</Link>
            </nav>
            <div className="flex items-center gap-4">
                <div className="hidden md:block text-gray-700 font-medium cursor-pointer hover:text-green-600">
                👤 Profile
                </div>
                <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                Logout
                </button>
            </div>
        </header>

        
    );
}
export default Header;