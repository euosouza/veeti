import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./core/services/theme/theme.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `
    <div class="bg-background text-foreground w-full min-h-screen flex flex-col items-center justify-center text-base">
      <h1>Bem-vindo ao Veeti!</h1>
      <router-outlet />
    </div>
  `
})
export class AppRoot {
  private readonly themeService = inject(ThemeService);

  constructor() {
    this.themeService.load();
  }
}
