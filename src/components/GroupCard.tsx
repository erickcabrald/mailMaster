import { Users, Mail, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    description: string;
    emailIds: string[];
    color: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSendEmail: (id: string) => void;
}

export const GroupCard = ({ group, onEdit, onDelete, onSendEmail }: GroupCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: group.color + "20" }}
          >
            <Users className="w-6 h-6" style={{ color: group.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{group.name}</h3>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(group.id)}
            className="h-8 w-8"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(group.id)}
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Badge variant="secondary" className="text-sm">
          {group.emailIds.length} {group.emailIds.length === 1 ? "membro" : "membros"}
        </Badge>

        <Button
          size="sm"
          onClick={() => onSendEmail(group.id)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Mail className="w-4 h-4 mr-2" />
          Enviar E-mail
        </Button>
      </div>
    </motion.div>
  );
};
