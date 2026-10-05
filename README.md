# @evoke-tech/ui

Reusable React form components styled with Tailwind CSS v4.

Components: `Button`, `Input`, `Dropdown`, `Checkbox`, `Radio` / `RadioGroup`, `Tabs`, `Breadcrumbs`, `Tooltip`, `SideNav`, `Typography`

## Install

```bash
npm install @evoke-tech/ui
```

Peer dependencies: `react` and `react-dom` version 18 or later.

## Usage

Import the stylesheet **once**, for example in `main.jsx`. Then use the components:

```jsx
import '@evoke-tech/ui/styles.css';
import { Button, Input, Dropdown } from '@evoke-tech/ui';

export function SignupForm() {
  return (
    <form className="space-y-4">
      <Input label="Email" type="email" required helperText="We never share it." />
      <Dropdown
        label="Country"
        placeholder="Select a country"
        options={[
          { value: 'in', label: 'India' },
          { value: 'us', label: 'United States' },
        ]}
      />
      <Button type="submit" fullWidth>Sign up</Button>
    </form>
  );
}
```

The consuming app does **not** need Tailwind. The stylesheet contains only the classes these components use, and it has no global CSS reset, so it won't restyle the rest of your app.

### Font

All components use **Inter**, the brand font. The package does not download font files, so load Inter once in your app, for example in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

If Inter isn't loaded, the components fall back to the system font.

### Sizes

The default size (`md`) matches the Evoke design: fields and buttons are 56px tall with 16px text, and checkboxes and radios are 16px with 14px labels. Use `size="sm"` or `size="lg"` for smaller or larger variants.

## API

Every component forwards its `ref` and passes any other props to the underlying HTML element (`onClick`, `name`, `onChange`, `aria-*` and so on). Use `className` to add or override classes.

### Button

| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `loading` | `boolean`: shows a spinner and disables the button | `false` |
| `disabled` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |
| `leftIcon`, `rightIcon` | `ReactNode` | none |

### Input

| Prop | Type | Default |
|---|---|---|
| `label` | `ReactNode` | none |
| `helperText` | `ReactNode` | none |
| `error` | `ReactNode`: red styling, sets `aria-invalid`, replaces `helperText` | none |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `required`, `disabled` | `boolean` | `false` |
| `leftIcon` | `ReactNode` | none |
| `fullWidth` | `boolean` | `true` |
| `containerClassName` | `string`: class for the wrapper div | none |

### Dropdown

This is a styled native `<select>`, so keyboard, screen-reader and mobile support work out of the box. It can be controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).

| Prop | Type | Default |
|---|---|---|
| `options` | `{ value, label, disabled? }[]` | `[]` |
| `placeholder` | `string`: a disabled first option that is selected at the start | none |
| `label`, `helperText`, `error`, `size`, `required`, `disabled`, `fullWidth`, `containerClassName` | Same as Input | |

### Checkbox

Styled native checkbox. Extra props are passed to the `<input>`.

| Prop | Type | Default |
|---|---|---|
| `label`, `helperText`, `error`, `containerClassName` | Same as Input | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `indeterminate` | `boolean`: shows the mixed state | `false` |

### Radio and RadioGroup

`RadioGroup` renders a `<fieldset>` of radios that share one name. Use `options`, or pass `<Radio value label />` children. It can be controlled (`value` + `onChange`) or uncontrolled (`defaultValue`). Note that `onChange` receives the value, not the event.

| Prop | Type | Default |
|---|---|---|
| `options` | `{ value, label, disabled? }[]` | none |
| `label`, `helperText`, `error`, `size`, `required`, `disabled` | Same as Input | |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` |
| `name`, `value`, `defaultValue`, `onChange` | | |

### Tabs

Follows the WAI-ARIA tabs pattern. Arrow keys, Home and End move between tabs, and disabled tabs are skipped. Only the active panel is rendered.

| Prop | Type | Default |
|---|---|---|
| `items` | `{ value, label, content?, disabled? }[]` | `[]` |
| `value` / `defaultValue` | `string`: controlled / uncontrolled selection | first enabled tab |
| `onChange` | `(value) => void` | none |

### Breadcrumbs

| Prop | Type | Default |
|---|---|---|
| `items` | `{ label, href?, onClick? }[]`: the last item is the current page | `[]` |
| `separator` | `ReactNode` | chevron |

### Tooltip

Wrap one focusable element. The tip shows on hover and focus, and Escape closes it. It is positioned with CSS next to the trigger, so an ancestor with `overflow: hidden` can clip it.

| Prop | Type | Default |
|---|---|---|
| `content` | `ReactNode` | none (no tooltip) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |

### SideNav

| Prop | Type | Default |
|---|---|---|
| `items` | `{ value, label, icon?, badge?, href?, onClick?, disabled?, children? }[]`: `children` makes an expandable group | `[]` |
| `activeValue` | `string`: the current page | none |
| `onSelect` | `(value, item) => void` | none |
| `header`, `footer` | `ReactNode` | none |

### Typography

| Variant | Size | Weight | Element |
|---|---|---|---|
| `h1` | 32px | Bold | `h1` |
| `h2` | 28px | Semibold | `h2` |
| `h3` | 24px | Semibold | `h3` |
| `h4` | 22px | Semibold | `h4` |
| `h5` | 18px | Semibold | `h5` |
| `h6` | 16px | Semibold | `h6` |
| `p1` | 16px | Normal | `p` |
| `p2` | 14px | Normal | `p` |
| `p3` | 12px | Semibold | `p` |
| `p4` | 12px | Normal | `p` |

Use `as` to change the element without changing the look: `<Typography variant="h3" as="h1">`. The font family is the `--font-brand` token in `src/styles.css` (Inter). See [Font](#font) for loading it.

## Development

```bash
npm install
npm run dev        # playground at http://localhost:5173 (demo/main.jsx)
npm test           # Vitest + Testing Library
npm run build      # outputs dist/index.js, dist/index.cjs, dist/styles.css
```

### Try it in another project before publishing

```bash
npm run build
npm pack                                   # creates evoke-tech-ui-0.2.0.tgz
cd ../your-app && npm install ../Reusable_html_NPM/evoke-tech-ui-0.2.0.tgz
```

### Adding a new component

1. Create `src/components/<Name>/<Name>.jsx` and `<Name>.test.jsx`.
2. Export it from `src/index.js`.
3. Add it to `demo/main.jsx`.
