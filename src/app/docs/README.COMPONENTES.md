# 📂 components

Componentes reutilizáveis **somente dentro deste domínio**.  
Devem ser previsíveis, desacoplados e focados exclusivamente em **apresentação e interação**.

---

## 🚀 Padrão de Desenvolvimento para Componentes de UI (`libs/ui`)

Para garantir consistência, testabilidade e uma ótima experiência de desenvolvimento, todos os componentes criados dentro de `apps/libs/ui` **devem obrigatoriamente** seguir as regras abaixo.

### 1. Suporte a Variantes e Tamanhos com `cva`

Todo componente deve ser configurável através de `inputs`. Para gerenciar os estilos dessas variações, o uso da biblioteca `class-variance-authority` é **obrigatório**.

- **`variant`**: Define estilos diferentes (ex: `primary` vs. `secondary`).
- **`size`**: Define o tamanho do componente (ex: `sm`, `md`, `lg`).

**Exemplo de implementação com `cva`:**
```ts
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md", // Classes base
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```
O resultado da função `cva` é então usado dentro do `computed` signal de classes do componente.

### 2. Demo Local Obrigatória

Cada componente **deve** ter seu próprio ambiente de demonstração isolado.

- **Estrutura:** Crie uma pasta `demo` dentro do diretório do seu componente.
  ```
  v-meu-componente/
  ├── demo/
  |   └── v-meu-componente-demo.ts
  ├── v-meu-componente.ts
  └── README.md
  ```
- **Componente de Demo:** O arquivo `v-meu-componente-demo.ts` será um componente standalone responsável por exibir o `v-meu-componente` em todos os seus estados e variações.

### 3. Implementação de Casos de Uso na Demo

O componente de demonstração não é apenas um "hello world". Ele deve servir como uma documentação viva e um playground para testes.

**Requisitos mínimos para a demo:**

- **Todas as Variantes:** Mostrar o componente em cada uma de suas `variants`.
- **Todos os Tamanhos:** Mostrar o componente em cada um de seus `sizes`.
- **Estados:** Simular e exibir todos os estados relevantes (ex: `disabled`, `loading`, `invalid` para um input).
- **Interatividade:** Adicionar controles (ex: botões, checkboxes) que permitam manipular as propriedades do componente em tempo real.

### Workflow Resumido

1.  **Criação:** Crie a estrutura de pastas, incluindo a pasta `demo`.
2.  **Desenvolvimento:** Desenvolva o componente principal e o componente de demo simultaneamente.
3.  **Roteamento:** Adicione uma rota em `app.routes.ts` para carregar o seu componente de demo de forma lazy.
4.  **Teste Visual:** Use a página de demo para validar visualmente todas as features e correções.
5.  **Documentação:** Atualize o `README.md` do componente.

---

## 🎯 Objetivo

- Garantir reutilização
- Facilitar manutenção
- Melhorar performance
- Evitar acoplamento com regras de negócio ou infraestrutura

---

## ✅ Boas Práticas

### 📐 Arquitetura e Responsabilidade

- Um componente deve ter **uma única responsabilidade**
- Preferir componentes **apresentacionais**
- Não acessar APIs diretamente
- Não acessar `Services`, `Facades`, `Store` ou `State` global
- Não conter regras de negócio
- Não conter lógica de orquestração complexa

---

### 🔁 Comunicação

- Receber dados **exclusivamente** via `@Input`
- Emitir ações **exclusivamente** via `@Output`
- Tipar todos os `Inputs` e `Outputs`
- Evitar mutação direta dos dados recebidos
- Preferir `readonly` sempre que possível

---

### 🧱 Estrutura do Componente (Angular 20)

- Criar componentes como **Standalone Components**
- Declarar dependências no `imports` do próprio componente
- Evitar uso de `NgModule`
- Importar apenas o que o componente realmente utiliza

---

### ⚡ Performance

- Utilizar `ChangeDetectionStrategy.OnPush`
- Usar `trackBy` em listas (`@for` ou `*ngFor`)
- Evitar lógica pesada no template
- Preferir `AsyncPipe` para observables
- Evitar subscriptions manuais sempre que possível

---

### 🔌 Subscriptions e Ciclo de Vida

- **Nunca deixar subscriptions ativas**
- Sempre que **não for possível usar `AsyncPipe`**, utilizar:
  - `takeUntilDestroyed()`
- Não usar `Subject` apenas para controle de unsubscribe
- Evitar `ngOnDestroy` manual apenas para cancelar subscriptions

**Exemplo recomendado:**

```ts
import { DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export class MeuComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.service
      .getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        // Sem vazamento de memória!
      });
  }
}
```

---

### 🧩 Template e UX

- [ ] Template simples e legível
- [ ] Uso de `@if`, `@for`, `@switch`
- [ ] Sem lógica complexa no HTML
- [ ] Estados tratados:
  - [ ] Loading
  - [ ] Empty
  - [ ] Error (quando aplicável)
- [ ] Segue o Design System

---

### 🎨 Responsividade e Estilos

A responsividade não é opcional. Todos os componentes devem ser construídos com uma abordagem **Mobile-First**, garantindo uma experiência de usuário consistente em qualquer dispositivo.

- **Mobile-First como Padrão:** Os estilos base do componente devem ser direcionados para as menores telas. Media queries (`sm:`, `md:`, `lg:`, etc.) do TailwindCSS devem ser usadas para adicionar ou modificar estilos para telas maiores.

- **Estilos Encapsulados:** Cada componente é responsável por seus próprios estilos. Evite criar dependências de estilos globais que não sejam gerenciados pelo sistema de Design Tokens (TailwindCSS).

- **Flexibilidade e Layout:** Use classes de layout flexíveis como `flex`, `grid`, `flex-wrap` para permitir que o conteúdo do componente se adapte naturalmente a diferentes larguras de contêiner.

- **Classes CSS sem Conflito:** Assegure-se de que as classes não causem conflitos. A ferramenta `mergeClasses` (que usa `tailwind-merge`) já ajuda a resolver conflitos de classes do Tailwind.

**Exemplo de implementação Mobile-First:**
```html
<!-- 
  - Por padrão, o layout é uma coluna (`flex-col`).
  - Em telas médias (`md:`) e maiores, ele se torna uma linha (`flex-row`).
-->
<div class="flex flex-col md:flex-row gap-4">
  <!-- Itens do Flex -->
</div>
```

---

### ✨ Padrão de Classes para Design System (`libs/ui`)

Todos os componentes dentro de `apps/libs/ui` **devem** seguir um padrão obrigatório para permitir que classes CSS externas sejam aplicadas, garantindo extensibilidade.

**Objetivo:** Permitir que o consumidor de um componente passe classes customizadas que serão mescladas com as classes padrão do componente.

**Implementação Obrigatória:**

1.  **Imports Necessários:**
    ```ts
    import { computed, input } from '@angular/core';
    import { ClassValue, mergeClasses } from '@libs/ui/utils/merge-class';
    ```

2.  **Input e Computed Signal:**
    O componente deve ter um `input` chamado `class` e um `computed` signal que mescla as classes.

    ```ts
    @Component({
      selector: 'v-meu-componente',
      standalone: true,
      imports: [...],
      host: {
        '[class]': 'classes()' // Aplica as classes ao host
      }
    })
    export class MeuComponente {
      // Aceita classes externas
      readonly class = input<ClassValue>("");

      // Mescla as classes padrão com as classes externas
      protected readonly classes = computed(() =>
        mergeClasses(
          'minhas-classes-padrão-e-variantes', // Classes do componente
          this.class() // Classes injetadas pelo usuário
        )
      );
    }
    ```
**Benefícios:**
- **Flexibilidade:** Permite customizações de layout e estilo sem precisar criar novas variantes do componente.
- **Consistência:** Padroniza como todos os componentes do Design System lidam com estilos externos.
- **Manutenibilidade:** Utiliza `tailwind-merge` (via `mergeClasses`) para resolver conflitos de classes do Tailwind CSS de forma inteligente.

---

### 🧪 Testes

- [ ] Teste de criação do componente
- [ ] Teste de renderização com `@Input`
- [ ] Teste de emissão de `@Output`
- [ ] Dependências externas mockadas
- [ ] Testes focam comportamento, não implementação

---

### 📛 Nomenclatura e Organização

- [ ] Nome claro e descritivo
- [ ] Prefixo correto (`app-`, `veeti-`, etc.)
- [ ] Um diretório por componente
- [ ] Arquivos nomeados corretamente

---

### 📚 Documentação

- [ ] Inputs documentados
- [ ] Outputs documentados
- [ ] Exemplo de uso incluído
- [ ] Observações ou restrições registradas

---

### 🧼 Revisão Final

- [ ] Código legível e consistente
- [ ] Sem código morto ou comentado
- [ ] Sem `console.log`
- [ ] Component atende ao checklist por completo

---

## ✅ Checklist – Criação de Componente Angular

### 📌 Planejamento

- [ ] Possui uma única responsabilidade
- [ ] É apresentacional (ou claramente definido como container)
- [ ] Está na pasta correta (`components`)
- [ ] Existe reutilização real

---

### 🧱 Estrutura

- [ ] Standalone Component
- [ ] `ChangeDetectionStrategy.OnPush`
- [ ] Imports mínimos
- [ ] Sem `NgModule`

---

### 🔁 Comunicação

- [ ] Usa apenas `@Input` para entrada de dados
- [ ] Usa apenas `@Output` para eventos
- [ ] Inputs e Outputs tipados
- [ ] Não muta dados recebidos
- [ ] Usa `readonly` quando possível

---

### 🚫 Responsabilidades Indevidas

- [ ] Não acessa APIs
- [ ] Não injeta Services de domínio
- [ ] Não contém regra de negócio
- [ ] Não acessa Store ou State global

---

### ⚡ Performance

- [ ] Usa `OnPush`
- [ ] Usa `trackBy` em listas
- [ ] Evita lógica pesada no template
- [ ] Usa `AsyncPipe` quando possível

---

### 🔌 Subscriptions

- [ ] Não possui subscriptions desnecessárias
- [ ] Usa `AsyncPipe` sempre que possível
- [ ] **Todos os `subscribe()` usam `takeUntilDestroyed()`**
- [ ] Não usa `Subject` apenas para unsubscribe
- [ ] Nenhuma subscription permanece ativa após destroy

---

### 🧩 Template e UX

- [ ] Template simples e legível
- [ ] Uso de `@if`, `@for`, `@switch`
- [ ] Estados tratados (loading, empty, error)
- [ ] Segue o Design System

---

### 🎨 Estilos

- [ ] Estilos encapsulados
- [ ] Sem dependência de CSS global
- [ ] Responsivo

---

### 🧪 Testes

- [ ] Testes unitários criados
- [ ] Inputs testados
- [ ] Outputs testados
- [ ] Dependências mockadas

---

### 📚 Documentação

- [ ] Inputs documentados
- [ ] Outputs documentados
- [ ] Exemplo de uso incluído

---

### 🧼 Revisão Final

- [ ] Código limpo e legível
- [ ] Sem `console.log`
- [ ] Sem código morto
- [ ] Checklist 100% atendido

💡 **Dica**  
Se algum item acima não puder ser marcado, reavalie se o componente realmente deveria existir ou se pertence a outra camada (`containers`, `features`, `pages`).
