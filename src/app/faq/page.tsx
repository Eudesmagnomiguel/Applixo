import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const faqs = [
  {
    question: "Como funciona o serviço de coleta do APPLIXO?",
    answer: "Você solicita a coleta através do nosso aplicativo, informa a quantidade de sacolas, escolhe o método de pagamento e agenda. Nossa equipe irá ao seu endereço no horário estimado para recolher os resíduos recicláveis."
  },
  {
    question: "Quais materiais são aceitos para reciclagem?",
    answer: "Aceitamos plásticos, papéis, cartões, vidros e lixos eletrônicos. Consulte a seção 'Info Reciclagem' no app para detalhes sobre cada material e como prepará-los."
  },
  {
    question: "Preciso separar os materiais recicláveis?",
    answer: "Sim, a separação correta é fundamental. Recomendamos que você separe os materiais por tipo (plástico, papel, etc.) em sacolas diferentes. Lave as embalagens e desmonte caixas para otimizar."
  },
  {
    question: "Qual é o custo da coleta?",
    answer: "O custo varia conforme a quantidade de sacolas: 1-3 sacolas custam 1000 KZ, 4-7 sacolas custam 1800 KZ, e 8-10 sacolas custam 2000 KZ."
  },
  {
    question: "Como funciona o sistema de Crédito Verde?",
    answer: "O Crédito Verde é um sistema de recompensas. A cada coleta bem-sucedida, você acumula pontos que podem ser trocados por benefícios ou descontos futuros. Mais detalhes serão divulgados em breve."
  },
  {
    question: "O que acontece se eu não estiver em casa no horário da coleta?",
    answer: "Recomendamos que alguém esteja presente para entregar os resíduos. Caso não seja possível, entre em contato conosco com antecedência para reagendar ou encontrar uma solução alternativa."
  },
  {
    question: "Posso cancelar uma coleta agendada?",
    answer: "Sim, você pode cancelar uma coleta através do aplicativo. Consulte os termos para prazos de cancelamento sem custo."
  }
];

export default function FaqPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-foreground">Perguntas Frequentes</h1>
          <p className="text-lg text-muted-foreground mt-2">Encontre respostas para as dúvidas mais comuns sobre nossos serviços.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Pesquisar perguntas..." className="pl-10 text-base h-12 rounded-lg shadow-sm" />
          </div>
        </div>
        
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardContent className="p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg overflow-hidden bg-background hover:bg-accent/30 transition-colors">
                  <AccordionTrigger className="p-4 md:p-5 text-left text-base md:text-lg font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 md:p-5 pt-0 text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto mt-12 bg-secondary/20 p-6 text-center">
            <CardHeader className="p-0">
                <CardTitle className="text-2xl text-secondary-foreground">Ainda tem dúvidas?</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-3">
                <CardDescription className="text-base text-secondary-foreground/80 mb-4">
                    Se não encontrou a resposta que procurava, nossa equipe está pronta para ajudar.
                </CardDescription>
                <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Fale Conosco
                </a>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
