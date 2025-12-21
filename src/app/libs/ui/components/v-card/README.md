# Documentação do Componente v-card

## Visão Geral

O componente `v-card` é um componente de interface de usuário (UI) do Angular projetado para criar cartões flexíveis e acessíveis. Ele serve como um contêiner para conteúdo estruturado, utilizando sub-componentes para organizar seções como cabeçalho, conteúdo e rodapé. O componente é construído com Angular Signals para reatividade e segue princípios de design system, incluindo acessibilidade (A11y) e validação de entrada.

O `v-card` é ideal para exibir informações em um formato de cartão, como em dashboards, listas de itens ou modais. Ele utiliza classes CSS do Tailwind CSS para estilização, garantindo consistência visual e responsividade.

## Estrutura do Componente

O componente principal `v-card` é composto por:

- **v-card**: O contêiner principal.
- **v-card-header**: Para títulos e descrições.
- **v-card-content**: Para o conteúdo principal.
- **v-card-footer**: Para ações ou informações adicionais no rodapé.

## Sub-componentes

### v-card-header

O `v-card-header` gerencia o cabeçalho do cartão, incluindo título e descrição. Ele suporta tanto inputs diretos quanto projeção de conteúdo via slots.

#### Propriedades de Entrada (Inputs)

- `title` (string | null): O título do cartão. Se fornecido, substitui o conteúdo projetado.
- `description` (string | null): A descrição do cartão. Se fornecido, substitui o conteúdo projetado.

#### Projeção de Conteúdo

- `[data-slot="title"]`: Slot para o título.
- `[data-slot="description"]`: Slot para a descrição.

#### Funcionalidades

- Geração automática de IDs únicos para acessibilidade (ARIA).
- Validação reativa: Avisa se inputs e slots forem fornecidos simultaneamente.
- Validação de slots inválidos: Apenas "title" e "description" são permitidos.
- Acessibilidade: Define `aria-labelledby` e `aria-describedby` automaticamente.

#### Exemplo de Uso

```html
<v-card>
  <v-card-header title="Título do Cartão" description="Descrição breve do conteúdo."> </v-card-header>
</v-card>
```

Ou com projeção:

```html
<v-card>
  <v-card-header>
    <h2 data-slot="title">Título Personalizado</h2>
    <p data-slot="description">Descrição personalizada.</p>
  </v-card-header>
</v-card>
```

### v-card-content

O `v-card-content` é usado para o conteúdo principal do cartão. Ele permite adicionar uma borda superior opcional.

#### Propriedades de Entrada (Inputs)

- `class` (string): Classes CSS adicionais.
- `hasBorder` (boolean): Se verdadeiro, adiciona uma borda superior.

#### Estilização

- Se `hasBorder` for verdadeiro, adiciona borda e padding superior.

#### Exemplo de Uso

```html
<v-card>
  <v-card-content>
    <p>Conteúdo principal do cartão.</p>
  </v-card-content>
</v-card>
```

Com borda:

```html
<v-card>
  <v-card-content hasBorder="true">
    <p>Conteúdo com borda superior.</p>
  </v-card-content>
</v-card>
```

### v-card-footer

O `v-card-footer` é para o rodapé do cartão, frequentemente usado para ações como botões.

#### Propriedades de Entrada (Inputs)

- `class` (string): Classes CSS adicionais.
- `hasBorder` (boolean): Se verdadeiro, adiciona uma borda superior.

#### Estilização

- Se `hasBorder` for verdadeiro, adiciona borda e padding superior.

#### Exemplo de Uso

```html
<v-card>
  <v-card-footer>
    <button>Ação</button>
  </v-card-footer>
</v-card>
```

Com borda:

```html
<v-card>
  <v-card-footer hasBorder="true">
    <button>Ação com borda</button>
  </v-card-footer>
</v-card>
```

## Exemplo Completo de Uso

Aqui está um exemplo completo de um cartão usando todos os sub-componentes:

```html
<v-card>
  <v-card-header title="Exemplo de Cartão" description="Este é um exemplo de uso do componente v-card."> </v-card-header>

  <v-card-content>
    <p>Aqui vai o conteúdo principal do cartão. Pode incluir texto, imagens ou outros componentes.</p>
  </v-card-content>

  <v-card-footer hasBorder="true">
    <button class="btn-primary">Ação Principal</button>
    <button class="btn-secondary">Cancelar</button>
  </v-card-footer>
</v-card>
```

## Detalhes Técnicos

### Dependências

- Angular 17+ (utiliza Signals).
- Tailwind CSS para estilização.
- Utilitários: `mergeClasses` para combinar classes CSS, `generateId` para IDs únicos.

### Acessibilidade

- O `v-card-header` implementa atributos ARIA para leitores de tela.
- Validações ajudam a garantir que títulos e descrições sejam fornecidos para melhor acessibilidade.

### Validações e DX (Experiência do Desenvolvedor)

- Avisos no console para conflitos entre inputs e projeção de conteúdo.
- Erros para slots inválidos ou conteúdo vazio em cabeçalhos.

### Notas

- O componente é standalone, facilitando importação em módulos.
- Utiliza `<ng-content>` para projeção flexível de conteúdo.
- Classes CSS são baseadas em variáveis de tema (ex.: `bg-card-background`), permitindo personalização via design system.

Para mais informações sobre o design system, consulte [README-DESIGN-SYSTEM.md](../docs/README-DESIGN-SYSTEM.md).
