import { useState } from "react";
import { EmailList } from "@/components/EmailList";
import { Button } from "@/components/ui/button";
import { Plus, Mail } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { AddEmailModal } from "../components/AddEmailModal";
import mockEmailsData from "@/data/mockEmails.json";
import { motion } from "framer-motion";

const AllEmails = () => {
  const [emails, setEmails] = useState(mockEmailsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Todos os E-mails
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Gerencie seus contatos e organize suas listas
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar E-mail
        </Button>
      </motion.div>

      {emails.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="Nenhum e-mail cadastrado"
          description="Comece adicionando seus primeiros contatos para criar campanhas incríveis."
          actionLabel="Adicionar Primeiro E-mail"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <EmailList emails={emails} onEmailsChange={setEmails} />
        </motion.div>
      )}

      <AddEmailModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onEmailAdded={(newEmail) => setEmails([...emails, newEmail])}
      />
    </div>
  );
};

export default AllEmails;
