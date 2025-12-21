import { Component, computed, input } from "@angular/core";
import { mergeClasses } from "@libs/ui/utils/merge-class";

const spacing = {
  sm: "my-2",
  md: "my-3",
  lg: "my-4",
  default: "my-4"
} as const;

@Component({
  selector: "v-divider",
  imports: [],
  template: ``,
  host: {
    "[class]": "classes()",
    "[attr.role]": `'separator'`,
    "[attr.aria-orientation]": "orientation()"
  }
})
export class VDividerComponent {
  class = input<string>("");
  readonly orientation = input<"horizontal" | "vertical">("horizontal");
  readonly spacing = input<"default" | "sm" | "md" | "lg">("default");

  classesOrientation = computed(() => (this.orientation() === "horizontal" ? "h-px w-full" : "w-px h-full inline-block"));
  classesSpacing = computed(() => spacing[this.spacing()]);

  classes = computed(() => {
    return mergeClasses(this.class(), "bg-card-border", this.classesOrientation(), this.classesSpacing());
  });
}
