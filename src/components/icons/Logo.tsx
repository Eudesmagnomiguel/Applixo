import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      aria-labelledby="logoTitle logoDesc"
      {...props}
    >
      <title id="logoTitle">APPLIXO Logo</title>
      <desc id="logoDesc">Text logo for APPLIXO application.</desc>
      <text
        x="10"
        y="35"
        fontFamily="var(--font-roboto), Arial, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="currentColor"
      >
        APPLIXO
      </text>
    </svg>
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
