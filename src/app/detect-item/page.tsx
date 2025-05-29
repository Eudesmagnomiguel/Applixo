
"use client";

import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState, ChangeEvent, useRef } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, XCircle, Loader2, Info } from 'lucide-react';
import { detectRecyclableItem, DetectRecyclableItemOutput } from '@/ai/flows/detect-recyclable-item-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DetectItemPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectRecyclableItemOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setDetectionResult(null); // Reset previous result
        setError(null); // Reset previous error
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetectItem = async () => {
    if (!imageFile || !imagePreview) return;

    setIsLoading(true);
    setError(null);
    setDetectionResult(null);

    try {
      const result = await detectRecyclableItem({ photoDataUri: imagePreview });
      setDetectionResult(result);
    } catch (err) {
      console.error("Detection error:", err);
      setError("Falha ao detectar o item. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <Camera className="mx-auto h-12 w-12 text-primary mb-3" />
          <h1 className="text-3xl font-bold text-foreground">Detectar Item Reciclável</h1>
          <p className="text-md text-muted-foreground mt-1">
            Envie uma foto do item para saber como reciclá-lo corretamente.
          </p>
        </div>

        <Card className="max-w-lg mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Upload className="mr-2 h-5 w-5 text-primary" />
              Carregar Imagem do Item
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <Image src={imagePreview} alt="Pré-visualização do item" width={400} height={300} className="object-contain h-full w-full" />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <Image 
                    src="https://placehold.co/400x300.png?text=Selecione+uma+imagem" 
                    alt="Placeholder para imagem" 
                    width={400} 
                    height={300} 
                    className="object-contain opacity-50"
                    data-ai-hint="placeholder image" 
                  />
                  <p className="mt-2 text-sm">A pré-visualização aparecerá aqui.</p>
                </div>
              )}
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            <Button onClick={triggerFileInput} variant="outline" className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              {imageFile ? `Trocar Imagem: ${imageFile.name.substring(0,20)}...` : "Selecionar Imagem"}
            </Button>

            <Button onClick={handleDetectItem} disabled={!imageFile || isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Info className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Detectando..." : "Analisar Item"}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="max-w-lg mx-auto mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {detectionResult && (
          <Card className="max-w-lg mx-auto mt-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Resultado da Detecção</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Item Detectado:</p>
                <p className="text-lg font-semibold text-foreground">{detectionResult.itemName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categoria:</p>
                <p className="text-md text-foreground">{detectionResult.itemCategory}</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium text-muted-foreground mr-2">Reciclável:</p>
                {detectionResult.isRecyclable ? (
                  <span className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                    <CheckCircle className="mr-1 h-5 w-5" /> Sim
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                    <XCircle className="mr-1 h-5 w-5" /> Não/Incerto
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conselho para Reciclagem:</p>
                <p className="text-md text-foreground bg-accent/30 p-3 rounded-md">{detectionResult.recyclingAdvice}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
