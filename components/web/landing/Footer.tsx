import Link from "next/link";
import { Bookmark } from "lucide-react";

const links = [
  { label: "Blog", href: "/blog" },
  { label: "Create", href: "/create" },
  { label: "Login", href: "/auth/login" },
  { label: "Sign Up", href: "/auth/sign-up" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold">
            Nex<span className="text-primary">Pro</span>
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Credit */}
        <p className="text-sm text-muted-foreground">
          Built with{" "}
          <span className="font-medium text-foreground">Next.js</span> &{" "}
          <span className="font-medium text-foreground">Convex</span>
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 NexPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
