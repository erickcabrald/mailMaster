import { useState } from "react";
import { EmailCard } from "./EmailCard";
import { Button } from "./ui/button";
import { Trash2, Heart, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface Email {
  id: string;
  email: string;
  name: string;
  company: string;
  isFavorite: boolean;
  tags: string[];
  addedAt: string;
}

interface EmailListProps {
  emails: Email[];
  onEmailsChange: (emails: Email[]) => void;
}

export const EmailList = ({ emails, onEmailsChange }: EmailListProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === emails.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(emails.map((e) => e.id));
    }
  };

  const handleToggleFavorite = (id: string) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
    );
    onEmailsChange(updatedEmails);
    toast.success("Atualizado com sucesso!");
  };

  const handleDelete = (id: string) => {
    const updatedEmails = emails.filter((email) => email.id !== id);
    onEmailsChange(updatedEmails);
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    toast.success("E-mail excluído!");
  };

  const handleBulkDelete = () => {
    const updatedEmails = emails.filter((email) => !selectedIds.includes(email.id));
    onEmailsChange(updatedEmails);
    setSelectedIds([]);
    toast.success(`${selectedIds.length} e-mails excluídos!`);
  };

  const handleBulkFavorite = () => {
    const updatedEmails = emails.map((email) =>
      selectedIds.includes(email.id) ? { ...email, isFavorite: true } : email
    );
    onEmailsChange(updatedEmails);
    toast.success(`${selectedIds.length} e-mails favoritados!`);
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-muted/50 border border-border rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm font-medium">
            {selectedIds.length} {selectedIds.length === 1 ? "selecionado" : "selecionados"}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkFavorite}
            >
              <Heart className="w-4 h-4 mr-2" />
              Favoritar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      )}

      {/* Select All */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleSelectAll}>
          {selectedIds.length === emails.length ? "Desmarcar todos" : "Selecionar todos"}
        </Button>
        <p className="text-sm text-muted-foreground">
          {emails.length} {emails.length === 1 ? "e-mail" : "e-mails"}
        </p>
      </div>

      {/* Email Cards */}
      <div className="grid gap-4">
        {emails.map((email) => (
          <EmailCard
            key={email.id}
            email={email}
            isSelected={selectedIds.includes(email.id)}
            onSelect={handleSelect}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
