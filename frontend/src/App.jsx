import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminEvents from "./pages/AdminEventsPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedLayout from "./layout/protectedLayout";
import MyEventRegistrations from "./pages/MyEventRegistrations";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/my-registrations" element={<MyEventRegistrations/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
