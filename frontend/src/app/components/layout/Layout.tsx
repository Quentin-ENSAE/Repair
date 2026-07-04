import { Link, Outlet, useNavigate } from "react-router";
import { Logo } from "./Logo";
import { Avatar } from "./Avatar";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { Button } from "../ui/button";
import { useSession } from "../../context/SessionContext";

export function Layout() {
  const navigate = useNavigate();
  const { account } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav
        className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 py-3 backdrop-blur border-b"
        style={{ background: "rgba(30,42,82,0.95)", borderColor: "rgba(255,255,255,0.1)" }}
      >
        <Link to="/">
          <Logo size={56} onDark />
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link to="/#qui-sommes-nous" className="text-white/70 hover:text-white transition-colors">
              Qui sommes-nous ?
            </Link>
            <Link to="/#pourquoi-pair-aidance" className="text-white/70 hover:text-white transition-colors">
              Pourquoi la pair-aidance ?
            </Link>
            <Link to="/#comment-ca-marche" className="text-white/70 hover:text-white transition-colors">
              Comment ça marche ?
            </Link>
            <Link to="/#nos-valeurs" className="text-white/70 hover:text-white transition-colors">
              Nos valeurs
            </Link>
          </div>

          {account ? (
            <button
              type="button"
              onClick={() => navigate("/questionnaire")}
              className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-white/20 hover:bg-white/10 transition-colors"
            >
              <Avatar pseudonyme={account.pseudonyme} size={28} />
              <span className="text-sm font-semibold text-white">Mon profil</span>
            </button>
          ) : (
            <Button size="sm" className="rounded-2xl bg-white text-primary hover:bg-white/90" onClick={() => navigate("/creer-un-compte")}>
              Commencer
            </Button>
          )}
        </div>
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
