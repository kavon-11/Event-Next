import Link from "next/link";
import Image from "next/image";
import logo from "../public/icons/logo.png";

function NavBar() {
    return (
        <aside className="fixed top-0 left-0 z-50 h-full w-20 border-r border-white/10 bg-black/50 backdrop-blur-md">
            <nav className="flex h-full flex-col items-center px-3 py-8 text-white">
                {/* Logo */}
                <Link href="/" className="mb-10">
                    <Image src={logo} alt="Logo" width={28} height={28} />
                </Link>

                {/* Links */}
                <ul className="flex flex-col gap-4 list-none text-xs">
                    <li>
                        <Link className="block py-3 px-4 rounded-lg transition hover:bg-white/10 hover:text-teal-300 text-center" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="block py-3 px-4 rounded-lg transition hover:bg-white/10 hover:text-teal-300 text-center" href="/events">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link className="block py-3 px-4 rounded-lg transition hover:bg-white/10 hover:text-teal-300 text-center" href="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default NavBar;
