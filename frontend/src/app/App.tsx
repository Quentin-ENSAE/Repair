import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { SessionProvider } from "./context/SessionContext";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { QuestionnairePage } from "./pages/QuestionnairePage";
import { RecommendationsPage } from "./pages/RecommendationsPage";
import { PairAidantProfilePage } from "./pages/PairAidantProfilePage";

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/creer-un-compte" element={<SignupPage />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
            <Route path="/recommandations" element={<RecommendationsPage />} />
            <Route path="/pair-aidants/:id" element={<PairAidantProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </SessionProvider>
  );
}
