import { useState } from "react";
import { EmailList } from "@/components/EmailList";
import { Heart } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import mockEmailsData from "@/data/mockEmails.json";
import { motion } from "framer-motion";

const Favorites = () => {
  const [emails, setEmails] = useState(mockEmailsData);
  const favoriteEmails = emails.filter((email) => email.isFavorite);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">E-mails Favoritos</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Seus contatos mais importantes em um só lugar
        </p>
      </motion.div>

      {favoriteEmails.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nenhum favorito ainda"
          description="Marque seus contatos importantes como favoritos para acessá-los rapidamente."
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <EmailList emails={favoriteEmails} onEmailsChange={setEmails} />
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
