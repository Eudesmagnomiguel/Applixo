
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Recycle, Info, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <section className="rounded-xl bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground shadow-lg md:p-12">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold md:text-5xl">Bem-vindo ao APPLIXO!</h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/90">
              Sua plataforma completa para gestão inteligente de resíduos em Angola. Juntos, por uma cidade mais limpa e sustentável.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/request-collection">
                Solicitar Recolha Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<ShoppingBag className="h-10 w-10 text-primary" />}
            title="Solicitação Fácil de Recolha"
            description="Agende a recolha dos seus recicláveis em poucos cliques. Simples, rápido e eficiente."
            link="/request-collection"
            linkText="Solicitar Recolha"
          />
          <FeatureCard
            icon={<Recycle className="h-10 w-10 text-primary" />}
            title="Informações sobre Reciclagem"
            description="Aprenda como separar corretamente seus resíduos e quais materiais são recicláveis."
            link="/recycling-info"
            linkText="Saber Mais"
          />
          <FeatureCard
            icon={<Info className="h-10 w-10 text-primary" />}
            title="Contribua para o Ambiente"
            description="Ao reciclar, você ajuda a proteger o meio ambiente e promove a sustentabilidade em Luanda."
            link="/faq"
            linkText="Perguntas Frequentes"
          />
        </section>

        <section className="container mx-auto">
            <Card className="overflow-hidden shadow-lg">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <Image
                            src="https://picsum.photos/seed/recyclingcommunity/800/600"
                            alt="Comunidade engajada na reciclagem"
                            width={800}
                            height={600}
                            className="h-full w-full object-cover"
                            data-ai-hint="recycling community"
                        />
                    </div>
                    <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Junte-se à Comunidade APPLIXO</CardTitle>
                            <CardDescription className="text-base md:text-lg mt-2">
                                "Ambienta, Puro e Protegido" - Nosso lema para um futuro mais verde. Participe ativamente na transformação de Luanda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 mt-6">
                            <p className="mb-4">
                                O APPLIXO é mais que um serviço: é um movimento. Acreditamos no poder da comunidade para criar um impacto positivo duradouro.
                            </p>
                            <Button asChild variant="outline">
                                <Link href="/profile">
                                    Conheça seu Impacto
                                </Link>
                            </Button>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </section>

      </div>
    </AppLayout>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
};

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center pb-4">
        {icon}
        <CardTitle className="mt-4 text-center text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground text-center">{description}</p>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={link}>{linkText}</Link>
        </Button>
      </div>
    </Card>
  );
}
