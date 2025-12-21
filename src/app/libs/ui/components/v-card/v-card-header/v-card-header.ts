import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, QueryList, computed, effect, input } from "@angular/core";
import { generateId } from "@libs/ui/utils/generate-id";

const ALLOWED_SLOTS = ["title", "description"] as const;
type CardHeaderSlot = (typeof ALLOWED_SLOTS)[number];

@Component({
  selector: "v-card-header",
  standalone: true,
  host: {
    "[attr.aria-labelledby]": "ariaLabelledBy()",
    "[attr.aria-describedby]": "ariaDescribedBy()"
  },
  template: `
    <div>
      @if (title()) {
        <p class="font-semibold text-lg text-foreground" [id]="titleId" data-slot="title">
          {{ title() }}
        </p>
      } @else {
        <ng-content select='[data-slot="title"]'></ng-content>
      }

      @if (description()) {
        <p class="text-sm text-neutral-500" [id]="descriptionId" data-slot="description">
          {{ description() }}
        </p>
      } @else {
        <ng-content select='[data-slot="description"]'></ng-content>
      }
    </div>
  `
})
export class VCardHeaderComponent implements AfterContentInit {
  // Inputs (Signals)
  title = input<string | null>(null);
  description = input<string | null>(null);

  // Conteúdo projetado por slot
  @ContentChild("[data-slot='title']", { read: ElementRef }) projectedTitle?: ElementRef<HTMLElement>;
  @ContentChild("[data-slot='description']", { read: ElementRef }) projectedDescription?: ElementRef<HTMLElement>;

  // Todos os slots para validação
  @ContentChildren("[data-slot]", { read: ElementRef })
  private allSlots!: QueryList<ElementRef<HTMLElement>>;

  readonly titleId = generateId("v-card-title");
  readonly descriptionId = generateId("v-card-description");

  // ARIA derivado automaticamente
  readonly ariaLabelledBy = computed(() => (this.title() || this.projectedTitle ? this.titleId : null));
  readonly ariaDescribedBy = computed(() => (this.description() || this.projectedDescription ? this.descriptionId : null));

  constructor() {
    // Validação reativa (DX / Design System)
    effect(() => {
      if (this.title() && this.projectedTitle) {
        console.warn(`[v-card-header] "title" foi fornecido via input e via data-slot="title". O slot será ignorado.`);
      }

      if (this.description() && this.projectedDescription) {
        console.warn(`[v-card-header] "description" foi fornecida via input e via data-slot="description". O slot será ignorado.`);
      }
    });
  }

  ngAfterContentInit() {
    // Validação de slots inválidos
    this.allSlots.forEach((el) => {
      const slot = el.nativeElement.getAttribute("data-slot") as CardHeaderSlot | null;

      if (!slot || !ALLOWED_SLOTS.includes(slot)) {
        console.error(`[v-card-header] data-slot="${slot}" não é suportado. ` + `Slots válidos: ${ALLOWED_SLOTS.join(", ")}`);
      }
    });

    // Validação de conteúdo vazio (A11y)
    if (!this.title() && this.isEmpty(this.projectedTitle)) {
      console.error(`[v-card-header] Nenhum título fornecido (input ou data-slot="title"). Isso pode impactar acessibilidade.`);
    }

    if (!this.description() && this.isEmpty(this.projectedDescription)) {
      console.error(`[v-card-header] Nenhuma descrição fornecida (input ou data-slot="description").`);
    }
  }

  private isEmpty(el?: ElementRef<HTMLElement>): boolean {
    return !el || !el.nativeElement.textContent?.trim();
  }
}
