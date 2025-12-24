import { Directive, DoCheck, ElementRef, Injector, OnInit, computed, forwardRef, inject, input, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

import { cva, type VariantProps } from "class-variance-authority";

import { ClassValue, mergeClasses } from "@libs/ui/utils/merge-class";

// Definição das variantes de estilo do input usando CVA
const inputVariants = cva(
  // Classes base aplicadas a todos os inputs (borda, fundo, foco, etc.)
  "w-full rounded-md border border-input bg-card-background ring-offset-card-background file:border-0 file:bg-card-background file:font-medium placeholder:text-neutral-300 dark:placeholder:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-11 px-3 text-base"
      },
      isTextarea: {
        true: "min-h-20 py-2"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

// Tipos derivados das configurações do CVA para uso no TypeScript
type InputVariantProps = VariantProps<typeof inputVariants>;
export type InputSize = InputVariantProps["size"];

// Interface que define o formato do estado interno do controle
interface ControlState {
  invalid: boolean;
  touched: boolean;
  dirty: boolean;
}

@Directive({
  // Seletor: aplica a diretiva em <input> e <textarea> que tenham o atributo 'v-input'
  selector: "input[v-input], textarea[v-input]",
  standalone: true,
  providers: [
    {
      // Registra esta classe como um ValueAccessor, permitindo que funcione com formControlName e ngModel
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VInput),
      multi: true
    }
  ],
  host: {
    // Vincula a propriedade 'class' do elemento HTML ao valor computado 'classes()'
    "[class]": "classes()",
    // Ouve o evento de digitação nativo e chama handleInput
    "(input)": "handleInput($event)",
    // Ouve o evento de perda de foco nativo e chama handleBlur
    "(blur)": "handleBlur()"
  }
})
export class VInput implements ControlValueAccessor, OnInit, DoCheck {
  // Injeta a referência ao elemento DOM nativo (<input> ou <textarea>)
  private readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  // Injeta o Injector para buscar dependências de forma dinâmica (lazy)
  private readonly injector = inject(Injector);
  // Variável para armazenar a instância do controle de formulário (FormControl)
  private ngControl: NgControl | null = null;

  // Flag para saber se o elemento é uma textarea (para estilos específicos)
  private readonly isTextarea: boolean;

  // Signal que armazena o estado de validação (reativo)
  private readonly controlState = signal<ControlState>(
    { invalid: false, touched: false, dirty: false },
    // Função de comparação para evitar atualizações desnecessárias do signal
    { equal: (a, b) => a.invalid === b.invalid && a.touched === b.touched && a.dirty === b.dirty }
  );

  // Inputs do componente: classes adicionais e tamanho
  readonly class = input<ClassValue>("");
  readonly size = input<InputSize>("md");

  constructor() {
    // Verifica se a tag do elemento é 'TEXTAREA' durante a construção
    this.isTextarea = this.elementRef.nativeElement.tagName === "TEXTAREA";
  }

  ngOnInit(): void {
    // Obtém o NgControl através do Injector para evitar erros de dependência circular
    this.ngControl = this.injector.get(NgControl, null);
  }

  ngDoCheck(): void {
    // Ciclo de vida executado a cada detecção de mudança
    if (this.ngControl?.control) {
      const { invalid, touched, dirty } = this.ngControl.control;
      // Atualiza o signal com o estado atual do formulário
      this.controlState.set({ invalid: !!invalid, touched, dirty });
    }
  }

  protected readonly classes = computed(() => {
    // Lê o estado atual do signal
    const state = this.controlState();
    // Define se deve mostrar erro: deve estar inválido E (tocado OU modificado)
    const isInvalid = state.invalid && (state.touched || state.dirty);

    // Retorna a string final de classes combinando: variantes base, erro condicional e classes do usuário
    return mergeClasses(inputVariants({ size: this.size(), isTextarea: this.isTextarea }), isInvalid ? "border-red-500 focus-visible:ring-red-500" : "", this.class());
  });

  // ControlValueAccessor methods
  // Funções placeholder inicializadas vazias para evitar erros antes do registro
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    // Método chamado pelo Angular para escrever um valor no input nativo
    this.elementRef.nativeElement.value = value ?? "";
  }

  registerOnChange(fn: (value: string) => void): void {
    // Registra a função que deve ser chamada quando o valor mudar
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    // Registra a função que deve ser chamada quando o input perder o foco
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Habilita ou desabilita o input nativo baseado no estado do formulário
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    // Captura o elemento alvo do evento
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    // Notifica o Angular que o valor mudou
    this.onChange(target.value);
  }

  handleBlur(): void {
    // Notifica o Angular que o campo foi tocado (blur)
    this.onTouched();
  }
}
