
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { KeyRound, Mail, ArrowRight, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="20px" height="20px" className="mr-2">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6.02C43.63 36.88 46.98 31.18 46.98 24.55z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6.02c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate successful login by redirecting to dashboard page
    router.push('/dashboard');
  };

  const handleGoogleLogin = () => {
    // Simulate successful Google login by redirecting to dashboard page
    router.push('/dashboard');
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
                    defaultValue="admin@applixo.com"
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
                        defaultValue="applixo123"
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

            <div className="text-xs text-muted-foreground text-center flex items-center justify-center">
              <Info className="h-4 w-4 mr-1.5 text-primary/70" />
              <span>Para fins de demonstração, clique em "Entrar".</span>
            </div>


            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full h-12 text-base font-medium rounded-md flex items-center justify-center border-input hover:bg-accent hover:text-accent-foreground"
              >
                <GoogleIcon />
                Continuar com Google
              </Button>
            </div>

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
