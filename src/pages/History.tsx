import { History as HistoryIcon, Mail, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import mockHistoryData from "@/data/mockHistory.json";
import { motion } from "framer-motion";

const History = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Histórico de Envios</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe o desempenho de todas as suas campanhas
        </p>
      </motion.div>

      {mockHistoryData.length === 0 ? (
        <EmptyState
          icon={HistoryIcon}
          title="Nenhum envio registrado"
          description="Quando você enviar seus primeiros e-mails, eles aparecerão aqui."
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">Assunto</th>
                  <th className="text-left p-4 font-semibold text-sm">Destinatários</th>
                  <th className="text-left p-4 font-semibold text-sm">Abertos</th>
                  <th className="text-left p-4 font-semibold text-sm">Cliques</th>
                  <th className="text-left p-4 font-semibold text-sm">Data</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockHistoryData.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="font-medium">{item.subject}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{item.recipients}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{item.opened}</span>
                        <span className="text-xs text-muted-foreground">
                          ({Math.round((item.opened / item.recipients) * 100)}%)
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{item.clicked}</span>
                        <span className="text-xs text-muted-foreground">
                          ({Math.round((item.clicked / item.recipients) * 100)}%)
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(item.sentAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={item.status === "enviado" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default History;
