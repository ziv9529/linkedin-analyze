# Design Tokens Reference

## Color System

### Light Mode

| Token                       | Value   | Usage                       |
| --------------------------- | ------- | --------------------------- |
| `--color-primary`           | #1f2937 | Primary text, headings      |
| `--color-primary-light`     | #374151 | Secondary text emphasis     |
| `--color-primary-lighter`   | #6b7280 | Tertiary text, hints        |
| `--color-accent`            | #dc2626 | Primary buttons, highlights |
| `--color-accent-light`      | #ef4444 | Accent hover states         |
| `--color-accent-lighter`    | #fecaca | Accent backgrounds          |
| `--color-secondary`         | #0891b2 | Secondary actions           |
| `--color-secondary-light`   | #06b6d4 | Secondary hover             |
| `--color-secondary-lighter` | #cffafe | Secondary backgrounds       |
| `--bg-primary`              | #ffffff | Main background             |
| `--bg-secondary`            | #f9fafb | Elevated surfaces           |
| `--bg-tertiary`             | #f3f4f6 | Further elevation           |
| `--text-primary`            | #1f2937 | High contrast text          |
| `--text-secondary`          | #6b7280 | Muted text                  |
| `--text-tertiary`           | #9ca3af | Disabled/hints              |
| `--border-primary`          | #e5e7eb | Main borders                |
| `--border-secondary`        | #d1d5db | Secondary borders           |
| `--border-subtle`           | #f3f4f6 | Subtle dividers             |

### Dark Mode

| Token               | Value   | Usage                  |
| ------------------- | ------- | ---------------------- |
| `--color-primary`   | #f3f4f6 | Primary text on dark   |
| `--color-accent`    | #ff6b35 | Vivid accent in dark   |
| `--color-secondary` | #22d3ee | Bright secondary       |
| `--bg-primary`      | #0f172a | Deep dark background   |
| `--bg-secondary`    | #1e293b | Elevated dark surface  |
| `--bg-tertiary`     | #334155 | Further dark elevation |
| `--text-primary`    | #f3f4f6 | Light text             |
| `--text-secondary`  | #cbd5e1 | Muted light text       |
| `--border-primary`  | #334155 | Dark borders           |

---

## Semantic Colors

Both modes:

| Token             | Light   | Dark    | Usage            |
| ----------------- | ------- | ------- | ---------------- |
| `--state-success` | #059669 | #10b981 | Success messages |
| `--state-warning` | #d97706 | #f59e0b | Warnings         |
| `--state-error`   | #dc2626 | #ff6b35 | Errors           |
| `--state-info`    | #0891b2 | #22d3ee | Information      |

---

## Shadow System

| Token         | Value                               |
| ------------- | ----------------------------------- |
| `--shadow-xs` | 0 1px 2px 0 rgba(0, 0, 0, 0.05)     |
| `--shadow-sm` | 0 1px 2px 0 rgba(0, 0, 0, 0.1)      |
| `--shadow-md` | 0 4px 6px -1px rgba(0, 0, 0, 0.1)   |
| `--shadow-lg` | 0 10px 15px -3px rgba(0, 0, 0, 0.1) |
| `--shadow-xl` | 0 20px 25px -5px rgba(0, 0, 0, 0.1) |

---

## Gradients

| Token                  | Light                     | Dark                      |
| ---------------------- | ------------------------- | ------------------------- |
| `--gradient-primary`   | 135deg: #1f2937 → #374151 | 135deg: #1e293b → #334155 |
| `--gradient-accent`    | 135deg: #dc2626 → #991b1b | 135deg: #ff6b35 → #ff8a50 |
| `--gradient-secondary` | 135deg: #0891b2 → #06b6d4 | 135deg: #0891b2 → #22d3ee |
| `--gradient-bg`        | 180deg: #f9fafb → #ffffff | 180deg: #1e293b → #0f172a |

---

## Typography

### Font Sizes

| Token             | Size            |
| ----------------- | --------------- |
| `--fontSize-xs`   | 0.75rem (12px)  |
| `--fontSize-sm`   | 0.875rem (14px) |
| `--fontSize-base` | 1rem (16px)     |
| `--fontSize-lg`   | 1.125rem (18px) |
| `--fontSize-xl`   | 1.25rem (20px)  |
| `--fontSize-2xl`  | 1.5rem (24px)   |
| `--fontSize-3xl`  | 1.875rem (30px) |
| `--fontSize-4xl`  | 2.25rem (36px)  |
| `--fontSize-5xl`  | 3rem (48px)     |

### Font Weights

| Token                    | Weight |
| ------------------------ | ------ |
| `--fontWeight-light`     | 300    |
| `--fontWeight-normal`    | 400    |
| `--fontWeight-medium`    | 500    |
| `--fontWeight-semibold`  | 600    |
| `--fontWeight-bold`      | 700    |
| `--fontWeight-extrabold` | 800    |

### Heading Styles

| Element | Size    | Weight | Letter Spacing |
| ------- | ------- | ------ | -------------- |
| h1      | 2.5rem  | 700    | -0.02em        |
| h2      | 2rem    | 700    | -0.01em        |
| h3      | 1.5rem  | 700    | normal         |
| h4      | 1.25rem | 600    | normal         |

---

## Spacing Scale

| Token           | Value          |
| --------------- | -------------- |
| `--spacing-xs`  | 0.25rem (4px)  |
| `--spacing-sm`  | 0.5rem (8px)   |
| `--spacing-md`  | 0.75rem (12px) |
| `--spacing-lg`  | 1rem (16px)    |
| `--spacing-xl`  | 1.5rem (24px)  |
| `--spacing-2xl` | 2rem (32px)    |
| `--spacing-3xl` | 3rem (48px)    |
| `--spacing-4xl` | 4rem (64px)    |

---

## Border Radius

| Token           | Value          |
| --------------- | -------------- |
| `--radius-sm`   | 0.375rem (6px) |
| `--radius-md`   | 0.5rem (8px)   |
| `--radius-lg`   | 0.75rem (12px) |
| `--radius-xl`   | 1rem (16px)    |
| `--radius-full` | 9999px         |

---

## Transitions

| Token               | Duration | Easing                       |
| ------------------- | -------- | ---------------------------- |
| `--transition-fast` | 150ms    | cubic-bezier(0.4, 0, 0.2, 1) |
| `--transition-base` | 250ms    | cubic-bezier(0.4, 0, 0.2, 1) |
| `--transition-slow` | 350ms    | cubic-bezier(0.4, 0, 0.2, 1) |

---

## Opacity

| Token                | Value                     | Usage               |
| -------------------- | ------------------------- | ------------------- |
| `--opacity-hover`    | 0.9 (light) / 0.95 (dark) | Hover state opacity |
| `--opacity-disabled` | 0.5 (light) / 0.4 (dark)  | Disabled elements   |
| `--opacity-ghost`    | 0.7 (light) / 0.6 (dark)  | Ghost variant text  |

---

## Component Defaults

### Button

- **Size**: Medium (12px + 24px)
- **Padding**: 0.75rem 1.25rem
- **Border Radius**: 0.5rem
- **Font Weight**: 600

### Card

- **Padding**: 1.5rem
- **Border Radius**: 0.75rem
- **Default Shadow**: var(--shadow-xs)

### Input

- **Border**: 1px solid var(--border-primary)
- **Padding**: 0.75rem
- **Border Radius**: 0.5rem

---

## Accessibility

### Focus States

- **Outline**: 2px solid var(--color-accent)
- **Outline Offset**: 2px
- **Applies to**: All interactive elements

### Text Contrast (WCAG AA)

- **Light Mode**: Dark text (#1f2937) on light backgrounds (WCAG AAA)
- **Dark Mode**: Light text (#f3f4f6) on dark backgrounds (WCAG AAA)

---

## Usage in Components

### CSS Variables Example

```css
.my-component {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.my-component:hover {
  background-color: var(--bg-tertiary);
  box-shadow: var(--shadow-lg);
}
```

### Theme-Aware Styling

```tsx
const MyComponent = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      Content
    </div>
  );
};
```

---

## Dark Mode Example

When `data-theme="dark"` is set on the HTML element:

```css
[data-theme='dark'] {
  --color-primary: #f3f4f6;
  --bg-primary: #0f172a;
  --text-primary: #f3f4f6;
  /* ...all dark mode tokens */
}
```

The application automatically updates all colors through CSS variable substitution.
