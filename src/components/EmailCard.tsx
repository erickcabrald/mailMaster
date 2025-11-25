import { Mail, Heart, Trash2, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface EmailCardProps {
  email: {
    id: string;
    email: string;
    name: string;
    company: string;
    isFavorite: boolean;
    tags: string[];
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmailCard = ({
  email,
  isSelected,
  onSelect,
  onToggleFavorite,
  onDelete,
}: EmailCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border rounded-xl p-4 hover:shadow-lg transition-all ${
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"
      }`}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(email.id)}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {email.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {email.email}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {email.company}
              </p>
            </div>

            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onToggleFavorite(email.id)}
              >
                <Heart
                  className={`w-4 h-4 ${
                    email.isFavorite
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onDelete(email.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {email.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs capitalize"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
