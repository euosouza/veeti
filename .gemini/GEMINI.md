# Gemini Code Assistant Guidelines for This Project

You are an expert AI assistant specializing in Angular, TypeScript, and modern web development. Your primary goal is to write clean, maintainable, and performant code that strictly adheres to the architectural patterns and conventions established in this project.

## 1. 🏛️ Core Architectural Principles

- **Modularity:** The application is divided into distinct layers: `core` (global logic), `domain` (business features), `widget` (generic UI), and `libs/ui` (Design System). Place new code in the correct layer.
- **Separation of Concerns:** Strictly separate UI logic (Components) from business logic (Services). Components should be "dumb" and presentational, while services handle data and state.
- **Domain-Driven:** Group features by business domain within the `apps/domain` directory.
- **Reusability:** Create reusable components in `apps/widget` or `apps/libs/ui`. Components inside a `domain` are specific to that domain.

## 2. 📁 File Structure and Naming Conventions

- **Directory Structure:**
  - `apps/core`: Global layouts and structural components (e.g., main header/footer).
  - `apps/domain/<feature>`: A specific business domain (e.g., `users`, `products`).
    - `.../apis`: HTTP service classes.
    - `.../components`: Dumb components, specific to this domain.
    - `.../pages`: Smart components, representing a full screen/route.
    - `.../services`: Business logic services for the domain.
  - `apps/widget/components`: Generic, reusable components with no business logic.
  - `apps/libs/ui/components`: The core Design System components.
- **File Naming:**
  - Use `kebab-case` for all filenames (e.g., `user-profile.component.ts`).
- **Class Naming & Suffixes:**
  - **Components:** `UserProfileComponent` in `user-profile.component.ts`
  - **Services:** `UserService` in `user.service.ts`
  - **APIs:** `UserApi` in `user.api.ts`
  - **Interfaces:** Prefix with `I` (e.g., `IUser`).
  - **Pages:** `UsersPage` in `users.page.ts`
  - **Design System Components:** Prefix with `V` (e.g., `VCardComponent`).

## 3. 🅰️ Angular Best Practices

- **Standalone Components:** **ALL** components, directives, and pipes **MUST** be `standalone: true`. Do not use NgModules.
- **Change Detection:** **ALL** components **MUST** use `changeDetection: ChangeDetectionStrategy.OnPush`.
- **Component Decorator:**
  - Use the `host` property for host bindings. Do **NOT** use `@HostBinding` or `@HostListener`.
- **Dependency Injection:**
  - Use the `inject()` function. Do **NOT** use constructor injection.
- **Inputs & Outputs:**
  - Use `input()` and `output()` functions. Do **NOT** use `@Input()` and `@Output()` decorators.
- **Templates:**
  - Use native control flow (`@if`, `@for`, `@switch`). Do **NOT** use `*ngIf`, `*ngFor`, `ngSwitch`.
  - Use `[class]` and `[style]` bindings. Do **NOT** use `ngClass` or `ngStyle`.
  - Keep templates simple and declarative. Avoid complex logic.
- **Memory Management:**
  - For any manual `Observable.subscribe()`, you **MUST** use `takeUntilDestroyed()`. Do not use `ngOnDestroy` for unsubscribing. The `async` pipe is preferred where possible.
    ```ts
    import { DestroyRef, inject } from '@angular/core';
    import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

    // Inside a component/service
    private readonly destroyRef = inject(DestroyRef);

    this.myObservable$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(...);
    ```

## 4. 🧱 Component Development Rules

There is a strict distinction between "Dumb" Components and "Smart" Components (Pages).

### "Dumb" Components (`apps/domain/.../components`, `apps/widget`, `apps/libs/ui`)

These are presentational components.
- **Responsibility:** A component must have only ONE responsibility (e.g., a user list, a card, a button).
- **Data Flow:**
  - **MUST** receive data only via inputs (`input()`).
  - **MUST** emit events only via outputs (`output()`).
- **Prohibited Actions:**
  - **NO** injecting or using Services, APIs, Facades, or Stores.
  - **NO** making HTTP requests.
  - **NO** business logic.
  - **NO** direct access to global state.
- **State:** Must be stateless where possible. Any internal state must be simple UI state (e.g., `isDropdownOpen`).

### Design System Component Conventions (`libs/ui`)

In addition to the "Dumb Component" rules, all components in `apps/libs/ui` **MUST** implement a standardized pattern for handling CSS classes to ensure they are extensible.

- **Required Imports:**
  ```typescript
  import { computed, input } from '@angular/core';
  import { ClassValue, mergeClasses } from '@libs/ui/utils/merge-class';
  ```
- **Mandatory Implementation:** Each component must accept an optional `class` input and compute the final class list.
  ```typescript
  // Inside your component class
  readonly class = input<ClassValue>("");
  
  protected readonly classes = computed(() =>
    mergeClasses(
      // List of default, base, and variant classes for the component
      "font-bold text-lg ...", 
      this.class() // This MUST be the last argument
    )
  );
  ```
- **Host Binding:** The computed `classes` signal must be bound to the host element.
  ```typescript
  @Component({
    ...
    host: {
      '[class]': 'classes()'
    }
  })
  ```

### Design System Component Development Workflow (`libs/ui`)

When creating or modifying a `libs/ui` component, the following workflow is **mandatory**:

1.  **Component Features**:
    *   **Variants & Sizes with `cva`**: The component **MUST** use `class-variance-authority` to manage all style variants like `variant` and `size`. This is the standard for creating declarative and type-safe component styles.
        ```typescript
        import { cva } from "class-variance-authority";

        const myComponentVariants = cva(
          "base-classes...", // Base classes applied to all variants
          {
            variants: {
              variant: {
                primary: "variant-primary-classes...",
                secondary: "variant-secondary-classes...",
              },
              size: {
                sm: "size-sm-classes...",
                md: "size-md-classes...",
              },
            },
            defaultVariants: {
              variant: "primary",
              size: "md",
            },
          }
        );
        ```
    *   **Extensible Styling**: The component **MUST** accept an external `class` input and merge it using `mergeClasses`.

2.  **Class Computation**: The `classes` computed signal **MUST** use the `cva` variant function and `mergeClasses`.
    ```typescript
    protected readonly classes = computed(() =>
      mergeClasses(
        myComponentVariants({ variant: this.variant(), size: this.size() }),
        // ... other conditional classes like for invalid state ...
        this.class()
      )
    );
    ```

3.  **Local Demo Component**:
    *   For each component `v-thing`, you **MUST** create a corresponding demo component `v-thing-demo` inside a `demo` sub-folder.
    *   This demo component is a standalone page used to showcase all features of the main component.

4.  **Demo Implementation**:
    *   The demo template **MUST** display the main component in all its variations (`variants`, `sizes`, `disabled`, `invalid`, etc.).
    *   This serves as the primary method for visual testing.

5.  **Routing**:
    *   A new lazy-loaded route **MUST** be added to `app.routes.ts` pointing to the new demo component.

6.  **Cleanup**:
    *   The central playground in `app.ts` is deprecated and **MUST NOT** be used.

### "Smart" Components / Pages (`apps/domain/.../pages`)

These are container components that represent a screen.
- **Responsibility:** Act as a "Smart Component" for a single route. They orchestrate data fetching and manage the screen's state, passing data down to dumb components.
- **Lazy Loading:** All pages **MUST** be lazy-loaded via the router.
- **State Management:** Use Angular Signals to manage the page's state (e.g., loading status, errors, form data, fetched data).
- **Data Fetching:** Pages are responsible for calling services to fetch and manipulate data.

## 5. 🛠️ Services and State Management

- **Services (`.service.ts`):** Contain business logic. They can be injected into Pages but NOT into dumb components.
- **APIs (`.api.ts`):** Contain only the code related to making HTTP requests. They are typically injected into Services.
- **Signals for State:**
  - Use signals for all local and page-level state.
  - Use `computed()` for derived state.
  - Do **NOT** use `signal.mutate()`. Use `set()` or `update()`.

By following these guidelines, you will ensure the project remains consistent, scalable, and easy to maintain.