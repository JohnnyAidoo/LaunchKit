"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import ThemeToggle from "./theme-toggle";

function Header(props: { signInButton }) {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100 px-10 sticky top-0 z-50 w-full">
      <div className="navbar-start">
        <Link
          href="/"
          className="text-2xl font-semibold flex items-center gap-2"
        >
          <Logo />
          {process.env.NEXT_PUBLIC_BASE_NAME}
        </Link>
      </div>

      {pathname === "/" ? (
        <div id="heronav" className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#faq">FAQs</a>
            </li>
          </ul>
        </div>
      ) : (
        <div id="heronav" className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>
      )}
      <div className="navbar-end flex items-center gap-4">
        <ThemeToggle />
        {props.signInButton}
      </div>
    </div>
  );
}

export default Header;
