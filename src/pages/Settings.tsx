import { Settings as SettingsIcon, User, Bell, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Settings = () => {
  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Personalize sua experiência no MailMaster
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-8 space-y-8"
      >
        {/* Profile Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Perfil</h2>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="Admin" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" defaultValue="admin@mailmaster.com" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notifications Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por e-mail</p>
                <p className="text-sm text-muted-foreground">
                  Receba atualizações sobre suas campanhas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Relatórios semanais</p>
                <p className="text-sm text-muted-foreground">
                  Resumo semanal de suas estatísticas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações de envio</p>
                <p className="text-sm text-muted-foreground">
                  Confirme quando e-mails forem enviados
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <Separator />

        {/* Appearance Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Aparência</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modo escuro</p>
                <p className="text-sm text-muted-foreground">
                  Alterne entre tema claro e escuro
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <Separator />

        {/* Security Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Segurança</h2>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Salvar Alterações
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
