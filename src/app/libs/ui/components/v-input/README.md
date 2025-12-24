# v-input Directive

The `v-input` is an attribute directive that styles native `<input>` and `<textarea>` elements to match the application's design system.

It integrates with Angular's reactive forms to show validation states.

## Usage

Apply the directive directly to an `<input>` or `<textarea>` element.

### Basic Input
```html
<input v-input type="text" placeholder="Your text here..." />
```

### Textarea
```html
<textarea v-input placeholder="Tell us about yourself..."></textarea>
```

## Inputs

### `size`

Sets the size (height and font size) of the control.

- **Type:** `'sm' | 'md' | 'lg'`
- **Default:** `'md'`

```html
<!-- Small size -->
<input v-input size="sm" />

<!-- Medium size -->
<input v-input size="md" />

<!-- Large size -->
<input v-input size="lg" />
```

### `class`

Accepts external CSS classes to be merged with the component's default styles.

- **Type:** `ClassValue` (from `clsx`)

```html
<input v-input class="mt-4 !bg-red-500" />
```

## Reactive Forms Integration

The directive automatically detects if it's being used with `formControl` or `formControlName`. It will apply a `border-destructive` class if the control is invalid and has been touched or is dirty.

```html
<input v-input [formControl]="myFormControl" />
```

The component is `standalone` and must be imported into any component that uses it.
