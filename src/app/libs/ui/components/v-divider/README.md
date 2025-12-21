# Documentação do Componente V-Divider

## Visão Geral

O componente `v-divider` é um elemento de interface de usuário utilizado para criar divisores visuais em aplicações Angular. Ele é projetado para separar seções de conteúdo de forma elegante e acessível, seguindo as diretrizes do design system do projeto Veeti.

O componente é implementado como um elemento autônomo (self-closing) e suporta orientações horizontal e vertical, além de diferentes tamanhos de espaçamento.

## Propriedades

O componente aceita as seguintes propriedades de entrada (inputs):

### `class` (opcional)

- **Tipo**: `string`
- **Padrão**: `""`
- **Descrição**: Permite adicionar classes CSS personalizadas ao componente. Essas classes serão mescladas com as classes padrão do componente.

### `orientation` (opcional)

- **Tipo**: `"horizontal" | "vertical"`
- **Padrão**: `"horizontal"`
- **Descrição**: Define a orientação do divisor.
  - `"horizontal"`: Cria uma linha horizontal que se estende pela largura total do contêiner pai.
  - `"vertical"`: Cria uma linha vertical que se estende pela altura total do contêiner pai, exibida inline.

### `spacing` (opcional)

- **Tipo**: `"default" | "sm" | "md" | "lg"`
- **Padrão**: `"default"`
- **Descrição**: Controla o espaçamento vertical (para orientação horizontal) ou horizontal (para orientação vertical) ao redor do divisor.
  - `"sm"`: Espaçamento pequeno (`my-2` ou equivalente).
  - `"md"`: Espaçamento médio (`my-3`).
  - `"lg"`: Espaçamento grande (`my-4`).
  - `"default"`: Espaçamento padrão (`my-4`).

## Estilo e Aparência

- **Cor de fundo**: Utiliza a classe `bg-card-border`, que segue o tema do design system.
- **Orientação Horizontal**: Altura de 1px (`h-px`) e largura total (`w-full`).
- **Orientação Vertical**: Largura de 1px (`w-px`), altura total (`h-full`) e exibido inline (`inline-block`).
- **Espaçamento**: Aplicado via classes Tailwind CSS (`my-*` para horizontal, equivalente para vertical).

## Acessibilidade

O componente inclui atributos de acessibilidade para melhorar a experiência de usuários com tecnologias assistivas:

- **`role="separator"`**: Indica que o elemento é um separador de conteúdo.
- **`aria-orientation`**: Define a orientação do separador (`"horizontal"` ou `"vertical"`), ajudando leitores de tela a descrever corretamente o elemento.

## Exemplos de Uso

### Divisor Horizontal Padrão

```html
<v-divider></v-divider>
```

Este exemplo cria um divisor horizontal com espaçamento padrão, separando seções de conteúdo verticalmente.

### Divisor Horizontal com Espaçamento Personalizado

```html
<v-divider spacing="sm"></v-divider>
<v-divider spacing="md"></v-divider>
<v-divider spacing="lg"></v-divider>
```

Use diferentes tamanhos de espaçamento para ajustar o visual conforme necessário.

### Divisor Vertical

```html
<div class="flex items-center">
  <span>Item 1</span>
  <v-divider orientation="vertical" spacing="sm"></v-divider>
  <span>Item 2</span>
</div>
```

Para divisores verticais, certifique-se de que o contêiner pai tenha layout flexível (`display: flex`) para que o divisor se comporte corretamente.

### Divisor com Classes Personalizadas

```html
<v-divider class="border-t-2 border-blue-500" spacing="lg"></v-divider>
```

Adicione classes personalizadas para sobrescrever estilos padrão, como alterar a espessura ou cor da borda.

### Uso em Listas ou Cards

```html
<div class="card">
  <div class="card-header">
    <h3>Título do Card</h3>
  </div>
  <v-divider></v-divider>
  <div class="card-body">
    <p>Conteúdo do card...</p>
  </div>
</div>
```

O `v-divider` é ideal para separar cabeçalhos, corpos e rodapés em componentes de card ou outras estruturas de layout.

## Considerações Técnicas

- **Framework**: Desenvolvido para Angular usando signals e computed properties para reatividade.
- **Estilização**: Baseado em Tailwind CSS, com classes dinâmicas geradas computacionalmente.
- **Performance**: Como é um componente leve sem template complexo, tem impacto mínimo no desempenho.
- **Compatibilidade**: Compatível com Angular 17+ (usando a nova sintaxe de signals).

## Boas Práticas

1. **Use orientação apropriada**: Horizontal para separação vertical de conteúdo, vertical para separação horizontal.
2. **Considere o contexto**: Em layouts flexíveis, divisores verticais funcionam melhor.
3. **Acessibilidade**: Sempre teste com leitores de tela para garantir que o `aria-orientation` seja lido corretamente.
4. **Consistência**: Mantenha espaçamentos consistentes dentro da mesma seção da aplicação.
5. **Customização**: Use a propriedade `class` para ajustes visuais específicos, evitando modificar o componente diretamente.

Este componente é parte da biblioteca de UI do projeto Veeti e deve ser usado em conformidade com as diretrizes do design system.
