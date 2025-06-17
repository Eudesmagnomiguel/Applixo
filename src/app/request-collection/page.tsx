
"use client";

import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, ArrowRight, ShoppingBag, CreditCard, CheckCircle, XCircle, Info, CalendarClock, MapPinIcon, User, Phone, Mail, Trash2, NotebookPen, Scale, CalendarIcon, CalendarDays, Clock, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const STEPS = {
  DETAILS: 1,
  PAYMENT: 2,
  REVIEW: 3,
  CONFIRMED: 4,
  CANCELLED: 5,
};

const PRICE_PER_KG = 1300;
const USER_DEFAULT_ADDRESS = "Zango 8000, Viana, Luanda";

const timeSlots = [
  "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00",
];

const wasteTypeOptions = [
  { id: 'plastico', label: 'Plásticos' },
  { id: 'papel', label: 'Papel/Cartão' },
  { id: 'eletronicos', label: 'Eletrônicos' },
  { id: 'vidro', label: 'Vidro' },
  { id: 'outros', label: 'Outros' },
];

const collectionFormSchema = z.object({
  firstName: z.string().min(1, "Primeiro nome é obrigatório"),
  lastName: z.string().min(1, "Último nome é obrigatório"),
  phone: z.string().min(9, "Telefone deve ter pelo menos 9 dígitos").regex(/^\+?244[ -]?(\d[ -]?){9}$|^9[1-59][0-9]([ -]?\d){7}$|^(2\d{2})([ -]?\d){6}$/, "Formato de telefone angolano inválido"),
  email: z.string().email("Email inválido"),
  address: z.string().min(5, "Endereço é obrigatório"),
  collectionDate: z.date({ required_error: "Data da recolha é obrigatória" }),
  collectionTime: z.string().min(1, "Horário da recolha é obrigatório"),
  wasteTypes: z.array(z.string()).min(1, "Selecione ao menos um tipo de resíduo").max(wasteTypeOptions.length),
  wasteQuantityKg: z.coerce.number().min(0.1, "Quantidade deve ser maior que 0 Kg").max(1000, "Quantidade máxima de 1000 Kg"),
  notes: z.string().optional(),
});

type CollectionFormValues = z.infer<typeof collectionFormSchema>;

const initialCollectionDetails: CollectionFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: USER_DEFAULT_ADDRESS,
  collectionDate: new Date(),
  collectionTime: '',
  wasteTypes: [],
  wasteQuantityKg: 1,
  notes: '',
};


export default function RequestCollectionPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.DETAILS);
  const [collectionDetails, setCollectionDetails] = useState<CollectionFormValues>(initialCollectionDetails);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);

  const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: initialCollectionDetails,
  });

  const watchedWasteQuantityKg = watch("wasteQuantityKg", initialCollectionDetails.wasteQuantityKg);

  const collectionCost = useMemo(() => {
    return (watchedWasteQuantityKg || 0) * PRICE_PER_KG;
  }, [watchedWasteQuantityKg]);

  const onSubmitDetails = (data: CollectionFormValues) => {
    setCollectionDetails(data);
    setCurrentStep(STEPS.PAYMENT);
  };

  const handleNextStep = () => {
    if (currentStep === STEPS.PAYMENT && paymentMethod) {
      setCurrentStep(STEPS.REVIEW);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === STEPS.PAYMENT) setCurrentStep(STEPS.DETAILS);
    if (currentStep === STEPS.REVIEW) setCurrentStep(STEPS.PAYMENT);
  };

  const handleConfirm = () => setCurrentStep(STEPS.CONFIRMED);
  const handleCancel = () => setCurrentStep(STEPS.CANCELLED);

  const resetFormAndState = () => {
    setCollectionDetails(initialCollectionDetails);
    setValue('firstName', initialCollectionDetails.firstName);
    setValue('lastName', initialCollectionDetails.lastName);
    setValue('phone', initialCollectionDetails.phone);
    setValue('email', initialCollectionDetails.email);
    setValue('address', initialCollectionDetails.address);
    setValue('collectionDate', initialCollectionDetails.collectionDate);
    setValue('collectionTime', initialCollectionDetails.collectionTime);
    setValue('wasteTypes', initialCollectionDetails.wasteTypes);
    setValue('wasteQuantityKg', initialCollectionDetails.wasteQuantityKg);
    setValue('notes', initialCollectionDetails.notes);

    setPaymentMethod(undefined);
    setCurrentStep(STEPS.DETAILS);
  };


  const getStepTitle = () => {
    switch (currentStep) {
      case STEPS.DETAILS: return "Detalhes da Recolha";
      case STEPS.PAYMENT: return "Método de Pagamento";
      case STEPS.REVIEW: return "Revisar e Confirmar";
      case STEPS.CONFIRMED: return "Recolha Confirmada!";
      case STEPS.CANCELLED: return "Recolha Cancelada";
      default: return "";
    }
  };

  const estimatedTime = collectionDetails.collectionTime ? `Agendado para ${collectionDetails.collectionTime}` : "A definir";

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="bg-secondary/50 border-b">
            <CardTitle className="text-2xl font-bold text-primary flex items-center">
              <ShoppingBag className="mr-3 h-7 w-7" />
              Solicitar Recolha de Resíduos (Plano Comercial)
            </CardTitle>
            <CardDescription>Siga os passos para agendar sua recolha. Precisa de um plano residencial ou personalizado? <Link href="/about-applixo#plans" className="underline text-primary hover:text-primary/80">Consulte nossos planos</Link> ou <Link href="/contact" className="underline text-primary hover:text-primary/80">fale conosco</Link>.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Alert variant="default" className="mb-6 bg-accent/30">
              <Info className="h-5 w-5 text-accent-foreground" />
              <AlertTitle className="text-accent-foreground font-semibold">Atenção: Plano Comercial</AlertTitle>
              <AlertDescription className="text-accent-foreground/80">
                Este formulário é para o nosso Plano Comercial, com preço de {PRICE_PER_KG.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })} por Kg. Para o Plano Residencial ou soluções personalizadas, por favor <Link href="/contact" className="underline">entre em contato</Link>.
              </AlertDescription>
            </Alert>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground">{getStepTitle()}</h3>
              <div className="mt-2 flex space-x-2">
                {[STEPS.DETAILS, STEPS.PAYMENT, STEPS.REVIEW].map(step => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full ${currentStep >= step && currentStep <= STEPS.REVIEW ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
            </div>

            {currentStep === STEPS.DETAILS && (
              <form onSubmit={handleSubmit(onSubmitDetails)} className="space-y-6">
                <h4 className="text-lg font-medium text-foreground border-b pb-2 mb-3">Informações Pessoais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="flex items-center mb-1"><User className="mr-2 h-4 w-4 text-primary" />Primeiro Nome</Label>
                    <Input id="firstName" {...register("firstName")} placeholder="Ex: João" />
                    {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="flex items-center mb-1"><User className="mr-2 h-4 w-4 text-primary" />Último Nome</Label>
                    <Input id="lastName" {...register("lastName")} placeholder="Ex: Silva" />
                    {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center mb-1"><Phone className="mr-2 h-4 w-4 text-primary" />Telefone</Label>
                  <Input id="phone" type="tel" {...register("phone")} placeholder="+244 9XX XXX XXX" />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center mb-1"><Mail className="mr-2 h-4 w-4 text-primary" />Email</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="Ex: joao.silva@email.com" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="address" className="flex items-center mb-1"><MapPinIcon className="mr-2 h-4 w-4 text-primary" />Endereço de Recolha</Label>
                  <Input id="address" {...register("address")} placeholder="Ex: Rua Exemplo, Bairro Azul, Casa 123" />
                  {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
                </div>

                <h4 className="text-lg font-medium text-foreground border-b pb-2 mb-3 pt-4">Agendamento</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="collectionDate" className="flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-primary" />Data da Recolha</Label>
                    <Controller
                        name="collectionDate"
                        control={control}
                        render={({ field }) => (
                            <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                locale={ptBR}
                                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) }
                                />
                            </PopoverContent>
                            </Popover>
                        )}
                        />
                    {errors.collectionDate && <p className="text-sm text-destructive mt-1">{errors.collectionDate.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="collectionTime" className="flex items-center mb-1"><Clock className="mr-2 h-4 w-4 text-primary" />Horário da Recolha</Label>
                    <Controller
                      name="collectionTime"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id="collectionTime">
                            <SelectValue placeholder="Selecione um horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(slot => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.collectionTime && <p className="text-sm text-destructive mt-1">{errors.collectionTime.message}</p>}
                  </div>
                </div>

                <h4 className="text-lg font-medium text-foreground border-b pb-2 mb-3 pt-4">Detalhes dos Resíduos</h4>
                <div>
                    <Label className="flex items-center mb-2"><Trash2 className="mr-2 h-4 w-4 text-primary" />Tipo de Resíduos</Label>
                    <Controller
                        name="wasteTypes"
                        control={control}
                        render={({ field }) => (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {wasteTypeOptions.map((option) => (
                                <Label key={option.id} htmlFor={`wasteType-${option.id}`} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer has-[:checked]:bg-accent has-[:checked]:border-primary">
                                <Checkbox
                                    id={`wasteType-${option.id}`}
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), option.id])
                                        : field.onChange( (field.value || []).filter( (value) => value !== option.id ) );
                                    }}
                                />
                                <span>{option.label}</span>
                                </Label>
                            ))}
                            </div>
                        )}
                        />
                    {errors.wasteTypes && <p className="text-sm text-destructive mt-1">{errors.wasteTypes.message}</p>}
                </div>
                <div>
                  <Label htmlFor="wasteQuantityKg" className="flex items-center mb-1"><Scale className="mr-2 h-4 w-4 text-primary" />Quantidade de Resíduo (Kg)</Label>
                  <Input id="wasteQuantityKg" type="number" step="0.1" {...register("wasteQuantityKg")} placeholder="Ex: 5.5" />
                  {errors.wasteQuantityKg && <p className="text-sm text-destructive mt-1">{errors.wasteQuantityKg.message}</p>}
                </div>
                <div>
                  <Label htmlFor="notes" className="flex items-center mb-1"><NotebookPen className="mr-2 h-4 w-4 text-primary" />Notas Adicionais</Label>
                  <Textarea id="notes" {...register("notes")} placeholder="Ex: Deixar na portaria, resíduos frágeis, etc." />
                  {errors.notes && <p className="text-sm text-destructive mt-1">{errors.notes.message}</p>}
                </div>

                <Button type="submit" className="w-full mt-6">
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {currentStep === STEPS.PAYMENT && (
              <div className="space-y-6">
                 <p className="text-muted-foreground">Escolha como deseja pagar pela recolha.</p>
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
                <div className="mt-4 p-4 bg-accent/50 rounded-md text-center">
                  <p className="text-sm text-accent-foreground">Custo Estimado:</p>
                  <p className="text-2xl font-bold text-primary">{collectionCost.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</p>
                </div>
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
                  <h4 className="text-md font-medium text-foreground border-b pb-1 mb-2">Detalhes Pessoais e Endereço</h4>
                  <ReviewItem icon={<User className="h-5 w-5 text-primary" />} label="Nome Completo" value={`${collectionDetails.firstName} ${collectionDetails.lastName}`} />
                  <ReviewItem icon={<Phone className="h-5 w-5 text-primary" />} label="Telefone" value={collectionDetails.phone} />
                  <ReviewItem icon={<Mail className="h-5 w-5 text-primary" />} label="Email" value={collectionDetails.email} />
                  <ReviewItem icon={<MapPinIcon className="h-5 w-5 text-primary" />} label="Endereço de Recolha" value={collectionDetails.address} />
                  <Separator className="my-2"/>
                  <h4 className="text-md font-medium text-foreground border-b pb-1 mb-2">Agendamento e Resíduos</h4>
                  <ReviewItem icon={<CalendarDays className="h-5 w-5 text-primary" />} label="Data da Recolha" value={collectionDetails.collectionDate ? format(collectionDetails.collectionDate, "PPP", { locale: ptBR }) : 'N/A'} />
                  <ReviewItem icon={<Clock className="h-5 w-5 text-primary" />} label="Horário da Recolha" value={collectionDetails.collectionTime} />
                  <ReviewItem icon={<Trash2 className="h-5 w-5 text-primary" />} label="Tipos de Resíduos" value={collectionDetails.wasteTypes.map(typeId => wasteTypeOptions.find(opt => opt.id === typeId)?.label || typeId).join(', ')} />
                  <ReviewItem icon={<Scale className="h-5 w-5 text-primary" />} label="Quantidade Estimada" value={`${collectionDetails.wasteQuantityKg} Kg`} />
                  {collectionDetails.notes && <ReviewItem icon={<NotebookPen className="h-5 w-5 text-primary" />} label="Notas Adicionais" value={collectionDetails.notes} />}
                  <Separator className="my-2"/>
                  <h4 className="text-md font-medium text-foreground border-b pb-1 mb-2">Pagamento</h4>
                  <ReviewItem icon={<CreditCard className="h-5 w-5 text-primary" />} label="Custo Total Estimado" value={`${collectionCost.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}`} />
                  <ReviewItem icon={<CreditCard className="h-5 w-5 text-primary" />} label="Método de Pagamento" value={paymentMethod === 'pre-pago' ? 'Pré-pago' : 'Pagamento Eletrônico'} />
                </div>
                <div className="mt-4 p-4 bg-accent/50 rounded-md text-sm text-accent-foreground flex items-start gap-2">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0"/>
                    <span>O horário é uma estimativa e pode variar. Você será notificado sobre o status da recolha. O custo final pode variar ligeiramente com base na pesagem oficial.</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="destructive" onClick={handleCancel} className="w-full sm:w-auto">
                      <XCircle className="mr-2 h-4 w-4" /> Cancelar Recolha
                    </Button>
                    <Button onClick={handleConfirm} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="mr-2 h-4 w-4" /> Confirmar Recolha
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {(currentStep === STEPS.CONFIRMED || currentStep === STEPS.CANCELLED) && (
              <StatusScreen
                icon={currentStep === STEPS.CONFIRMED ? <CheckCircle className="h-16 w-16 text-green-500" /> : <XCircle className="h-16 w-16 text-destructive" />}
                title={currentStep === STEPS.CONFIRMED ? "Recolha Confirmada!" : "Recolha Cancelada"}
                message={
                  currentStep === STEPS.CONFIRMED
                  ? `Obrigado! Sua recolha de ${collectionDetails.wasteQuantityKg} Kg foi confirmada para ${collectionDetails.collectionDate ? format(collectionDetails.collectionDate, "PPP", { locale: ptBR }) : ''} às ${collectionDetails.collectionTime}. Horário de chegada estimado: ${estimatedTime}.`
                  : "Sua solicitação de recolha foi cancelada. Você pode solicitar uma nova recolha a qualquer momento."
                }
                backLink={currentStep === STEPS.CONFIRMED ? "/dashboard" : "/request-collection"} // Updated backLink for confirmed
                backLinkText={currentStep === STEPS.CONFIRMED ? "Voltar ao Início" : "Solicitar Nova Recolha"}
                onReset={currentStep === STEPS.CANCELLED ? resetFormAndState : undefined}
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
    <div className="flex flex-col sm:flex-row justify-between sm:items-center py-1">
      <div className="flex items-center text-sm text-muted-foreground mb-1 sm:mb-0">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
      <span className="font-semibold text-foreground text-sm sm:text-right">{value}</span>
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
       {title === "Recolha Confirmada!" && (
        <Button asChild variant="outline" size="lg" className="mt-4 ml-0 sm:ml-4">
          <Link href="/collection-history">Ver Histórico</Link>
        </Button>
      )}
    </div>
  );
}
