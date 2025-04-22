import Link from 'next/link';

function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md top-0 w-full z-50 fixed">
                    {/* Logo */}
            <div className="text-2xl font-bold text-blue-800">
                🌿 HabitFlow
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
                <Link href='/' className="hover:text-blue-800">Home</Link>
                <Link href='#' className="hover:text-blue-800">My Habits</Link>
                <Link href='#goals' className="hover:text-blue-800 ">Goals</Link>
                <Link href='#' className="hover:text-blue-800">Groups</Link>
            </nav>
            <div className="flex items-center gap-4">
                <div className="hidden md:block text-gray-700 font-medium cursor-pointer hover:text-blue-800">
                👤 Profile
                </div>
                <button className="bg-blue-800 text-white px-4 py-1 rounded hover:bg-blue-900">
                Logout
                </button>
            </div>
        </header>

        
    );
}
export default Header;