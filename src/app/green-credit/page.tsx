
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Gift, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';


const userGreenCredit = {
  points: 150,
  tier: "Bronze Reciclador",
  nextTierPoints: 500,
  nextTierName: "Prata Reciclador",
  rewardsAvailable: [
    { id: 'rew001', name: 'Desconto de 5% na próxima recolha', pointsNeeded: 100, icon: ShoppingCart },
    { id: 'rew002', name: 'Brinde Ecológico Surpresa', pointsNeeded: 250, icon: Gift },
    { id: 'rew003', name: 'Doação para Causa Ambiental', pointsNeeded: 500, icon: Star },
  ],
  recentActivity: [
    { date: '15 de Julho, 2024', description: 'Recolha de 3 sacolas', points: '+50' },
    { date: '02 de Julho, 2024', description: 'Recolha de 5 sacolas', points: '+75' },
    { date: '20 de Junho, 2024', description: 'Cadastro no programa', points: '+25' },
  ]
};

type GreenCreditPageProps = {
  params?: Record<string, string | string[] | undefined>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function GreenCreditPage(props: GreenCreditPageProps) {
  const progressToNextTier = (userGreenCredit.points / userGreenCredit.nextTierPoints) * 100;

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <Award className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-foreground">Crédito Verde</h1>
          <p className="text-lg text-muted-foreground mt-2">Seu programa de recompensas por reciclar conosco!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Status Card */}
          <Card className="lg:col-span-1 shadow-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Seu Saldo Atual</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-6xl font-bold">{userGreenCredit.points}</p>
              <p className="text-xl">Pontos</p>
              <p className="mt-4 text-sm text-primary-foreground/80">Nível: <span className="font-semibold">{userGreenCredit.tier}</span></p>
            </CardContent>
          </Card>

          {/* Progress to Next Tier Card */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-primary"/>
                Progresso para o Próximo Nível: <span className="text-primary ml-1">{userGreenCredit.nextTierName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progressToNextTier} className="w-full h-4 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{userGreenCredit.points} / {userGreenCredit.nextTierPoints} Pontos</span>
                <span>Faltam {userGreenCredit.nextTierPoints - userGreenCredit.points} pontos</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Continue reciclando para desbloquear mais benefícios e alcançar novos níveis!</p>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Recompensas Disponíveis</h2>
          {userGreenCredit.rewardsAvailable.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userGreenCredit.rewardsAvailable.map(reward => (
                <Card key={reward.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
                     <CardTitle className="text-lg font-medium text-foreground">{reward.name}</CardTitle>
                     <reward.icon className="h-6 w-6 text-primary" />
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-2xl font-bold text-primary mb-2">{reward.pointsNeeded} <span className="text-sm font-normal text-muted-foreground">Pontos</span></p>
                    <Button className="w-full" disabled={userGreenCredit.points < reward.pointsNeeded}>
                      {userGreenCredit.points >= reward.pointsNeeded ? 'Resgatar Recompensa' : 'Pontos Insuficientes'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <p className="text-muted-foreground">Nenhuma recompensa disponível no momento. Fique atento!</p>
          )}
        </section>

        {/* Recent Activity Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Atividade Recente</h2>
           <Card className="shadow-lg">
            <CardContent className="p-0">
                <ul className="divide-y divide-border">
                {userGreenCredit.recentActivity.map((activity, index) => (
                    <li key={index} className="px-4 py-3 hover:bg-accent/30 transition-colors flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                    <span className={`text-sm font-semibold ${activity.points.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.points}
                    </span>
                    </li>
                ))}
                </ul>
            </CardContent>
           </Card>
        </section>

        <Card className="max-w-3xl mx-auto mt-12 bg-accent/30 p-6 text-center">
            <CardHeader className="p-0">
                <CardTitle className="text-xl text-accent-foreground">Como ganhar mais pontos?</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2">
                <CardDescription className="text-base text-accent-foreground/80 mb-4">
                    Continue utilizando nossos serviços de recolha, participe de campanhas especiais e indique amigos!
                </CardDescription>
                <Button asChild>
                    <Link href="/request-collection">Solicitar Nova Recolha</Link>
                </Button>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
