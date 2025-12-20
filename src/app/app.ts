import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./core/services/theme/theme.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: "<router-outlet />"
})
export class AppRoot {
  private readonly themeService = inject(ThemeService);

  constructor() {
    this.themeService.load();
  }
}
