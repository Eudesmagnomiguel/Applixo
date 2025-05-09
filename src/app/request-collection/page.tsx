"use client";

import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, CreditCard, CheckCircle, XCircle, Info, CalendarClock, MapPinIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const STEPS = {
  BAGS: 1,
  PAYMENT: 2,
  REVIEW: 3,
  CONFIRMED: 4,
  CANCELLED: 5,
};

const BAG_PRICES = {
  SMALL: { range: [1, 3], price: 1000, label: "1-3 Sacolas" },
  MEDIUM: { range: [4, 7], price: 1800, label: "4-7 Sacolas" },
  LARGE: { range: [8, 10], price: 2000, label: "8-10 Sacolas" },
};

const USER_ADDRESS = "Zango 8000, Viana, Luanda"; // Hardcoded user address

export default function RequestCollectionPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.BAGS);
  const [bagQuantity, setBagQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);

  const collectionCost = useMemo(() => {
    if (bagQuantity >= BAG_PRICES.LARGE.range[0]) return BAG_PRICES.LARGE.price;
    if (bagQuantity >= BAG_PRICES.MEDIUM.range[0]) return BAG_PRICES.MEDIUM.price;
    if (bagQuantity >= BAG_PRICES.SMALL.range[0]) return BAG_PRICES.SMALL.price;
    return 0;
  }, [bagQuantity]);

  const handleNextStep = () => {
    if (currentStep === STEPS.BAGS && bagQuantity > 0) {
      setCurrentStep(STEPS.PAYMENT);
    } else if (currentStep === STEPS.PAYMENT && paymentMethod) {
      setCurrentStep(STEPS.REVIEW);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === STEPS.PAYMENT) setCurrentStep(STEPS.BAGS);
    if (currentStep === STEPS.REVIEW) setCurrentStep(STEPS.PAYMENT);
  };

  const handleConfirm = () => setCurrentStep(STEPS.CONFIRMED);
  const handleCancel = () => setCurrentStep(STEPS.CANCELLED);

  const getStepTitle = () => {
    switch (currentStep) {
      case STEPS.BAGS: return "Quantidade de Sacolas";
      case STEPS.PAYMENT: return "Método de Pagamento";
      case STEPS.REVIEW: return "Revisar e Confirmar";
      case STEPS.CONFIRMED: return "Coleta Confirmada!";
      case STEPS.CANCELLED: return "Coleta Cancelada";
      default: return "";
    }
  };
  
  const estimatedTime = "Dentro de 2 horas"; // Placeholder

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="bg-secondary/50 border-b">
            <CardTitle className="text-2xl font-bold text-primary flex items-center">
              <ShoppingBag className="mr-3 h-7 w-7" />
              Solicitar Coleta de Resíduos
            </CardTitle>
            <CardDescription>Siga os passos para agendar sua coleta.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground">{getStepTitle()}</h3>
              {/* Progress Bar (simple version) */}
              <div className="mt-2 flex space-x-2">
                {[STEPS.BAGS, STEPS.PAYMENT, STEPS.REVIEW].map(step => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full ${currentStep >= step && currentStep <= STEPS.REVIEW ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
            </div>

            {currentStep === STEPS.BAGS && (
              <div className="space-y-6">
                <p className="text-muted-foreground">Selecione a quantidade de sacolas para coleta (máximo 10).</p>
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{bagQuantity}</span>
                  <span className="text-muted-foreground"> Sacola(s)</span>
                </div>
                <Slider
                  defaultValue={[1]}
                  min={1}
                  max={10}
                  step={1}
                  value={[bagQuantity]}
                  onValueChange={(value) => setBagQuantity(value[0])}
                  aria-label="Quantidade de sacolas"
                />
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground text-center">
                  <span>{BAG_PRICES.SMALL.label}</span>
                  <span>{BAG_PRICES.MEDIUM.label}</span>
                  <span>{BAG_PRICES.LARGE.label}</span>
                </div>
                <div className="mt-4 p-4 bg-accent/50 rounded-md text-center">
                  <p className="text-sm text-accent-foreground">Custo Estimado:</p>
                  <p className="text-2xl font-bold text-primary">{collectionCost} KZ</p>
                </div>
                <Button onClick={handleNextStep} className="w-full mt-6" disabled={bagQuantity === 0}>
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {currentStep === STEPS.PAYMENT && (
              <div className="space-y-6">
                 <p className="text-muted-foreground">Escolha como deseja pagar pela coleta.</p>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                  <Label htmlFor="pre-pago" className="flex items-center space-x-2 border p-4 rounded-md hover:bg-accent cursor-pointer has-[:checked]:bg-accent has-[:checked]:border-primary">
                    <RadioGroupItem value="pre-pago" id="pre-pago" />
                    <span>Pré-pago (Pagamento antecipado)</span>
                  </Label>
                  <Label htmlFor="eletronico" className="flex items-center space-x-2 border p-4 rounded-md hover:bg-accent cursor-pointer has-[:checked]:bg-accent has-[:checked]:border-primary">
                    <RadioGroupItem value="eletronico" id="eletronico" />
                    <span>Pagamento Eletrônico (Ex: Multicaixa Express)</span>
                  </Label>
                </RadioGroup>
                 <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                  </Button>
                  <Button onClick={handleNextStep} disabled={!paymentMethod}>
                    Próximo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === STEPS.REVIEW && (
              <div className="space-y-6">
                <p className="text-muted-foreground">Por favor, revise os detalhes da sua solicitação.</p>
                <div className="space-y-3 p-4 border rounded-md bg-background">
                  <ReviewItem icon={<ShoppingBag className="h-5 w-5 text-primary" />} label="Quantidade de Sacolas" value={`${bagQuantity} Sacola(s)`} />
                  <ReviewItem icon={<CreditCard className="h-5 w-5 text-primary" />} label="Custo Total" value={`${collectionCost} KZ`} />
                  <ReviewItem icon={<CreditCard className="h-5 w-5 text-primary" />} label="Método de Pagamento" value={paymentMethod === 'pre-pago' ? 'Pré-pago' : 'Pagamento Eletrônico'} />
                  <Separator />
                  <ReviewItem icon={<MapPinIcon className="h-5 w-5 text-primary" />} label="Endereço de Coleta" value={USER_ADDRESS} />
                  <ReviewItem icon={<CalendarClock className="h-5 w-5 text-primary" />} label="Horário Estimado" value={estimatedTime} />
                </div>
                <div className="mt-4 p-4 bg-accent/50 rounded-md text-sm text-accent-foreground flex items-start gap-2">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0"/>
                    <span>O horário é uma estimativa e pode variar. Você será notificado sobre o status da coleta.</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="destructive" onClick={handleCancel} className="w-full sm:w-auto">
                      <XCircle className="mr-2 h-4 w-4" /> Cancelar Coleta
                    </Button>
                    <Button onClick={handleConfirm} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="mr-2 h-4 w-4" /> Confirmar Coleta
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === STEPS.CONFIRMED && (
              <StatusScreen
                icon={<CheckCircle className="h-16 w-16 text-green-500" />}
                title="Coleta Confirmada!"
                message={`Obrigado! Sua coleta de ${bagQuantity} sacola(s) foi confirmada. Estimativa de chegada: ${estimatedTime}. Estamos a caminho!`}
                backLink="/"
                backLinkText="Voltar ao Início"
              />
            )}

            {currentStep === STEPS.CANCELLED && (
              <StatusScreen
                icon={<XCircle className="h-16 w-16 text-destructive" />}
                title="Coleta Cancelada"
                message="Sua solicitação de coleta foi cancelada. Você pode solicitar uma nova coleta a qualquer momento."
                backLink="/request-collection"
                backLinkText="Solicitar Nova Coleta"
                onReset={() => {
                  setCurrentStep(STEPS.BAGS);
                  setBagQuantity(1);
                  setPaymentMethod(undefined);
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

type ReviewItemProps = { icon: React.ReactNode; label: string; value: string; };
function ReviewItem({ icon, label, value }: ReviewItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center text-sm text-muted-foreground">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

type StatusScreenProps = {
  icon: React.ReactNode;
  title: string;
  message: string;
  backLink: string;
  backLinkText: string;
  onReset?: () => void;
};
function StatusScreen({ icon, title, message, backLink, backLinkText, onReset }: StatusScreenProps) {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">{icon}</div>
      <h2 className="text-3xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground text-lg">{message}</p>
      {onReset ? (
         <Button onClick={onReset} size="lg" className="mt-6">
           {backLinkText}
         </Button>
      ) : (
        <Button asChild size="lg" className="mt-6">
          <Link href={backLink}>{backLinkText}</Link>
        </Button>
      )}
    </div>
  );
}

