import { Link } from "wouter";
import logo from "@assets/i. AGT High Res Logo_1764417999633.png";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="flex flex-col justify-center">
              <img src={logo} alt="AGT Logo" className="h-10 w-auto object-contain" />
              <span className="text-[10px] tracking-widest text-[#7A7A7A] font-medium mt-1 uppercase">
                Absolute Genetic Technologies
              </span>
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-4">
          <p>© {new Date().getFullYear()} Absolute Genetic Technologies. All rights reserved.</p>
          <div className="pt-2">
            <Link href="/admin">
              <a className="text-xs text-gray-300 hover:text-primary transition-colors">Admin Login</a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
