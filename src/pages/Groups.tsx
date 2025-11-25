import { useState } from "react";
import { GroupCard } from "@/components/GroupCard";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import mockGroupsData from "@/data/mockGroups.json";
import { motion } from "framer-motion";

const Groups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(mockGroupsData);

  const handleEdit = (id: string) => {
    toast.info("Funcionalidade em desenvolvimento");
  };

  const handleDelete = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
    toast.success("Grupo excluído com sucesso!");
  };

  const handleSendEmail = (id: string) => {
    navigate("/send", { state: { groupId: id } });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Grupos</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Organize seus contatos em grupos para campanhas segmentadas
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Novo Grupo
        </Button>
      </motion.div>

      {groups.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum grupo criado"
          description="Crie grupos para organizar seus contatos e facilitar o envio de campanhas segmentadas."
          actionLabel="Criar Primeiro Grupo"
          onAction={() => {}}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSendEmail={handleSendEmail}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Groups;
