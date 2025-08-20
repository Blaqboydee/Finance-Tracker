import { BrowserRouter, Routes, Route ,  Navigate} from "react-router-dom";
import Dashboard from "./pages/SplendlyDashboard";
import Expenses from "./pages/Expenses";
import ExpenseSummary from "./pages/ExpenseSummary";
import SpendlyOnboarding from "./pages/SpendlyOnboarding";
import Navbar from "./components/Navbar";
import Bottomtab from "./components/Bottomtab";

function App() {
  const hasOnboarded = localStorage.getItem("hasOnboarded") === "true";
  return (
    <>
  <Navbar/>
    <Routes>
      {/* Onboarding route (not inside Layout) */}
      <Route
        path="/"
        element={
          hasOnboarded ? <Navigate to="/dashboard" /> : <SpendlyOnboarding />
        }
      />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/summary" element={<ExpenseSummary />} />

    </Routes>

    <Bottomtab/>
      </>
  );
}

export default App;
