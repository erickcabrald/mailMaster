import { Search, Bell, Plus, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <header className="bg-card border-b border-border px-4 md:px-6 py-4 sticky top-0 z-10 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {/* Mobile menu button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={
              isMobile ? "Buscar..." : "Buscar e-mails, grupos ou templates..."
            }
            className="pl-10"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            onClick={() => navigate("/send")}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size={isMobile ? "icon" : "default"}
          >
            <Plus className="w-4 h-4 md:mr-2" />
            {!isMobile && "Novo E-mail"}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>

          <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
