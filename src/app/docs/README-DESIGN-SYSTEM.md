# 🎨 Design System – TODO

Este documento lista todos os componentes que devem ser criados no **Design System Angular**.

📌 **Objetivo**
Criar um Design System reutilizável, acessível, consistente e desacoplado da regra de negócio, baseado em:

- Angular (Standalone Components)
- Angular Material (quando fizer sentido)
- TailwindCSS (ou CSS utilitário equivalente)
- Tokens de Design (cores, tipografia, espaçamentos, etc.)

---

## 🧱 Fundamentos (Core)

- [x] Theme Provider (Light / Dark)
- [ ] Design Tokens
  - [ ] Cores
  - [ ] Tipografia
  - [ ] Espaçamentos
  - [ ] Border Radius
  - [ ] Shadows
- [ ] CSS Reset / Base Styles
- [ ] Utilitários de layout (flex, grid, gap)
- [ ] Sistema de Ícones (wrapper para Lucide / Material Icons)

---

## 🔘 Botões

- [ ] Button
  - [ ] Variants (primary, secondary, destructive, ghost, link)
  - [ ] Sizes (sm, md, lg, icon)
  - [ ] Loading state
  - [ ] Disabled state
- [ ] Icon Button
- [ ] Button Group

---

## 📝 Formulários

### Inputs básicos

- [ ] Input (text, password, email, number)
- [ ] Textarea
- [ ] Label
- [ ] Hint / Description
- [ ] Error Message

### Seleção

- [ ] Select
- [ ] Combobox
- [ ] Autocomplete
- [ ] Checkbox
- [ ] Radio Group
- [ ] Switch / Toggle

### Avançados

- [ ] Date Picker
- [ ] Time Picker
- [ ] Slider
- [ ] File Upload
- [ ] OTP Input

---

## 📦 Layout & Estrutura

- [ ] Container
- [ ] Card
  - [ ] Card Header
  - [ ] Card Content
  - [ ] Card Footer
- [ ] Separator / Divider
- [ ] Aspect Ratio
- [ ] Scroll Area
- [ ] Resizable Panels

---

## 🧭 Navegação

- [ ] Navbar
- [ ] Sidebar
- [ ] Breadcrumb
- [ ] Tabs
- [ ] Pagination
- [ ] Stepper

---

## 🪟 Overlays & Feedback

- [ ] Dialog / Modal
- [ ] Alert Dialog
- [ ] Drawer / Sheet
- [ ] Popover
- [ ] Tooltip
- [ ] Dropdown Menu
- [ ] Context Menu

---

## 📊 Dados & Visualização

- [ ] Table
  - [ ] Sorting
  - [ ] Pagination
  - [ ] Empty State
- [ ] Badge
- [ ] Avatar
- [ ] Progress Bar
- [ ] Skeleton
- [ ] Charts (wrapper para lib externa)

---

## 🚨 Feedback & Estados

- [ ] Alert
- [ ] Toast / Sonner
- [ ] Loading Spinner
- [ ] Empty State
- [ ] Error State
- [ ] Success State

---

## 🧠 Utilitários

- [ ] Accordion
- [ ] Collapsible
- [ ] Command Palette
- [ ] Calendar
- [ ] Timeline
- [ ] Keyboard Shortcuts Helper

---

## ♿ Acessibilidade

- [ ] ARIA roles padronizados
- [ ] Navegação por teclado
- [ ] Focus ring visível
- [ ] Contraste de cores
- [ ] Screen reader support

---

## 🧪 Qualidade

- [ ] Storybook configurado
- [ ] Stories para todos os componentes
- [ ] Testes unitários
- [ ] Testes de acessibilidade
- [ ] Documentação por componente

---

## 📚 Documentação

- [ ] Guia de instalação
- [ ] Guia de temas
- [ ] Guia de customização
- [ ] Exemplos de uso
- [ ] Boas práticas
- [ ] Convenções do Design System

---

## 🔗 Referências

- ZardUI: https://zardui.com/docs/components
- shadcn/ui: https://ui.shadcn.com/docs/components

---

## 🚀 Observações

- Todos os componentes devem ser:
  - Standalone
  - Stateless sempre que possível
  - Controlados via `@Input()` e `@Output()`
- Evitar dependência direta de regras de negócio
- Padrão de nomenclatura:
  - `DsButtonComponent`
  - `DsInputComponent`
  - `DsCardComponent`

---

✅ **Este arquivo deve ser usado como checklist oficial do Design System**
