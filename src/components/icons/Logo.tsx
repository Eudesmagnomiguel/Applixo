import type { HTMLAttributes } from 'react';
import { Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  /** The desired width and height of the circular logo container in pixels. */
  containerSize?: number;
}

export function Logo({ containerSize = 30, className, ...props }: LogoProps) {
  // Calculate icon size to fit within the container with some padding
  // Aim for icon to be about 70-75% of container size
  const iconSize = Math.round(containerSize * 0.70);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center bg-primary shrink-0", // Added shrink-0
        className
      )}
      style={{ width: containerSize, height: containerSize }}
      aria-label="APPLIXO Logo"
      {...props}
    >
      <Recycle color="hsl(var(--primary-foreground))" size={iconSize} strokeWidth={2.5} />
    </div>
  );
}

export function AppLixoLogoText() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-medium text-sidebar-foreground">APPLIXO</h2>
      <p className="text-xs text-sidebar-foreground/80">Ambienta, Puro e Protegido</p>
    </div>
  );
}
