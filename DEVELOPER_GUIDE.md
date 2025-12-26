# Developer Quick Start Guide

## Theme System Quick Reference

### 1. Using the Theme Hook

```tsx
import { useTheme } from '@/shared/context/ThemeContext';

export function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### 2. Styling with CSS Variables

Never use hardcoded colors. Use CSS variables instead:

```css
/* ❌ DON'T DO THIS */
.bad-button {
  background-color: #dc2626;
  color: #ffffff;
}

/* ✅ DO THIS */
.good-button {
  background-color: var(--color-accent);
  color: var(--text-inverse);
}
```

### 3. Common Variables by Use Case

**Text colors:**

- `var(--text-primary)` - Main text
- `var(--text-secondary)` - Muted text
- `var(--text-tertiary)` - Hints, disabled
- `var(--text-inverse)` - Light text on dark bg

**Backgrounds:**

- `var(--bg-primary)` - Main background
- `var(--bg-secondary)` - Elevated surfaces
- `var(--bg-tertiary)` - Further elevation
- `var(--bg-surface)` - Generic surface

**Borders:**

- `var(--border-primary)` - Main borders
- `var(--border-secondary)` - Secondary borders
- `var(--border-subtle)` - Dividers

**Accents:**

- `var(--color-accent)` - Primary action color
- `var(--color-secondary)` - Secondary action color

**Effects:**

- `var(--shadow-md)` - Medium shadow
- `var(--shadow-lg)` - Large shadow
- `var(--transition-base)` - Standard transition

---

## Creating New Components

### Step 1: Create TSX File

```tsx
import React from 'react';
import './MyComponent.css';

interface MyComponentProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const MyComponent: React.FC<MyComponentProps> = ({ children, variant = 'primary' }) => {
  return <div className={`my-component my-component--${variant}`}>{children}</div>;
};
```

### Step 2: Create CSS File with Variables

```css
.my-component {
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  transition: all var(--transition-base);
}

.my-component--primary {
  background-color: var(--color-accent);
  color: var(--text-inverse);
}

.my-component--secondary {
  background-color: var(--bg-secondary);
  border-color: var(--color-secondary);
}

.my-component:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}
```

### Step 3: Import and Use

```tsx
import { MyComponent } from '@/shared/components/MyComponent';

function App() {
  return <MyComponent variant="primary">Hello!</MyComponent>;
}
```

---

## Common Patterns

### Button with Theme Support

```tsx
const StyledButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-accent);
  color: var(--text-inverse);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-accent-light);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
  }
`;
```

### Responsive Card

```css
.card {
  padding: var(--spacing-xl);
  background-color: var(--bg-surface);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

@media (max-width: 640px) {
  .card {
    padding: var(--spacing-lg);
  }
}
```

### Dark-Aware Text

```css
.headline {
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.hint {
  color: var(--text-tertiary);
  font-size: 0.875rem;
}
```

---

## Color Reference by Component

### Buttons

- **Primary button**: `--color-accent` bg, `--text-inverse` text
- **Secondary button**: `--bg-secondary` bg, `--text-primary` text
- **Ghost button**: transparent, `--color-accent` text
- **Disabled**: `opacity: var(--opacity-disabled)`

### Cards

- **Default**: `--bg-surface` bg, `--border-primary` border, `--shadow-xs` shadow
- **Elevated**: `--bg-surface` bg, `--shadow-lg` shadow
- **Outlined**: transparent bg, `--border-primary` border

### Forms

- **Input**: `--bg-secondary` bg, `--border-primary` border
- **Focus**: `outline: 2px solid var(--color-accent)`
- **Label**: `--text-primary` color
- **Placeholder**: `--text-tertiary` color

### Alerts

- **Error**: `--state-error` accent
- **Success**: `--state-success` accent
- **Warning**: `--state-warning` accent
- **Info**: `--state-info` accent

---

## Testing Theme Changes

### Manual Testing

1. Click the theme toggle button in the header
2. Refresh page (preference should persist)
3. Open DevTools → Storage → localStorage
4. Verify `theme` key has value `light` or `dark`
5. Check computed styles use correct CSS variables

### Inspect Theme

```javascript
// In browser console
document.documentElement.getAttribute('data-theme');
// Returns: 'light' or 'dark'

// Check a CSS variable
getComputedStyle(document.documentElement).getPropertyValue('--color-accent');
```

---

## Migration Checklist

When refactoring old components:

- [ ] Remove all hardcoded colors
- [ ] Replace with `var(--color-*)` variables
- [ ] Update backgrounds to use `--bg-*` variables
- [ ] Update text colors to use `--text-*` variables
- [ ] Update borders to use `--border-*` variables
- [ ] Add transitions with `var(--transition-base)`
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Verify contrast meets WCAG AA
- [ ] Check responsive behavior
- [ ] Test focus states (keyboard navigation)

---

## Troubleshooting

### Theme not applying

- Check that `ThemeProvider` wraps your app in `App.tsx`
- Verify `tokens.css` is imported in `main.tsx`
- Check DevTools → Elements → `<html data-theme="...">` attribute

### Colors look wrong

- Verify CSS variables are spelled correctly
- Check that you're using `var(--color-name)` syntax
- Inspect element to see computed CSS
- Compare to `DESIGN_TOKENS.md`

### Transitions too slow/fast

- Check `--transition-fast` (150ms), `--transition-base` (250ms), `--transition-slow` (350ms)
- Adjust `transition` property to use correct variable
- Test with reduced motion: `prefers-reduced-motion`

### localStorage not persisting

- Check browser allows localStorage (not in incognito)
- Verify localStorage key is `"theme"`
- Check browser DevTools → Application → Storage

---

## File Organization

Always follow this structure:

```
components/
├── MyComponent.tsx    ← Component logic, props, types
├── MyComponent.css    ← All styles with CSS variables
└── index.ts          ← Export statement (optional)
```

Never mix styles in TSX files. CSS goes in `.css` files for clarity.

---

## Performance Tips

1. **Use CSS variables** - They're native browser optimization
2. **Minimize re-renders** - Theme context only updates when toggled
3. **Static classes** - Use CSS classes, not inline styles
4. **No JavaScript animations** - Use CSS `transition` instead
5. **Efficient selectors** - Avoid deep nesting in CSS

---

## Additional Resources

- [Design Tokens Reference](./DESIGN_TOKENS.md)
- [Refactor Summary](./REFACTOR_SUMMARY.md)
- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [React Context API Docs](https://react.dev/reference/react/useContext)

---

## Questions?

Refer to:

1. Existing component patterns (Button, Card, etc.)
2. Design tokens in `src/shared/theme/tokens.css`
3. Component CSS files for variable usage examples
