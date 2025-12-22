You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Project Architecture

- Follow modular, scalable, and domain-oriented architecture
- Separate core application, business domains, reusable widgets, and UI libraries
- Use DDD light principles: low coupling, high cohesion
- Implement lazy loading for feature routes
- Avoid direct dependency on business rules in UI components

## Pages

- Pages represent complete routes and act as Smart Components
- Use standalone components for pages
- Implement lazy loading for pages
- Use signals for page state management (loading, errors, filters)
- Resolve critical data before rendering to avoid flicker
- Keep templates simple, declarative, and use native control flow (`@if`, `@for`, `@switch`)
- Each page should represent a single business context
- Update title and meta tags for SEO and accessibility

## Design System

- Create reusable, accessible, and consistent components
- Use Angular Material when appropriate
- Use TailwindCSS or equivalent utility CSS for styling
- Follow naming conventions: VButtonComponent, VInputComponent, VCardComponent, etc.
- Ensure components are standalone and stateless when possible
- Components should be controlled via `@Input()` and `@Output()`
- Avoid direct business logic in components

## Naming Conventions

- Files: kebab-case
- Interfaces: prefix I (e.g., IUser)
- Services: .service.ts
- APIs: .api.ts
- Enums: .enum.ts
- Components: .component.ts
- Constants: .constant.ts
- Pages: .page.ts
