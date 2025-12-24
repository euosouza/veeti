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
            <a routerLink="/v-input-demo" class="text-sm hover:underline">V-Input</a>
            <button (click)="toggleTheme()" class="bg-secondary-500 hover:bg-secondary-600 text-black font-medium px-4 py-2 rounded-md hover:bg-primary/80 transition-colors">
              Toggle Theme
            </button>
          </nav>
        </div>
      </header>
      <main>
        <router-outlet />
      </main>
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
