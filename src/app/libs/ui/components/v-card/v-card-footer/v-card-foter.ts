import { Component, computed, input } from "@angular/core";
import { mergeClasses } from "@libs/ui/utils/merge-class";

@Component({
  selector: "v-card-footer ",
  imports: [],
  host: { "[class]": "classes()" },
  template: ` <ng-content></ng-content> `
})
export class VCardFooterComponent {
  class = input<string>("");
  hasBorder = input<boolean>(false);

  classBorder = computed(() => {
    return this.hasBorder() ? "border-t border-card-border pt-4 " : "";
  });

  classes = computed(() => {
    return mergeClasses(this.class(), "w-full mt-4", this.classBorder());
  });
}
