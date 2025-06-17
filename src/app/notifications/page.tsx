
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

// Mock data for notifications
const mockNotifications = [
  { id: 'notif001', type: 'success', title: 'Recolha Confirmada!', message: 'Sua recolha #001 está confirmada para 16 de Julho, entre 14:00-16:00.', date: '15 de Julho, 2024', read: false },
  { id: 'notif002', type: 'info', title: 'Novo Ponto de Recolha', message: 'Adicionamos um novo ponto de recolha de eletrônicos no Bairro Azul.', date: '14 de Julho, 2024', read: true },
  { id: 'notif003', type: 'warning', title: 'Manutenção Programada', message: 'O app estará em manutenção no dia 20 de Julho, das 02:00 às 04:00.', date: '12 de Julho, 2024', read: false },
  { id: 'notif004', type: 'success', title: 'Créditos Verdes Adicionados', message: 'Você recebeu 50 Créditos Verdes pela sua última recolha!', date: '10 de Julho, 2024', read: true },
];

const getIconForType = (type: string) => {
  switch (type) {
    case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'info': return <Info className="h-5 w-5 text-blue-500" />;
    case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    default: return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

export default function NotificationsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center">
            <Bell className="mr-3 h-8 w-8" />
            Notificações
          </h1>
          <Button variant="outline" size="sm">Marcar todas como lidas</Button>
        </div>

        {mockNotifications.length === 0 ? (
          <Card className="text-center py-12 shadow-md">
            <CardHeader>
              <Bell className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <CardTitle className="text-2xl">Nenhuma notificação</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-6">
                Você não tem nenhuma notificação no momento.
              </CardDescription>
              <Button asChild size="lg">
                <Link href="/dashboard">Voltar ao Início</Link> {/* Updated link */}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockNotifications.map((item) => (
              <Card key={item.id} className={`shadow-md hover:shadow-lg transition-shadow duration-200 ${!item.read ? 'border-primary border-2' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{getIconForType(item.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className={`font-semibold ${!item.read ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</p>
                        <p className={`text-xs ${!item.read ? 'text-foreground' : 'text-muted-foreground'}`}>{item.date}</p>
                      </div>
                      <p className={`text-sm ${!item.read ? 'text-foreground/80' : 'text-muted-foreground/80'}`}>{item.message}</p>
                    </div>
                    {!item.read && <span className="h-2.5 w-2.5 bg-primary rounded-full flex-shrink-0 mt-1.5 ml-2" aria-label="Não lida"></span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
