import { CommonModule, JsonPipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputSize, VInput } from "@libs/ui/components/v-input/v-input";
import { PlaygroundComponent } from "@core/components/layouts/playground/playground.layout";

@Component({
  selector: "v-input-demo",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, VInput, JsonPipe, CommonModule, PlaygroundComponent],
  templateUrl: "./v-input-demo.html"
})
export class VInputDemoComponent {
  readonly placeholder = signal("Digite algo...");
  size = signal<InputSize>("md");
  readonly isTextarea = signal(false);
  readonly isDisabled = signal(false);
  readonly isInvalid = signal(false);

  readonly codeSnippet = computed(() => {
    const tag = this.isTextarea() ? "textarea" : "input";
    const typeAttr = !this.isTextarea() ? " type='text'" : "";
    const sizeAttr = this.size() !== "md" ? ` size="${this.size()}"` : "";
    const disabledAttr = this.isDisabled() ? " disabled" : "";
    const placeholderAttr = this.placeholder() ? ` placeholder="${this.placeholder()}"` : "";

    return `<${tag} v-input${typeAttr}${placeholderAttr}${sizeAttr}${disabledAttr}${this.isTextarea() ? "></textarea>" : " />"}`;
  });

  checkerboard =
    "background-color: #1c2630;background-image:linear-gradient(45deg, #232d38 25%, transparent 25%, transparent 75%, #232d38 75%, #232d38),linear-gradient(45deg, #232d38 25%, transparent 25%, transparent 75%, #232d38 75%, #232d38);background-size: 20px 20px;background-position: 0 0, 10px 10px;";

  stylesCanvas =
    "background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255, 255, 255, 0.03) 1px,transparent 1px);background-size: 25px 25px;";

  controlPlayground = new FormControl("");

  public onClickCopy() {
    navigator.clipboard.writeText(this.codeSnippet()).then(() => {
      alert("Conteúdo copiado para a área de transferência!");
    });
  }

  // Real World Example Form
  loginForm = new FormGroup({
    name: new FormControl("", { nonNullable: true }),
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] })
  });

  onSubmit() {
    console.log(this.loginForm.value);
  }

  //Propriedades
  resetPlayground() {
    this.placeholder.set("");
    this.size.set("md");
    this.isTextarea.set(false);
    this.isDisabled.set(false);
    this.isInvalid.set(false);
  }

  toggleDisabled(disabled: boolean) {
    this.isDisabled.set(disabled);
    if (disabled) {
      this.controlPlayground.disable();
    } else {
      this.controlPlayground.enable();
    }
  }

  toggleInvalid(invalid: boolean) {
    this.isInvalid.set(invalid);
    if (invalid) {
      this.controlPlayground.setErrors({ custom: true });
      this.controlPlayground.markAsTouched();
      this.controlPlayground.markAsDirty();
    } else {
      this.controlPlayground.setErrors(null);
    }
  }
}
