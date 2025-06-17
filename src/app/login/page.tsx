
"use client"; // Forms typically need client-side interaction

import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { LogIn, KeyRound, Mail } from 'lucide-react';

export default function LoginPage() {
  // Basic handler, can be expanded later
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for login logic
    alert('Tentativa de login!');
  };

  return (
    <AppLayout>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Card className="shadow-2xl">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <KeyRound className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                Acessar Sua Conta
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Bem-vindo(a) de volta! Faça login para continuar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10 h-11 w-full"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="sr-only">Senha</Label>
                   <div className="relative rounded-md shadow-sm">
                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyRound className="h-5 w-5 text-muted-foreground" />
                      </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="pl-10 h-11 w-full"
                      placeholder="Sua senha"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end text-sm">
                  <Link href="#" className="font-medium text-primary hover:text-primary/80">
                    Esqueceu sua senha?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-11 text-base font-semibold">
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col items-center justify-center text-sm py-6">
              <p className="text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/signup" className="font-semibold text-primary hover:text-primary/80">
                  Crie uma agora
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
