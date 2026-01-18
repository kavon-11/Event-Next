import Link from "next/link";
import Image from "next/image";
import logo from "../public/icons/logo.png";

function NavBar() {
    return (
        <aside className="fixed z-50 top-0 left-0 w-full h-20 md:h-full md:w-20 border-b md:border-b-0 md:border-r border-white/10 bg-black/50 backdrop-blur-md">
            <nav className="grid grid-cols-[auto_1fr] md:grid-cols-1 md:grid-rows-[auto_1fr] h-full items-center md:items-start px-6 md:px-3 py-4 md:py-8 text-white">
                {/* Logo */}
                <Link href="/" className="md:mb-10 md:mx-auto">
                    <Image src={logo} alt="Logo" width={28} height={28} />
                </Link>

                {/* Links */}
                <ul className="grid grid-cols-3 md:grid-cols-1 gap-1 md:gap-4 list-none text-xs justify-end md:justify-start">
                    <li>
                        <Link className="block py-2 md:py-3 px-2 md:px-4 rounded-lg transition hover:bg-white/10 hover:text-teal-300 text-center text-[10px] md:text-xs" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="block py-2 md:py-3 px-2 md:px-4 rounded-lg transition hover:bg-white/10 hover:text-teal-300 text-center text-[10px] md:text-xs" href="/events">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link className="block py-2 md:py-3 px-2 md:px-4 rounded-lg transition hover:bg-white/10 hover:text-teal-300 text-center text-[10px] md:text-xs" href="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default NavBar;
