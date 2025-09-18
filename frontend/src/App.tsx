import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import DestinationBrowser from "./components/destinations/DestinationBrowser";
import TripPlanner from "./components/trips/TripPlanner";
import BudgetManager from "./components/budget/BudgetManager";
import TransportBooking from "./components/transport/TransportBooking";
import GroupTrips from "./components/groups/GroupTrips";
import LocalServices from "./components/services/LocalServices";
import Profile from "./components/profile/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/destinations" element={<DestinationBrowser />} />
              <Route path="/trip-planner" element={<TripPlanner />} />
              <Route path="/budget" element={<BudgetManager />} />
              <Route path="/transport" element={<TransportBooking />} />
              <Route path="/groups" element={<GroupTrips />} />
              <Route path="/services" element={<LocalServices />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
