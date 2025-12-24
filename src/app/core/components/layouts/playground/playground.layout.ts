import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, signal } from "@angular/core";

export interface PlaygroundConfig {
  title: string;
  description?: string;
}

@Component({
  selector: "app-playground",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./playground.layout.html"
})
export class PlaygroundLayout {
  readonly config = input.required<PlaygroundConfig>();
  readonly codeSnippet = input.required<string>();

  protected readonly copied = signal(false);

  checkerboard =
    "background-color: #1c2630;background-image:linear-gradient(45deg, #232d38 25%, transparent 25%, transparent 75%, #232d38 75%, #232d38),linear-gradient(45deg, #232d38 25%, transparent 25%, transparent 75%, #232d38 75%, #232d38);background-size: 20px 20px;background-position: 0 0, 10px 10px;";

  stylesCanvas =
    "background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255, 255, 255, 0.03) 1px,transparent 1px);background-size: 25px 25px;";

  public onClickCopy() {
    navigator.clipboard.writeText(this.codeSnippet()).then(() => {
      alert("Conteúdo copiado para a área de transferência!");
    });
  }
}
