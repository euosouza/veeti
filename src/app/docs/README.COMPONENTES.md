# 📂 components

Componentes reutilizáveis **somente dentro deste domínio**.  
Devem ser previsíveis, desacoplados e focados exclusivamente em **apresentação e interação**.

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

### 🎨 Estilos

- [ ] Estilos encapsulados no componente
- [ ] Sem dependência de estilos globais
- [ ] Classes CSS sem conflito
- [ ] Responsivo (mobile-first quando aplicável)

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
