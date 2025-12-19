# 🧱 Boas Práticas para Criação de Pages – Angular 20

Este documento define o **padrão oficial do projeto** para criação, organização e manutenção de **Pages** no Angular 20.

Pages representam **rotas (telas completas)** e são responsáveis por orquestrar layout, dados e componentes de forma clara, escalável e performática.

---

## 🎯 Conceito de Page

- Page **não é** um componente reutilizável
- Cada page representa **uma rota**
- Atua como **Smart Component**
- Orquestra dados, estado e componentes filhos

---

## 1. Page ≠ Component reutilizável

### 📌 Explanação

Pages representam telas completas. Elas coordenam dados, layout e componentes menores, mas **não devem concentrar lógica de negócio complexa**.

### ✅ Boas práticas

- Evitar lógica complexa na page
- Delegar responsabilidades para:
  - Services
  - Facades
  - Components filhos

### 📍 Exemplo

- **Page:** `usuarios-page`
- **Componentes filhos:**
  - `usuarios-filtro`
  - `usuarios-tabela`
  - `usuarios-form`

---

## 2. Pages devem ser Smart Components

### 📌 Explanação

Pages são responsáveis por:

- Buscar dados
- Controlar loading e erro
- Gerenciar estado da tela

Componentes filhos devem ser **dumb / presentational**, focados apenas em exibir dados.

### 📍 Exemplo

- A page decide quando buscar usuários
- A tabela apenas recebe a lista via `@Input`

---

## 3. Uso obrigatório de Standalone Components

### 📌 Explanação

Angular 20 reforça o uso de **standalone components**, reduzindo acoplamento e melhorando o lazy loading.

### ✅ Boas práticas

- Pages devem ser standalone
- Importar apenas dependências necessárias

### ⭐ Benefícios

- Melhor tree-shaking
- Código mais simples
- Testes mais fáceis

---

## 4. Lazy Loading obrigatório para pages

### 📌 Explanação

Cada page deve ser carregada sob demanda para melhorar performance e reduzir o bundle inicial.

### ✅ Boas práticas

- Uma rota → uma page
- Evitar carregamento de módulos grandes desnecessariamente

---

## 5. Resolver dados críticos antes de renderizar

### 📌 Explanação

Evita _flicker_, loading excessivo e melhora a experiência do usuário.

### ✅ Boas práticas

- Usar resolvers ou signals assíncronos
- Evitar lógica pesada no template

### 📍 Exemplo

- A page só renderiza após os dados essenciais serem carregados

---

## 6. Uso de Signals para estado da page

### 📌 Explanação

Signals são ideais para gerenciar:

- Estado local da page
- Loading
- Erros
- Filtros

### ⭐ Benefícios

- Menos subscriptions manuais
- Código mais previsível e reativo

---

## 7. Templates simples e legíveis

### 📌 Explanação

Templates devem ser **declarativos**, claros e fáceis de entender.

### ✅ Boas práticas

- Evitar condições aninhadas complexas
- Preferir getters ou computed signals
- Usar:
  - `@if`
  - `@for`
  - `@switch`

---

## 8. Responsabilidade única por page

### 📌 Explanação

Cada page deve representar **um único contexto de negócio**.

### ❌ Exemplo ruim

Uma única page de usuários que:

- Cria
- Edita
- Gerencia permissões
- Exibe auditoria

### ✅ Exemplo bom

- `/usuarios`
- `/usuarios/novo`
- `/usuarios/:id/editar`

---

## 9. SEO e Acessibilidade

### 📌 Explanação

Mesmo em aplicações SPA, pages devem seguir boas práticas de acessibilidade e SEO.

### ✅ Boas práticas

- Atualizar `title` e meta tags
- Usar landmarks semânticos (`main`, `section`, `nav`)
- Garantir navegação por teclado
- Garantir feedback visual e textual para ações

---

## ✅ Resultado Esperado

- Pages simples e organizadas
- Código previsível e escalável
- Melhor performance
- Facilidade de manutenção
- Padronização entre times
