
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Trash2, FileText, Archive, Wine, Cpu, BatteryCharging, Info } from 'lucide-react';

type RecyclableMaterial = {
  id: string;
  name: string;
  description: string;
  examples: string[];
  icon: React.ElementType;
  imageHint: string;
  bgColorClass: string;
  textColorClass: string;
};

const materials: RecyclableMaterial[] = [
  {
    id: 'plastics',
    name: 'Plásticos',
    description: 'Recipientes, embalagens, tampas, garrafas PET, potes de alimentos, sacolas, isopor e outros produtos plásticos.',
    examples: ['Garrafas PET', 'Embalagens de shampoo', 'Copos descartáveis', 'Tampinhas', 'Isopor'],
    icon: Trash2,
    imageHint: 'plastic bottles containers',
    bgColorClass: 'bg-blue-100 dark:bg-blue-900',
    textColorClass: 'text-blue-700 dark:text-blue-300',
  },
  {
    id: 'paper',
    name: 'Papel',
    description: 'Folhas de caderno, jornais, revistas, papel de escritório, envelopes, caixas de papelão finas e cartolinas.',
    examples: ['Jornais', 'Revistas', 'Folhas A4', 'Envelopes', 'Caixas de cereal (desmontadas)'],
    icon: FileText,
    imageHint: 'newspapers magazines paper',
    bgColorClass: 'bg-yellow-100 dark:bg-yellow-900',
    textColorClass: 'text-yellow-700 dark:text-yellow-300',
  },
  {
    id: 'cardboard',
    name: 'Cartão',
    description: 'Caixas de papelão grossas (desmontadas), embalagens de produtos, tubos de papelão e outros itens de cartão.',
    examples: ['Caixas de transporte', 'Embalagens de eletrônicos', 'Rolos de papel toalha', 'Caixas de pizza (limpas)'],
    icon: Archive,
    imageHint: 'cardboard boxes packaging',
    bgColorClass: 'bg-orange-100 dark:bg-orange-900',
    textColorClass: 'text-orange-700 dark:text-orange-300',
  },
  {
    id: 'glass',
    name: 'Vidros',
    description: 'Garrafas de bebidas, frascos de alimentos, potes de conserva e outros recipientes de vidro. Não incluir lâmpadas ou espelhos.',
    examples: ['Garrafas de refrigerante', 'Potes de geleia', 'Frascos de perfume', 'Copos de vidro (quebrados com cuidado)'],
    icon: Wine,
    imageHint: 'glass bottles jars',
    bgColorClass: 'bg-green-100 dark:bg-green-900',
    textColorClass: 'text-green-700 dark:text-green-300',
  },
  {
    id: 'electronics',
    name: 'Lixo Eletrônico',
    description: 'Baterias, pilhas, celulares antigos, placas de circuito, cabos, carregadores e pequenos eletrodomésticos.',
    examples: ['Pilhas', 'Baterias de celular', 'Fones de ouvido quebrados', 'Carregadores antigos'],
    icon: Cpu,
    imageHint: 'electronic waste batteries',
    bgColorClass: 'bg-gray-100 dark:bg-gray-700',
    textColorClass: 'text-gray-700 dark:text-gray-300',
  },
];

function RecyclingInfoCard({ material }: { material: RecyclableMaterial }) {
  return (
    <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${material.bgColorClass}`}>
      <CardHeader className="flex flex-row items-center gap-4 p-4 border-b border-black/10 dark:border-white/10">
        <material.icon className={`h-10 w-10 ${material.textColorClass}`} />
        <div>
          <CardTitle className={`text-2xl font-semibold ${material.textColorClass}`}>{material.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <Image
          src={`https://picsum.photos/seed/${material.id}/600/300`}
          alt={`Exemplo de ${material.name} reciclável`}
          width={600}
          height={300}
          className="mb-4 rounded-md object-cover w-full h-48"
          data-ai-hint={material.imageHint}
        />
        <CardDescription className={`text-sm mb-3 ${material.textColorClass}/80`}>{material.description}</CardDescription>
        <h4 className={`font-semibold mb-1 ${material.textColorClass}`}>Exemplos:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {material.examples.map((example) => (
            <li key={example} className={`${material.textColorClass}/90`}>{example}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

type RecyclingInfoPageProps = {
  params?: Record<string, string | string[] | undefined>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function RecyclingInfoPage(props: RecyclingInfoPageProps) {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Guia de Materiais Recicláveis</h1>
          <p className="text-lg text-muted-foreground">
            Aprenda a identificar e separar corretamente os resíduos para reciclagem.
          </p>
        </div>

        <Card className="mb-8 bg-accent/50 p-6 shadow-md">
          <div className="flex items-start gap-4">
            <Info className="h-8 w-8 text-accent-foreground mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-accent-foreground">Dica Importante!</h3>
              <p className="text-accent-foreground/80">
                Lave as embalagens para remover restos de alimentos e desmonte caixas para otimizar o espaço. Isso facilita o processo de reciclagem!
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <RecyclingInfoCard key={material.id} material={material} />
          ))}
        </div>

         <Card className="mt-12 bg-secondary/20 p-6 md:p-8 text-center shadow-lg">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl md:text-3xl font-bold text-secondary-foreground">Tem Dúvidas?</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-base md:text-lg text-secondary-foreground/80 mb-6">
                    Se não tem certeza se um material é reciclável ou como prepará-lo, visite nossa seção de Perguntas Frequentes ou entre em contato.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/faq" className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Ver FAQs
                    </a>
                    <a href="/contact" className="px-6 py-3 bg-transparent border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-colors">
                        Fale Conosco
                    </a>
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
