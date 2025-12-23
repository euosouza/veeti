import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { VCardComponent } from "@libs/ui/components/v-card/v-card";
import { ThemeService } from "./core/services/theme/theme.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, VCardComponent],
  template: `
    <main class="grow p-8 bg-background text-foreground h-svh flex flex-col justify-center items-center">
      <section class="w-full">
        <div class="container mx-auto">
          <div class="flex justify-between items-center gap-4 mb-8">
            <h2 class="text-2xl font-bold text-center">Component Playground</h2>
            <button
              (click)="toggleTheme()"
              class="bg-secondary-500 text-black hover:bg-secondary-600 cursor-pointer font-medium px-4 py-2 rounded-md hover:bg-primary/80 transition-colors"
            >
              Toggle Theme
            </button>
          </div>

          <v-card class="min-h-100">
            <p class="text-center text-neutral-800">Add components here for testing and development.</p>

            <!-- Add here component -->
          </v-card>
        </div>
      </section>
      <router-outlet />
    </main>
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
