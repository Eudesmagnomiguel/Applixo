
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, Target, Settings, Users, HardDrive, Palette, Database, Cloud, Map, UsersRound, Briefcase, Zap, Building, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutAppLixoPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <header className="mb-12 text-center">
          <Rocket className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-foreground">Sobre o APPLIXO</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Inovação tecnológica para uma gestão inteligente de resíduos em Angola.
          </p>
        </header>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">O Projeto APPLIXO</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground leading-relaxed">
              A APP LIXO é um projeto de inovação tecnológica com foco em gestão inteligente de resíduos em Angola. A iniciativa visa conectar cidadãos, empresas e comunidades a um sistema eficiente de recolha, separação, reciclagem e educação ambiental. Com uma proposta digital e operacional, a APP LIXO integra tecnologia, logística e sustentabilidade para combater o descarte inadequado e promover cidades mais limpas.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Target className="mr-3 h-7 w-7" />
              Objetivo Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground leading-relaxed">
              Desenvolver e implementar uma plataforma digital e um sistema logístico de gestão de resíduos sólidos que:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-foreground">
              <li>Melhore o serviço de recolha de lixo em áreas urbanas e suburbanas.</li>
              <li>Implemente práticas sustentáveis de separação e reaproveitamento.</li>
              <li>Promova a educação ambiental nas comunidades.</li>
              <li>Gere impacto ambiental, social e económico positivo.</li>
            </ul>
          </CardContent>
        </Card>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground mb-6 flex items-center">
            <Settings className="mr-3 h-8 w-8 text-primary" />
            Componentes do Desenvolvimento
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Zap className="mr-2 h-6 w-6" />
                  Plataforma Digital (App/Web)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2 text-foreground">Funcionalidades:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
                  <li>Cadastro de usuários (residencial, comercial, institucional)</li>
                  <li>Agendamento e rastreio de recolhas</li>
                  <li>Sistema de notificações e alertas</li>
                  <li>Painel de dados ambientais (estatísticas, CO₂ evitado, etc.)</li>
                  <li>Área educativa com dicas e campanhas</li>
                </ul>
                <p className="font-semibold mb-2 text-foreground">Tecnologia:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground"><Palette className="mr-2 h-4 w-4 text-primary" /> Frontend: React Native (Conceito), Next.js/React (Atual)</div>
                  <div className="flex items-center text-muted-foreground"><HardDrive className="mr-2 h-4 w-4 text-primary" /> Backend: Genkit (IA), Potencial Node.js / Django</div>
                  <div className="flex items-center text-muted-foreground"><Database className="mr-2 h-4 w-4 text-primary" /> Base de Dados: PostgreSQL / Firebase (Conceito)</div>
                  <div className="flex items-center text-muted-foreground"><Cloud className="mr-2 h-4 w-4 text-primary" /> Hospedagem: Netlify / AWS (Conceito)</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Map className="mr-2 h-6 w-6" />
                  Operações e Logística
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Definição de rotas otimizadas de recolha (via GPS e IA)</li>
                  <li>Treinamento de equipas de recolha e triagem</li>
                  <li>Identificação de pontos de armazenamento e triagem de resíduos</li>
                  <li>Parcerias com empresas de reciclagem e aterros licenciados</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow lg:col-span-1" id="plans"> {/* Adjusted to span 1 if needed for layout, or remove lg:col-span-3 */}
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Briefcase className="mr-2 h-6 w-6" />
                  Nossos Planos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center mb-1"><HomeIcon className="mr-2 h-5 w-5 text-primary/80" />Plano Residencial</h4>
                  <p className="text-sm text-muted-foreground">Ideal para o dia a dia da sua família. Coleta prática e programada.</p>
                  <p className="text-sm text-muted-foreground font-semibold mt-1">Preço: 350 Kz/dia (Consulte condições)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground flex items-center mb-1"><Building className="mr-2 h-5 w-5 text-primary/80" />Plano Comercial</h4>
                  <p className="text-sm text-muted-foreground">Soluções para empresas de todos os portes. Gestão eficiente de resíduos comerciais.</p>
                  <p className="text-sm text-muted-foreground font-semibold mt-1">Preço: 1300 Kz/kg (Solicite via app)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Planos Personalizados</h4>
                  <p className="text-sm text-muted-foreground">Necessidades específicas? Oferecemos planos sob medida, baseados no volume e frequência de recolha. Ideal para condomínios, eventos e grandes geradores.</p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/contact">Contate-nos para um orçamento</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="mt-12 bg-secondary/20 p-6 md:p-8 text-center shadow-lg">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-2xl md:text-3xl font-bold text-secondary-foreground flex items-center justify-center">
                    <UsersRound className="mr-3 h-8 w-8" />
                    Junte-se a Nós!
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <CardDescription className="text-base md:text-lg text-secondary-foreground/80 mb-6">
                    Faça parte da mudança para uma Luanda mais limpa e sustentável. Explore nossos serviços e contribua para um futuro melhor.
                </CardDescription>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        <Link href="/request-collection">Solicitar Coleta (Comercial)</Link>
                    </Button>
                    <Button asChild variant="outline" className="px-6 py-3 text-primary rounded-md font-medium hover:bg-primary/10 transition-colors">
                        <Link href="/recycling-info">Saber Mais sobre Reciclagem</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}

  