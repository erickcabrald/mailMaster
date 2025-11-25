import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Save, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import mockGroupsData from "@/data/mockGroups.json";
import mockTemplatesData from "@/data/mockTemplates.json";
import { ScheduleEmailDialog } from "@/components/ScheduleEmailDialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const SendEmail = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplatesData.find((t) => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setMessage(template.body.replace(/<[^>]*>/g, "")); // Remove HTML tags for textarea
      setSelectedTemplate(templateId);
    }
  };

  const handleSend = () => {
    if (!subject || !message) {
      toast.error("Preencha o assunto e a mensagem!");
      return;
    }
    toast.success("E-mail enviado com sucesso!");
    setSubject("");
    setMessage("");
    setSelectedGroup("");
    setSelectedTemplate("");
  };

  const handleSaveTemplate = () => {
    toast.success("Template salvo com sucesso!");
  };

  const handleSchedule = (date: Date, time: string) => {
    if (!subject || !message) {
      toast.error("Preencha o assunto e a mensagem!");
      return;
    }
    const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });
    toast.success(`E-mail agendado para ${formattedDate} às ${time}`);
    setSubject("");
    setMessage("");
    setSelectedGroup("");
    setSelectedTemplate("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Enviar E-mail</h1>
        <p className="text-muted-foreground mt-1">
          Crie e envie campanhas personalizadas para seus contatos
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-8 space-y-6"
      >
        {/* Template Selection */}
        <div className="space-y-2">
          <Label>Usar Template</Label>
          <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um template (opcional)" />
            </SelectTrigger>
            <SelectContent>
              {mockTemplatesData.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recipients */}
        <div className="space-y-2">
          <Label>Destinatários</Label>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um grupo" />
            </SelectTrigger>
            <SelectContent>
              {mockGroupsData.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name} ({group.emailIds.length} membros)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">Assunto</Label>
          <Input
            id="subject"
            placeholder="Digite o assunto do e-mail"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            placeholder="Digite sua mensagem aqui... Use {{nome}} e {{email}} para personalização"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Dica: Use placeholders como {"{"}
            {"{"}nome{"}"} e {"{"}
            {"{"}email{"}"} para personalizar a mensagem
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSend}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Agora
          </Button>
          <Button variant="outline" onClick={handleSaveTemplate}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Template
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsScheduleDialogOpen(true)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Agendar
          </Button>
        </div>
      </motion.div>

      <ScheduleEmailDialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
        onSchedule={handleSchedule}
      />
    </div>
  );
};

export default SendEmail;
