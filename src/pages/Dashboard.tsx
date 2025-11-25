import { StatsPanel } from "@/components/StatsPanel";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Mail, Users, Send, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mockHistory from "@/data/mockHistory.json";
import { motion } from "framer-motion";

const chartData = [
  { name: "Jan", emails: 120 },
  { name: "Fev", emails: 150 },
  { name: "Mar", emails: 180 },
  { name: "Abr", emails: 165 },
  { name: "Mai", emails: 210 },
  { name: "Jun", emails: 195 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = {
    totalSent: 110,
    deliveryRate: 98,
    openRate: 72,
    favorites: 3,
  };

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-primary-foreground"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Bem-vindo ao MailMaster! 👋
        </h1>
        <p className="text-sm md:text-base text-primary-foreground/90 mb-4 md:mb-6">
          Gerencie suas campanhas de e-mail com eficiência e inteligência.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => navigate("/send")}
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar E-mail
          </Button>
          <Button
            onClick={() => navigate("/groups")}
            variant="outline"
            className="border-white text-white bg-white/10 hover:bg-white/20 w-full sm:w-auto"
          >
            <Users className="w-4 h-4 mr-2" />
            Gerenciar Grupos
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <StatsPanel stats={stats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Email Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-xl p-4 md:p-6"
        >
          <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Atividade de E-mails
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar
                dataKey="emails"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-xl p-4 md:p-6"
        >
          <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Atividade Recente
          </h2>
          <div className="space-y-4">
            {mockHistory.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {item.subject}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.recipients} destinatários • {item.opened} abertos
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(item.sentAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => navigate("/history")}
          >
            Ver Histórico Completo
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
