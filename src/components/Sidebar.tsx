import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Mail, 
  Heart, 
  Users, 
  Send, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/emails", icon: Mail, label: "Todos os E-mails" },
  { to: "/favorites", icon: Heart, label: "Favoritos" },
  { to: "/groups", icon: Users, label: "Grupos" },
  { to: "/send", icon: Send, label: "Enviar E-mail" },
  { to: "/history", icon: History, label: "Histórico" },
  { to: "/settings", icon: Settings, label: "Configurações" },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar = ({ isMobileOpen = false, onMobileClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const SidebarContent = (
    <div className="bg-card h-full flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MailMaster
            </h1>
          </div>
        )}
        {isMobile ? (
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={isMobile ? onMobileClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            MailMaster v1.0
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 z-40"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 h-full w-64 z-50"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? "5rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card border-r border-border h-screen sticky top-0 flex flex-col shadow-sm"
    >
      {SidebarContent}
    </motion.aside>
  );
};
