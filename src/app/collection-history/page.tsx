
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { History, PlusCircle } from 'lucide-react';

// Mock data for collection history
const mockHistory = [
  { id: 'col001', date: '15 de Julho, 2024', bags: 3, cost: '1000 KZ', status: 'Concluída', items: ['Plásticos', 'Papel'] },
  { id: 'col002', date: '02 de Julho, 2024', bags: 5, cost: '1800 KZ', status: 'Concluída', items: ['Cartão', 'Vidro', 'Eletrônicos'] },
  { id: 'col003', date: '20 de Junho, 2024', bags: 2, cost: '1000 KZ', status: 'Cancelada', items: [] },
  { id: 'col004', date: '05 de Junho, 2024', bags: 8, cost: '2000 KZ', status: 'Concluída', items: ['Plásticos', 'Papel', 'Cartão'] },
];

type CollectionHistoryPageProps = {
  params?: Record<string, string | string[] | undefined>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function CollectionHistoryPage(props: CollectionHistoryPageProps) {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-primary flex items-center">
            <History className="mr-3 h-8 w-8" />
            Histórico de Recolhas
          </h1>
          <Button asChild>
            <Link href="/request-collection">
              <PlusCircle className="mr-2 h-5 w-5" />
              Nova Solicitação de Recolha
            </Link>
          </Button>
        </div>

        {mockHistory.length === 0 ? (
          <Card className="text-center py-12 shadow-md">
            <CardHeader>
              <History className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <CardTitle className="text-2xl">Nenhuma recolha encontrada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-6">
                Você ainda não solicitou nenhuma recolha. Comece agora a reciclar conosco!
              </CardDescription>
              <Button asChild size="lg">
                <Link href="/request-collection">Solicitar Recolha</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {mockHistory.map((item) => (
              <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="border-b pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <CardTitle className="text-xl text-foreground mb-2 sm:mb-0">Recolha #{item.id.slice(-3)}</CardTitle>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${item.status === 'Concluída' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200' : ''}
                        ${item.status === 'Cancelada' ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' : ''}
                      `}
                    >
                      {item.status}
                    </span>
                  </div>
                  <CardDescription className="text-sm">{item.date}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Quantidade</p>
                    <p className="text-base text-foreground">{item.bags} Sacolas</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Custo</p>
                    <p className="text-base text-foreground">{item.cost}</p>
                  </div>
                   {item.items.length > 0 && (
                    <div className="sm:col-span-2 md:col-span-1">
                        <p className="text-sm font-medium text-muted-foreground">Itens Recolhidos</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                        {item.items.map(type => (
                            <span key={type} className="px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-md">{type}</span>
                        ))}
                        </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
