import { Link, Outlet } from "react-router";
import { Logo } from "./Logo";
import { DisclaimerBanner } from "./DisclaimerBanner";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-background/90 backdrop-blur border-b border-border">
        <Link to="/">
          <Logo size={44} />
        </Link>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <DisclaimerBanner />
      </footer>
    </div>
  );
}
