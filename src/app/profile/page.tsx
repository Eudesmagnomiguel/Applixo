
import { AppLayout } from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { User, MapPin, Mail, History, Bell, HelpCircle, FileText, Award, LogOut, Edit3, ShieldCheck, Gift } from 'lucide-react';

const profileLinks = [
  { href: '/collection-history', icon: History, label: 'Histórico de Recolhas' },
  { href: '/notifications', icon: Bell, label: 'Notificações', badge: 3 },
  { href: '/green-credit', icon: Award, label: 'Crédito Verde', value: "150 Pontos" },
  { href: '/faq', icon: HelpCircle, label: 'Perguntas Frequentes' },
  { href: '/legal', icon: FileText, label: 'Informações Legais' },
];

const userData = {
  name: 'António Kaionda',
  email: 'antonio.kaionda@applixo.com',
  address: 'Zango 8000, Viana, Luanda',
  avatarUrl: 'https://picsum.photos/seed/userAK/200/200',
  initials: 'AK',
};

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-secondary/50 p-6 border-b">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage src={userData.avatarUrl} alt={userData.name} data-ai-hint="user avatar" />
                <AvatarFallback className="text-3xl">{userData.initials}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <CardTitle className="text-3xl font-bold text-primary">{userData.name}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-1">Membro desde Jan 2024</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="md:ml-auto mt-4 md:mt-0">
                <Edit3 className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <InfoSection title="Informações Pessoais">
                <InfoItem icon={<User className="h-5 w-5 text-primary" />} label="Nome Completo" value={userData.name} />
                <InfoItem icon={<Mail className="h-5 w-5 text-primary" />} label="Email" value={userData.email} />
                <InfoItem icon={<MapPin className="h-5 w-5 text-primary" />} label="Endereço Principal" value={userData.address} />
              </InfoSection>
              
              <InfoSection title="Segurança">
                 <InfoItem icon={<ShieldCheck className="h-5 w-5 text-primary" />} label="Verificação de Email" value="Verificado" />
                 <Button variant="link" className="p-0 h-auto text-primary">Alterar Senha</Button>
              </InfoSection>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Menu do Perfil</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileLinks.map((item) => (
                  <Link href={item.href} key={item.label} legacyBehavior>
                    <a className="block p-4 rounded-lg border bg-card hover:bg-accent hover:shadow-md transition-all duration-200 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <item.icon className="h-6 w-6 text-primary mr-3 transition-transform group-hover:scale-110" />
                          <span className="text-base font-medium text-card-foreground">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {item.value && (
                           <span className="text-sm text-muted-foreground font-medium">
                             {item.value}
                           </span>
                        )}
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
              <Separator className="my-6" />
              <Button variant="destructive" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Fechar Sessão
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

type InfoSectionProps = {
  title: string;
  children: React.ReactNode;
}

function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 text-foreground border-b pb-2">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-6 pt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base text-foreground">{value}</p>
      </div>
    </div>
  );
}

