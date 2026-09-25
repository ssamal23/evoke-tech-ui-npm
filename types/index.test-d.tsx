// Compile-only check of the public type definitions (run with `npm run typecheck`).
import { createRef } from 'react';
import { Button, Dropdown, Input, cn } from '@evoke-tech/ui';

const buttonRef = createRef<HTMLButtonElement>();
const inputRef = createRef<HTMLInputElement>();
const selectRef = createRef<HTMLSelectElement>();

export const ok = (
  <>
    <Button ref={buttonRef} variant="danger" size="lg" loading onClick={(e) => e.currentTarget.blur()}>
      Delete
    </Button>
    <Input ref={inputRef} label="Email" type="email" size="sm" error="Required" onChange={(e) => e.target.value} />
    <Dropdown
      ref={selectRef}
      label="Country"
      placeholder="Pick"
      options={[{ value: 'in', label: 'India' }, { value: 'us', label: 'USA', disabled: true }]}
      onChange={(e) => e.target.value}
    />
  </>
);

export const className: string = cn('a', false, undefined, 'b');

// @ts-expect-error: unknown variant is rejected
export const badVariant = <Button variant="purple">x</Button>;
// @ts-expect-error: options need a value
export const badOption = <Dropdown options={[{ label: 'x' }]} />;
