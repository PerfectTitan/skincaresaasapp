import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import SkinQuizPage from "./pages/quiz/SkinQuizPage";
import RoutinePage from "./pages/routine/RoutinePage";
import DashboardPage from "./pages/dashboard/DashboardPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/quiz" element={<SkinQuizPage />} />
          <Route path="/routine" element={<RoutinePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
