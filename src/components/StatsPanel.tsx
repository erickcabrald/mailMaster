import { TrendingUp, Mail, MousePointerClick, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, trend, color }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        {trend && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </p>
        )}
      </div>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: color + "15" }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
    </div>
  </motion.div>
);

interface StatsPanelProps {
  stats: {
    totalSent: number;
    deliveryRate: number;
    openRate: number;
    favorites: number;
  };
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <StatCard
        title="E-mails Enviados"
        value={stats.totalSent}
        icon={Mail}
        trend="+12% este mês"
        color="#3B82F6"
      />
      <StatCard
        title="Taxa de Entrega"
        value={`${stats.deliveryRate}%`}
        icon={TrendingUp}
        trend="98% na média"
        color="#10B981"
      />
      <StatCard
        title="Taxa de Abertura"
        value={`${stats.openRate}%`}
        icon={MousePointerClick}
        trend="+5% vs. média"
        color="#8B5CF6"
      />
      <StatCard
        title="Favoritos"
        value={stats.favorites}
        icon={Heart}
        color="#EF4444"
      />
    </div>
  );
};
