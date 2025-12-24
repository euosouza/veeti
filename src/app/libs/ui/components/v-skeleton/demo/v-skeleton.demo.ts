import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PlaygroundLayout } from "@core/components/layouts/playground/playground.layout";
import { VSkeletonComponent } from "../v-skeleton";
import { VInput } from "../../v-input/v-input";

@Component({
  selector: "v-skeleton-demo",
  standalone: true,
  imports: [VSkeletonComponent, PlaygroundLayout, CommonModule, FormsModule, VInput],
  templateUrl: "./v-skeleton.demo.html"
})
export class VSkeletonDemoComponent {
  config = {
    title: "Skeleton",
    description: "Um componente de placeholder usado para indicar o carregamento de conteúdo, melhorando a percepção de desempenho da aplicação."
  };

  height = signal<string>("3rem");
  count = signal<number>(1);
  shape = signal<"square" | "circle">("square");

  // Variáveis auxiliares para ngModel, pois signals não podem ser diretamente usados com two-way binding em inputs nativos
  heightInput: string = this.height();
  countInput: number = this.count();
  shapeInput: "square" | "circle" = this.shape();

  readonly codeSnippet = computed(() => {
    const countAttr = this.count() !== 1 ? ` count="${this.count()}"` : "";
    const shapeAttr = this.shape() !== "square" ? ` shape="${this.shape()}"` : "";
    const heightAttr = this.height() !== "1.25rem" ? ` height="${this.height()}"` : "";

    return `<v-skeleton${heightAttr}${countAttr}${shapeAttr}></v-skeleton>`;
  });
}
