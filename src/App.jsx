import { BrowserRouter, Routes, Route ,  Navigate} from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/SplendlyDashboard";
import Expenses from "./pages/Expenses";
import ExpenseSummary from "./pages/ExpenseSummary";
import SpendlyOnboarding from "./pages/SpendlyOnboarding";

function App() {
  const hasOnboarded = localStorage.getItem("hasOnboarded") === "true";
  return (
    <Routes>
      {/* Onboarding route (not inside Layout) */}
      <Route
        path="/"
        element={
          hasOnboarded ? <Navigate to="/layout/dashboard" /> : <SpendlyOnboarding />
        }
      />

      {/* Layout wraps dashboard + other pages */}
      <Route path="/layout" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/layout/dashboard" element={<Dashboard />} />
        <Route path="/layout/expenses" element={<Expenses />} />
        <Route path="/layout/summary" element={<ExpenseSummary />} />
      </Route>
    </Routes>
  );
}

export default App;
