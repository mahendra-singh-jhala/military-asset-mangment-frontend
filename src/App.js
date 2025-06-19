import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./page/Auth/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import BaseCommanderDashboard from "./component/BaseCommander/BaseCommanderDashboard";
import AdminDashboard from "./component/Admin/AdminDashboard";
import LogisticsOfficerDashboard from "./component/LogisticsOfficer/LogisticsOfficerDashboard";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={ <ProtectedRoute roles={["LogisticsOfficer"]} />} >
                        <Route path="/logisticsOfficerDashboard/*" element={<LogisticsOfficerDashboard />} />
                    </Route>

                    <Route element={ <ProtectedRoute roles={["BaseCommander"]} />} >
                        <Route path="/commanderDashboard/*" element={<BaseCommanderDashboard />} />
                    </Route>

                    <Route element={ <ProtectedRoute roles={["Admin"]} />} >
                        <Route path="/adminDashboard" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
