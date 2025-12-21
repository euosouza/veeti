import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { mergeClasses } from "@libs/ui/utils/merge-class";
import { ClassValue } from "clsx";

@Component({
  selector: "v-skeleton",
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "block"
  },
  template: `<div data-slot="skeleton" [class]="classes()"></div>`
})
export class VSkeletonComponent {
  readonly class = input<ClassValue>("");

  protected readonly classes = computed(() =>
    mergeClasses(this.class(), "bg-gradient-to-r from-skeleton-from via-skeleton-via to-skeleton-to bg-[length:200%_100%] animate-skeleton  rounded-md")
  );
}
