import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { mergeClasses } from "@libs/ui/utils/merge-class";
import { cva, type VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";

const skeletonVariants = cva("bg-gradient-to-r from-skeleton-from via-skeleton-via to-skeleton-to bg-[length:200%_100%] animate-skeleton", {
  variants: {
    shape: {
      square: "rounded-md",
      circle: "rounded-full"
    }
  },
  defaultVariants: {
    shape: "square"
  }
});

type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;

@Component({
  selector: "v-skeleton",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()"
  },
  template: `
    @for (item of items(); track $index) {
      <div [style.height]="height()" [style.width]="width()" [class]="elementClasses()"></div>
    }
  `
})
export class VSkeletonComponent {
  readonly class = input<ClassValue>("");
  readonly width = input<string>();
  readonly height = input<string>();
  readonly count = input(1, { transform: (value: unknown) => Number(value) });
  readonly shape = input<SkeletonVariantProps["shape"]>("square");

  protected readonly items = computed(() => Array.from({ length: this.count() }));

  protected readonly hostClasses = computed(() => mergeClasses("flex flex-col gap-2", this.class()));

  protected readonly elementClasses = computed(() => mergeClasses(skeletonVariants({ shape: this.shape() })));
}
