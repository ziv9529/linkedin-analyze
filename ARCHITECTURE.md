# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────┐
│                    React App Entry                      │
│                      main.tsx                           │
│         - Imports theme CSS (tokens.css)                │
│         - Mounts App component                          │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  App.tsx                                │
│         Wraps app with ThemeProvider                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              ThemeProvider (Context)                    │
│  ┌────────────────────────────────────────────────────┐ │
│  │ - Detects system preference                       │ │
│  │ - Reads localStorage                              │ │
│  │ - Sets data-theme on <html>                       │ │
│  │ - Provides useTheme hook                          │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│          ConnectionsAnalyzerPage (Main UI)             │
│  ┌────────────────────────────────────────────────────┐ │
│  │ - Header with ThemeToggle                         │ │
│  │ - Upload zone                                     │ │
│  │ - Results summary                                 │ │
│  │ - Error handling                                  │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬──────────────┐
        ▼              ▼              ▼              ▼
    ┌───────┐    ┌──────────┐   ┌────────┐    ┌─────────┐
    │Button │    │ThemeTogg │   │  Card  │    │UploadZn │
    │(TSX)  │    │  le(TSX) │   │ (TSX)  │    │  (TSX)  │
    └───────┘    └──────────┘   └────────┘    └─────────┘
        │              │              │            │
        ▼              ▼              ▼            ▼
    ┌───────┐    ┌──────────┐   ┌────────┐    ┌─────────┐
    │Button │    │ThemeTogg │   │  Card  │    │UploadZn │
    │.css   │    │  le.css  │   │ .css   │    │  .css   │
    └───────┘    └──────────┘   └────────┘    └─────────┘
        │              │              │            │
        └──────────────┼──────────────┴────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│            CSS Variables (tokens.css)                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [data-theme="light"] { ... }                       │ │
│  │ [data-theme="dark"]  { ... }                       │ │
│  │                                                    │ │
│  │ Colors, shadows, transitions, spacing, etc.       │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Theme Preference Detection

```
User Opens App
    │
    ▼
localStorage has 'theme' key?
    │
    ├─ YES ──▶ Load saved preference (light/dark)
    │
    └─ NO ──▶ Check system preference
                    │
                    ├─ System: dark ──▶ Use 'dark'
                    │
                    └─ System: light ──▶ Use 'light'
    │
    ▼
Set data-theme="light|dark" on <html>
    │
    ▼
All CSS variables update via scoped rules
    │
    ▼
Page renders with correct colors/styles
```

### Theme Toggle Flow

```
User clicks ThemeToggle button
    │
    ▼
toggleTheme() function called
    │
    ▼
theme state changes (light ↔ dark)
    │
    ▼
useEffect updates:
    ├─ data-theme attribute on <html>
    │
    └─ localStorage with new preference
    │
    ▼
Browser CSS variable scope changes
    │
    ▼
All components automatically re-render with new colors
(250ms smooth transition)
```

---

## File Dependencies

### Core Theme System

```
tokens.css (CSS Variables)
    ▲
    │
ThemeContext.tsx (React Context)
    ├─ Reads/writes localStorage
    ├─ Sets data-theme attribute
    └─ Provides useTheme hook
    ▲
    │
App.tsx (Wraps app with provider)
    ▲
    │
main.tsx (Imports tokens.css)
```

### Component System

```
Component.tsx (React component)
    │
    ├─ Imports Component.css
    │
    └─ Can use useTheme() hook if needed
    ▲
    │
Component.css (All styling)
    │
    ├─ Uses var(--color-*) variables
    │
    └─ Responsive media queries
```

---

## State Management

### Theme Context State

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Where it lives:**

- React Context API
- No Redux, no Zustand (lightweight approach)
- Single source of truth

**What it controls:**

- Current theme mode
- Toggle function for switching
- localStorage persistence

**Who accesses it:**

- Components using `useTheme()` hook
- Mainly `ThemeToggle` component
- Optional: Any component that needs current theme info

---

## CSS Architecture

### Scoped Variables (Light vs Dark)

```css
/* Light mode (default) */
[data-theme='light'],
:root:not([data-theme='dark']) {
  --color-primary: #1f2937; /* Dark text */
  --bg-primary: #ffffff; /* White bg */
  --text-primary: #1f2937; /* Dark text */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1); /* Softer shadows */
}

/* Dark mode */
[data-theme='dark'] {
  --color-primary: #f3f4f6; /* Light text */
  --bg-primary: #0f172a; /* Dark bg */
  --text-primary: #f3f4f6; /* Light text */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3); /* Darker shadows */
}
```

**How it works:**

1. CSS applies scoped rules based on `data-theme` attribute
2. Variables automatically switch when attribute changes
3. No JavaScript color calculations needed
4. Native browser performance

---

## Component Hierarchy

```
App
├── ThemeProvider
│   └── ConnectionsAnalyzerPage
│       ├── Header (sticky)
│       │   ├── h1 (Title)
│       │   └── ThemeToggle
│       │
│       └── Main content
│           ├── Guide Card
│           │   └── Steps list
│           │
│           ├── UploadZone
│           │   └── Button
│           │
│           ├── Error Card (conditional)
│           │
│           └── Summary (conditional)
│               ├── Metrics grid
│               │   ├── Metric card
│               │   ├── Metric card
│               │   └── Metric card
│               │
│               └── Company list
│                   ├── Company item
│                   ├── Company item
│                   └── ...
```

---

## Style Cascade

```
Browser defaults
    ▼
tokens.css (CSS Variables + Base styles)
    │
    ├─ :root { font-family, line-height... }
    ├─ html { theme variable scopes }
    ├─ body { defaults }
    ├─ h1, h2, h3... { typography }
    │
    ▼
index.css (Global utilities)
    │
    ├─ .flex, .gap-3, .mb-4... (utility classes)
    ├─ Base component styles
    │
    ▼
Component-scoped CSS files
    │
    ├─ Button.css
    ├─ Card.css
    ├─ ThemeToggle.css
    ├─ UploadZone.css
    ├─ Summary.css
    ├─ ConnectionsAnalyzerPage.css
    │
    ▼
Final computed styles (with CSS variables applied)
```

---

## Browser Compatibility

### CSS Variables Support

- ✅ Chrome 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ Edge 15+
- ✅ All modern browsers

### `prefers-color-scheme` Support

- ✅ Chrome 76+
- ✅ Firefox 67+
- ✅ Safari 12.1+
- ✅ Edge 79+

### localStorage Support

- ✅ All modern browsers
- ⚠️ Disabled in private/incognito by default

---

## Performance Characteristics

### Theme Switch Performance

- **Theme change**: O(1) - Single `data-theme` attribute change
- **CSS variable scope**: Browser handles natively (fast)
- **Re-render**: Only ThemeToggle + ThemeProvider re-render
- **Component updates**: Automatic via CSS cascade, no JS needed

### Bundle Size Impact

- `ThemeContext.tsx`: ~1KB
- `tokens.css`: ~8KB
- Component CSS files: ~15KB total
- **Total overhead**: ~24KB (gzipped: ~7KB)

### Rendering Performance

- No JavaScript color calculations
- No style recalculation overhead
- Native browser CSS variable scoping
- Single theme switch = single attribute update

---

## Testing Strategy

### Unit Tests (for ThemeContext)

```typescript
describe('ThemeContext', () => {
  test('detects system preference on mount', () => {
    // Mock matchMedia
  });

  test('reads localStorage preference', () => {
    // Set localStorage, mount provider
  });

  test('toggles theme on call', () => {
    // Call toggleTheme, verify attribute
  });

  test('persists to localStorage', () => {
    // Toggle theme, check localStorage
  });
});
```

### Visual Regression Tests

```typescript
describe('Components in light/dark modes', () => {
  test('Button looks correct in light mode', () => {
    // Render with data-theme="light"
    // Snapshot or visual comparison
  });

  test('Button looks correct in dark mode', () => {
    // Render with data-theme="dark"
    // Snapshot or visual comparison
  });
});
```

### Integration Tests

```typescript
describe('Theme system', () => {
  test('full flow: click toggle → theme changes → colors update', () => {
    // Click toggle
    // Verify data-theme attribute
    // Verify CSS variables
    // Verify component renders correctly
  });
});
```

---

## Maintenance & Extending

### Adding a New Color Token

1. **Edit `tokens.css`:**

```css
[data-theme='light'] {
  --color-custom: #yourcolor;
}

[data-theme='dark'] {
  --color-custom: #yourdarkmodecolor;
}
```

2. **Edit `tokens.ts`** (TypeScript definitions):

```typescript
// Not strictly necessary but good for IDE autocomplete
```

3. **Use in component CSS:**

```css
.my-element {
  background-color: var(--color-custom);
}
```

### Adding a New Component

1. Create `Component.tsx`
2. Create `Component.css` with CSS variables
3. Import CSS in TSX
4. Use in parent component

### Changing Theme Behavior

All theme logic is in `ThemeContext.tsx`. Modify:

- `detectSystemPreference()` - Change system detection
- `useEffect` blocks - Change persistence logic
- localStorage key - Rename storage location
- Initial theme - Change default behavior

---

## Debugging

### Check Current Theme

```javascript
document.documentElement.getAttribute('data-theme');
```

### Check CSS Variables

```javascript
getComputedStyle(document.documentElement).getPropertyValue('--color-accent');
```

### Monitor Theme Changes

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => console.log(m.attributeName));
});
observer.observe(document.documentElement, { attributes: true });
```

### localStorage Issues

```javascript
localStorage.getItem('theme'); // Read
localStorage.setItem('theme', 'dark'); // Write
localStorage.removeItem('theme'); // Delete
localStorage.clear(); // Clear all
```

---

## Future Enhancements

### Possible Improvements

1. **System preference auto-update** - Currently listens but only if no preference
2. **Transition animations** - Already 250ms, could add more flair
3. **Additional themes** - Not just light/dark (e.g., high-contrast, sepia)
4. **Component-level themes** - Different theme for modal/overlay
5. **Schedule-based themes** - Auto-switch at sunset/sunrise
6. **Theme preview** - Show before committing to switch
7. **Custom themes** - User-created color preferences
8. **Analytics** - Track theme preference distribution

### Planned Enhancements

- [ ] Add high-contrast theme variant
- [ ] Add theme transition animation library
- [ ] Create theme customization UI
- [ ] Add theme presets
- [ ] Add system preference listener

---

## Related Documentation

- [Refactor Summary](./REFACTOR_SUMMARY.md)
- [Design Tokens Reference](./DESIGN_TOKENS.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
