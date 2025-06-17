
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Keep Label for accessibility, hide visually if needed
import Link from 'next/link';
import { KeyRound, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Tentativa de login!');
  };

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-xl rounded-xl">
          <CardContent className="p-8 sm:p-10 space-y-8">
            <div className="flex flex-col items-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Acessar Sua Conta
              </h1>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Bem-vindo(a) de volta! Faça login para continuar.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                {/* Visually hidden label for accessibility */}
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="h-12 w-full rounded-md border-input bg-background/80 pl-10 pr-3 text-base placeholder:text-muted-foreground/80"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="sr-only">
                  Senha
                </Label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyRound className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="h-12 w-full rounded-md border-input bg-background/80 pl-10 pr-3 text-base placeholder:text-muted-foreground/80"
                        placeholder="Sua senha"
                    />
                </div>
                <div className="mt-2 text-right text-sm">
                  <Link href="#" className="font-medium text-primary hover:text-primary/80">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              >
                <ArrowRight className="mr-2 h-5 w-5 transform rotate-180" /> 
                Entrar 
              </Button>
            </form>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="#" className="font-medium text-primary hover:text-primary/80">
                  Crie uma agora
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

