import React from 'react';
import MenuLeft from '../MenuLeft';
import { Button } from '../ui/button';
import { MenuSheet } from '../sheet';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
      <aside className="layoutMin hidden lg:block w-[40%] bg-zinc-200 p-16">
        <MenuLeft />
      </aside>

      {/* Conteúdo principal */}
      <main className="layoutMin flex-1 bg-zinc-800 p-16">
        <div className="lg:hidden mb-5">
          <Button className="MenuBlock">
            <MenuSheet />
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
}