import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ShieldCheck, UserCheck, FileQuestion } from 'lucide-react';

const legalSections = [
  {
    id: "terms",
    title: "Termos e Condições de Uso",
    icon: FileText,
    lastUpdated: "01 de Julho de 2024",
    summary: "Este documento descreve as regras para o uso do aplicativo Luanda Recicla, seus direitos e responsabilidades como usuário, e nossas obrigações como provedor do serviço. Ao utilizar o aplicativo, você concorda com estes termos.",
    contentLink: "/legal/terms-and-conditions"
  },
  {
    id: "privacy",
    title: "Política de Privacidade",
    icon: ShieldCheck,
    lastUpdated: "01 de Julho de 2024",
    summary: "Nossa Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais. Comprometemo-nos a garantir a segurança e confidencialidade dos seus dados.",
    contentLink: "/legal/privacy-policy"
  },
  {
    id: "cookies",
    title: "Política de Cookies",
    icon: UserCheck,
    lastUpdated: "15 de Junho de 2024",
    summary: "Informamos como utilizamos cookies e tecnologias similares para melhorar sua experiência no aplicativo, personalizar conteúdo e analisar nosso tráfego. Você pode gerenciar suas preferências de cookies.",
    contentLink: "/legal/cookie-policy"
  },
  {
    id: "disclaimer",
    title: "Aviso Legal e Responsabilidades",
    icon: FileQuestion,
    lastUpdated: "10 de Junho de 2024",
    summary: "Este aviso detalha as limitações de responsabilidade do Luanda Recicla e as condições sob as quais o serviço é fornecido. Inclui informações sobre a precisão das informações e isenções de garantia.",
    contentLink: "/legal/disclaimer"
  }
];

export default function LegalPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-foreground">Informações Legais</h1>
          <p className="text-lg text-muted-foreground mt-2">Conheça nossos termos, políticas e avisos legais.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {legalSections.map((section) => (
            <Card key={section.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                  <section.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl text-foreground">{section.title}</CardTitle>
                </div>
                <CardDescription className="text-xs mt-1">Última atualização: {section.lastUpdated}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{section.summary}</p>
                <a 
                  href={section.contentLink} 
                  className="mt-auto inline-block text-sm font-medium text-primary hover:underline"
                  onClick={(e) => {e.preventDefault(); alert(`Navegando para ${section.title}... (Página de placeholder)`)}}
                >
                  Ler documento completo &rarr;
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto mt-12 bg-accent/30 p-6 text-center">
            <CardHeader className="p-0">
                <CardTitle className="text-xl text-accent-foreground">Dúvidas sobre nossos termos?</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2">
                <CardDescription className="text-base text-accent-foreground/80 mb-4">
                    Se tiver qualquer questão sobre nossas políticas, por favor, entre em contato conosco.
                </CardDescription>
                <a href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                    Fale Conosco
                </a>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
