# @evoke-tech/ui

Reusable React form components styled with Tailwind CSS v4.

Components: `Button`, `Input`, `Dropdown`

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
npm pack                                   # creates evoke-tech-ui-0.1.0.tgz
cd ../your-app && npm install ../Reusable_html_NPM/evoke-tech-ui-0.1.0.tgz
```

### Adding a new component

1. Create `src/components/<Name>/<Name>.jsx` and `<Name>.test.jsx`.
2. Export it from `src/index.js`.
3. Add it to `demo/main.jsx`.
