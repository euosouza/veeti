import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ThemeService } from "./core/services/theme/theme.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="bg-background text-foreground min-h-svh w-full">
      <header class="p-4 border-b border-border">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold">Playground Veeti</h1>
          <nav class="flex items-center gap-4">
            <button (click)="toggleTheme()" class="bg-secondary-500 hover:bg-secondary-600 text-white font-medium px-4 py-2 rounded-md hover:bg-primary/80 transition-colors">
              Toggle Theme
            </button>
          </nav>
        </div>
      </header>
      <div class="container mx-auto flex flex-row">
        <aside class="w-64 p-4 border-r border-border">
          <h2 class="font-bold mb-2 text-lg">Componentes</h2>
          <nav class="flex flex-col gap-2">
            <a routerLink="/v-input-demo" routerLinkActive="text-primary font-semibold" class="text-sm hover:underline">Input</a>
            <a routerLink="/v-card-demo" routerLinkActive="text-primary font-semibold" class="text-sm hover:underline">Card</a>
            <a routerLink="/v-divider-demo" routerLinkActive="text-primary font-semibold" class="text-sm hover:underline">Divider</a>
            <a routerLink="/v-skeleton-demo" routerLinkActive="text-primary font-semibold" class="text-sm hover:underline">Skeleton</a>
          </nav>
        </aside>

        <main class="flex-1 p-4">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class AppRoot {
  private readonly themeService = inject(ThemeService);

  constructor() {
    this.themeService.load();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
