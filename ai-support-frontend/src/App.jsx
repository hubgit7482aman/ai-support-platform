import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/chat/:businessId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/knowledge-base/:businessId" element={<KnowledgeBasePage />}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;