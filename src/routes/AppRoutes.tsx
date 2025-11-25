import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import AllEmails from "@/pages/AllEmails";
import Favorites from "@/pages/Favorites";
import Groups from "@/pages/Groups";
import SendEmail from "@/pages/SendEmail";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/emails" element={<AllEmails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/send" element={<SendEmail />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
