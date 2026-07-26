import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const OurFund = lazy(() => import("./pages/OurFund"));
const Sponsor = lazy(() => import("./pages/Sponsor"));
const BecomeSponsor = lazy(() => import("./pages/BecomeSponsor"));
const ForSchoolEducation = lazy(() => import("./pages/ForSchoolEducation"));
const OurPartner = lazy(() => import("./pages/OurPartner"));
const Community = lazy(() => import("./pages/Community"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const ForestDetail = lazy(() => import("./pages/ForestDetail"));
const News = lazy(() => import("./pages/News"));
const OurProject = lazy(() => import("./pages/OurProject"));
const OurGame = lazy(() => import("./pages/OurGame"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AuthWrapper = lazy(() => import("./features/auth/AuthWrapper"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const UserManagement = lazy(() => import("./admin/pages/UserManagement"));
const CSRManagement = lazy(() => import("./admin/pages/CSRManagement"));
const FinancialReports = lazy(() => import("./admin/pages/FinancialReports"));
const CustomerSupport = lazy(() => import("./admin/pages/CustomerSupport"));
const Logs = lazy(() => import("./admin/pages/Logs"));
const MessageDetail = lazy(() => import("./admin/pages/MessageDetail"));
// removed Pally font import; Montserrat is now global via src/index.css

function App() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#d68c45]"></div>
      </div>
    }>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/our-fund" element={<OurFund />} />
      <Route path="/sponsor" element={<Sponsor />} />
      <Route path="/become-sponsor" element={<BecomeSponsor />} />
      <Route path="/for-school-education" element={<ForSchoolEducation />} />
      <Route path="/our-partner" element={<OurPartner />} />
      <Route path="/community" element={<Community />} />
      <Route path="/post/:slug" element={<PostDetail />} />
      <Route path="/semi-deciduous-forest" element={<ForestDetail />} />
      <Route path="/bamboo-forest" element={<ForestDetail />} />
      <Route path="/wetland" element={<ForestDetail />} />
      <Route path="/mixed-hardwood" element={<ForestDetail />} />
      <Route path="/forest/:slug" element={<ForestDetail />} />
      <Route path="/news" element={<News />} />
      <Route path="/our-project" element={<OurProject />} />
      <Route path="/our-game" element={<OurGame />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/login" element={<AuthWrapper />} />
      <Route path="/register" element={<AuthWrapper />} />
      <Route path="/verify-email" element={<AuthWrapper />} />
      <Route path="/forgot-password" element={<AuthWrapper />} />
      <Route path="/change-password" element={<AuthWrapper />} />
      <Route path="/change-password-success" element={<AuthWrapper />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/csr" element={<CSRManagement />} />
      <Route path="/admin/financial" element={<FinancialReports />} />
      <Route path="/admin/support" element={<CustomerSupport />} />
      <Route path="/admin/message/:type/:id" element={<MessageDetail />} />
      <Route path="/admin/logs" element={<Logs />} />
    </Routes>
    </Suspense>
  );
}

export default App;
