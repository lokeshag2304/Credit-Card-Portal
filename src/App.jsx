import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import LoginOTP from './views/LoginOTP';
import DashboardLayout from './views/DashboardLayout';
import DashboardHome from './views/Dashboard';
import Cards from './views/Cards';
import Transactions from './views/Transactions';
import Profile from './views/Profile';
import Statements from './views/Statements';
import Payments from './views/Payments';
import CardControls from './views/CardControls';
import Rewards from './views/Rewards';
import Requests from './views/Requests';
import Offers from './views/Offers';
import Support from './views/Support';
import Notifications from './views/Notifications';
import EmiLoans from './views/EmiLoans';
import RequestStatus from './views/RequestStatus';
import DesignSystem from './views/DesignSystem';
import Appearance from './views/Appearance';
import { ThemeProvider } from './ThemeProvider';
import { LanguageProvider } from './i18n/LanguageContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-otp" element={<LoginOTP />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="cards" element={<Cards />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="statements" element={<Statements />} />
              <Route path="payments" element={<Payments />} />
              <Route path="controls" element={<CardControls />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="emi-loans" element={<EmiLoans />} />
              <Route path="requests" element={<Requests />} />
              <Route path="request-status" element={<RequestStatus />} />
              <Route path="offers" element={<Offers />} />
              <Route path="support" element={<Support />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="design-system" element={<DesignSystem />} />
              <Route path="appearance" element={<Appearance />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
