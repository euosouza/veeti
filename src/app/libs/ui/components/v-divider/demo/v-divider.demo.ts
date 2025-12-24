import { Component, computed } from "@angular/core";

import { PlaygroundLayout } from "@core/components/layouts/playground/playground.layout";

@Component({
  selector: "v-divider-demo",
  standalone: true,
  imports: [VDividerDemoComponent, PlaygroundLayout],
  templateUrl: "./v-divider.demo.html"
})
export class VDividerDemoComponent {
  readonly codeSnippet = computed(() => {
    return `Código aqui`;
  });
}
