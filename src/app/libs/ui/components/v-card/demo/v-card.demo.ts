import { Component, computed } from "@angular/core";

import { PlaygroundLayout } from "@core/components/layouts/playground/playground.layout";
import { VCardComponent } from "../v-card";

@Component({
  selector: "v-card-demo",
  standalone: true,
  imports: [VCardComponent, PlaygroundLayout],
  templateUrl: "./v-card.demo.html"
})
export class VCardDemoComponent {
  readonly codeSnippet = computed(() => {
    return `Código aqui`;
  });
}
