"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Recycle, Info, User, Bell, History, FileText, Award, LogOut, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo, AppLixoLogoText } from '@/components/icons/Logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavLinkItem {
  href: string;
  icon: React.ElementType;
  label: string;
  isMain?: boolean;
  subItems?: NavLinkItem[];
}

const navLinks: NavLinkItem[] = [
  { href: '/', icon: Home, label: 'Início', isMain: true },
  { href: '/request-collection', icon: ShoppingBag, label: 'Solicitar Coleta', isMain: true },
  { href: '/recycling-info', icon: Recycle, label: 'Info Reciclagem', isMain: true },
  {
    href: '/profile', icon: User, label: 'Perfil', subItems: [
      { href: '/profile', icon: User, label: 'Minhas Informações' },
      { href: '/collection-history', icon: History, label: 'Histórico de Coletas' },
      { href: '/notifications', icon: Bell, label: 'Notificações' },
      { href: '/green-credit', icon: Award, label: 'Crédito Verde' },
    ]
  },
  {
    href: '#', icon: Settings, label: 'Mais', subItems: [
      { href: '/faq', icon: Info, label: 'Perguntas Frequentes' },
      { href: '/legal', icon: FileText, label: 'Informações Legais' },
    ]
  },
];

type NavLinksProps = {
  isMobile?: boolean;
  onLinkClick?: () => void;
};

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  const renderLink = (item: NavLinkItem, isSubItem: boolean = false) => (
    <Button
      key={item.href}
      asChild
      variant={pathname === item.href ? 'secondary' : 'ghost'}
      className={cn(
        "w-full justify-start text-sm",
        isMobile ? "text-base py-3" : "h-10",
        isSubItem && (isMobile ? "pl-12" : "pl-10"),
        pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90" : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
      onClick={onLinkClick}
    >
      <Link href={item.href}>
        <item.icon className={cn("mr-3 h-5 w-5", isMobile ? "h-6 w-6" : "")} />
        {item.label}
      </Link>
    </Button>
  );
  
  return (
    <div className={cn("flex flex-col gap-1 px-2", isMobile ? "gap-2 px-4" : "")}>
      {navLinks.map((item) =>
        item.subItems ? (
          <Accordion type="single" collapsible className="w-full" key={item.label} defaultValue={item.subItems.some(sub => pathname === sub.href) || pathname === item.href ? item.label : undefined}>
            <AccordionItem value={item.label} className="border-none">
              <AccordionTrigger 
                className={cn(
                  "py-0 hover:no-underline rounded-md text-sm", 
                  isMobile ? "text-base py-3" : "h-10",
                  (pathname.startsWith(item.href) && item.href !== '#') || item.subItems.some(sub => pathname === sub.href) ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90" : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  " [&[data-state=open]>svg]:text-sidebar-accent-foreground"
                )}
              >
                <div className={cn("flex items-center w-full justify-start pl-3", isMobile ? "" : "")}>
                  <item.icon className={cn("mr-3 h-5 w-5", isMobile ? "h-6 w-6" : "")} />
                  {item.label}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-0 pl-4">
                <div className="flex flex-col gap-1">
                  {item.subItems.map(subItem => renderLink(subItem, true))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          renderLink(item)
        )
      )}
      {!isMobile && (
        <Button
          variant="ghost"
          className="w-full justify-start text-sm h-10 mt-auto hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          onClick={onLinkClick}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </Button>
      )}
    </div>
  );
}


export function Sidebar() {
  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground shadow-lg">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Logo className="h-8 w-auto" />
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <NavLinks />
      </ScrollArea>
       <div className="mt-auto p-4 border-t border-sidebar-border">
        <AppLixoLogoText />
      </div>
    </aside>
  );
}
