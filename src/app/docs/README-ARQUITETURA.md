# 📐 Arquitetura do Projeto – Angular 20

Este projeto utiliza **Angular 20** seguindo uma arquitetura **modular, escalável e orientada a domínio**, com foco em **manutenibilidade**, **reutilização de código** e **boas práticas de engenharia de software**.

A estrutura foi pensada para projetos de médio e grande porte, separando claramente **core da aplicação**, **domínios de negócio**, **widgets reutilizáveis** e **bibliotecas de UI**.

---

## 🎯 Princípios Adotados

- Separação de responsabilidades
- Arquitetura orientada a domínio (DDD light)
- Baixo acoplamento e alta coesão
- Reutilização de componentes
- Padronização de nomenclatura
- Facilidade de testes e manutenção
- Compatível com Standalone Components

---

## 📁 Visão Geral da Estrutura

```
apps/
 ├── core/
 ├── domain/
 ├── widget/
 └── libs/
```

---

## 🧠 Core da Aplicação (`apps/core`)

Contém tudo que é **estrutural e global** da aplicação.

```
apps/core
 ├── layouts
 │    ├── auth
 │    ├── dashboard
 │    └── landing-page
 └── components
      ├── header
      └── footer
```

### Responsabilidades

- Layouts principais
- Componentes estruturais
- Sem regras de negócio

---

## 🧩 Domínios da Aplicação (`apps/domain`)

Cada módulo representa um **domínio de negócio independente**.

```
apps/domain/nome-modulo
    ├── apis (Chamadas HTTP)
    ├── components
    ├── constants
    ├── enums
    ├── interfaces
    ├── pages
    └── services (Regra de negócio)
```

---

## 🧰 Widgets (`apps/widget`)

Componentes genéricos reutilizáveis.

```
apps/widget
 ├── components
 ├── pipes
 └── directives
```

---

## 🎨 Bibliotecas de UI (`apps/libs/ui`)

Design System da aplicação.

```
apps/libs/ui
 └── components
      ├── label
      └── outros-componentes
```

---

## 🎨 Documentação (`apps/docs`)

Documentação da aplicação.

```
apps/docs
 ├── README-DESIGN-SYSTEM.md
 └── README-ARQUITETURA.md
```

---

## 📏 Padrões de Nomenclatura

- Arquivos: `kebab-case`
- Interfaces: prefixo `I`
- Services: `.service.ts`
- APIs: `.api.ts`
- Enums: `.enum.ts`
- Components: `.component.ts`
- Constants: `.constant.ts`
- Pages: `.page.ts`

---

## ✅ Boas Práticas

- Standalone Components
- OnPush ChangeDetection
- UI desacoplada de regra de negócio
- Serviços pequenos e focados
