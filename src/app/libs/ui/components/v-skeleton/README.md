# V-Skeleton Component

O componente `v-skeleton` é um componente de carregamento esquelético (skeleton loader) usado para indicar o estado de carregamento de conteúdo em interfaces de usuário. Ele simula a estrutura visual do conteúdo real enquanto os dados estão sendo carregados, proporcionando uma experiência de usuário mais suave e profissional.

## Visão Geral

O `v-skeleton` renderiza um elemento `div` com um efeito de shimmer animado que cria a ilusão de carregamento. O componente é construído usando Angular com sinais reativos e utiliza classes CSS para estilização, suportando temas claro e escuro automaticamente.

## Funcionalidades Principais

- **Animação Shimmer**: Efeito de brilho que se move horizontalmente para simular carregamento
- **Suporte a Temas**: Cores adaptáveis para temas claro e escuro
- **Personalização**: Aceita classes CSS adicionais para customização
- **Performance**: Usa `ChangeDetectionStrategy.OnPush` para otimização
- **Acessibilidade**: Estrutura semântica com atributo `data-slot`

## API

### Propriedades de Entrada (Inputs)

| Propriedade | Tipo         | Padrão | Descrição                                            |
| ----------- | ------------ | ------ | ---------------------------------------------------- |
| `class`     | `ClassValue` | `""`   | Classes CSS adicionais para personalizar o esqueleto |

### Seletores

- **Seletor**: `v-skeleton`
- **Elemento Host**: `<div data-slot="skeleton">`

## Exemplos de Uso

### Uso Básico

```html
<!-- Esqueleto simples -->
<v-skeleton></v-skeleton>
```

### Esqueleto com Altura e Largura Customizadas

```html
<!-- Esqueleto retangular -->
<v-skeleton class="h-4 w-full"></v-skeleton>

<!-- Esqueleto circular (avatar) -->
<v-skeleton class="h-12 w-12 rounded-full"></v-skeleton>

<!-- Esqueleto de texto -->
<v-skeleton class="h-4 w-3/4"></v-skeleton>
<v-skeleton class="h-4 w-1/2"></v-skeleton>
```

### Simulando um Card de Carregamento

```html
<div class="p-4 border rounded-lg">
  <!-- Avatar -->
  <v-skeleton class="h-12 w-12 rounded-full mb-4"></v-skeleton>

  <!-- Título -->
  <v-skeleton class="h-6 w-3/4 mb-2"></v-skeleton>

  <!-- Subtítulo -->
  <v-skeleton class="h-4 w-1/2 mb-4"></v-skeleton>

  <!-- Conteúdo -->
  <v-skeleton class="h-4 w-full mb-1"></v-skeleton>
  <v-skeleton class="h-4 w-full mb-1"></v-skeleton>
  <v-skeleton class="h-4 w-2/3"></v-skeleton>
</div>
```

### Lista de Itens com Esqueletos

```html
<div class="space-y-4">
  <div class="flex items-center space-x-4" *ngFor="let _ of [1,2,3]">
    <v-skeleton class="h-10 w-10 rounded-full"></v-skeleton>
    <div class="flex-1 space-y-2">
      <v-skeleton class="h-4 w-3/4"></v-skeleton>
      <v-skeleton class="h-4 w-1/2"></v-skeleton>
    </div>
  </div>
</div>
```

### Uso em Componentes Angulares

```typescript
import { Component } from "@angular/core";
import { VSkeletonComponent } from "@libs/ui/components/v-skeleton/v-skeleton";

@Component({
  selector: "app-loading-card",
  imports: [VSkeletonComponent],
  template: `
    <div class="card" *ngIf="loading; else content">
      <v-skeleton class="h-48 w-full rounded-t-lg"></v-skeleton>
      <div class="p-4">
        <v-skeleton class="h-6 w-3/4 mb-2"></v-skeleton>
        <v-skeleton class="h-4 w-full mb-1"></v-skeleton>
        <v-skeleton class="h-4 w-2/3"></v-skeleton>
      </div>
    </div>
    <ng-template #content>
      <!-- Conteúdo real -->
    </ng-template>
  `
})
export class LoadingCardComponent {
  loading = true;
}
```

## Estilização e Temas

### Cores do Esqueleto

O componente utiliza variáveis CSS para definir as cores do gradiente shimmer:

- **Tema Claro**:
  - `--skeleton-from`: `var(--color-neutral-100)`
  - `--skeleton-via`: `var(--color-neutral-200)`
  - `--skeleton-to`: `var(--color-neutral-100)`

- **Tema Escuro**:
  - `--skeleton-from`: `var(--color-neutral-900)`
  - `--skeleton-via`: `var(--color-neutral-800)`
  - `--skeleton-to`: `var(--color-neutral-900)`

### Animação

A animação shimmer é definida pela classe `animate-skeleton` com keyframes:

```css
@keyframes skeleton {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.animate-skeleton {
  animation: skeleton 1.5s ease-in-out infinite;
}
```

### Personalização Avançada

Você pode sobrescrever as variáveis CSS para personalizar as cores:

```css
:root {
  --skeleton-from: #your-color;
  --skeleton-via: #your-color;
  --skeleton-to: #your-color;
}
```

Ou usar classes Tailwind customizadas:

```html
<v-skeleton class="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200"></v-skeleton>
```

## Boas Práticas

### Quando Usar

- **Carregamento de Dados**: Quando aguardando resposta de API
- **Transições de Estado**: Entre estados de carregamento e conteúdo
- **Listas e Cards**: Para simular múltiplos itens
- **Imagens e Avatares**: Para placeholders visuais

### Dicas de Performance

- Use apenas quando necessário para evitar overhead desnecessário
- Combine com `*ngIf` para alternar entre skeleton e conteúdo real
- Considere lazy loading para componentes com muitos skeletons

### Acessibilidade

- O componente não contém texto, então não afeta leitores de tela
- Use `aria-label` ou `aria-describedby` no container pai se necessário
- Garanta que o skeleton seja substituído rapidamente pelo conteúdo real

## Implementação Técnica

### Estrutura do Componente

```typescript
@Component({
  selector: "v-skeleton",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "block" },
  template: `<div data-slot="skeleton" [class]="classes()"></div>`
})
export class VSkeletonComponent {
  readonly class = input<ClassValue>("");
  protected readonly classes = computed(() =>
    mergeClasses(this.class(), "bg-gradient-to-r from-skeleton-from via-skeleton-via to-skeleton-to bg-[length:200%_100%] animate-skeleton rounded-md")
  );
}
```

### Dependências

- `@angular/core`: Para funcionalidades básicas do componente
- `@libs/ui/utils/merge-class`: Para mesclagem de classes CSS
- `clsx`: Para manipulação de classes (tipado como `ClassValue`)

## Testes

O componente inclui testes unitários básicos que verificam a criação do componente. Para testes mais avançados, considere testar:

- Aplicação correta de classes CSS
- Comportamento com diferentes inputs
- Renderização em diferentes temas

## Contribuição

Para contribuir com melhorias no componente `v-skeleton`:

1. Siga os padrões de código do projeto
2. Adicione testes para novas funcionalidades
3. Atualize esta documentação conforme necessário
4. Garanta compatibilidade com temas claro e escuro

## Relacionados

- [V-Card Component](../v-card/README.md) - Componente de cartão que pode usar skeletons
- [Theme Service](../../core/services/theme/README.md) - Serviço de gerenciamento de temas
- [Merge Class Utility](../utils/merge-class.ts) - Utilitário para mesclagem de classes
