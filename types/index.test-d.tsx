// Compile-only check of the public type definitions (run with `npm run typecheck`).
import { createRef } from 'react';
import { Breadcrumbs, Button, Checkbox, Dropdown, Input, Radio, RadioGroup, SideNav, Tabs, Tooltip, Typography, cn } from '@evoke-tech/ui';

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
    <Checkbox label="Agree" indeterminate onChange={(e) => e.target.checked} />
    <Radio value="a" label="A" />
    <RadioGroup options={[{ value: 'a', label: 'A' }]} onChange={(v: string) => v} orientation="horizontal" />
    <Tabs items={[{ value: 'a', label: 'A', content: 'x' }]} onChange={(v: string) => v} />
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Now' }]} />
    <Tooltip content="Tip" placement="right">
      <Button>Hover</Button>
    </Tooltip>
    <SideNav
      items={[{ value: 'a', label: 'A', children: [{ value: 'b', label: 'B' }] }]}
      activeValue="b"
      onSelect={(value: string) => value}
    />
    <Typography variant="h3" as="h1">Title</Typography>
  </>
);

export const className: string = cn('a', false, undefined, 'b');

// @ts-expect-error: unknown variant is rejected
export const badVariant = <Button variant="purple">x</Button>;
// @ts-expect-error: options need a value
export const badOption = <Dropdown options={[{ label: 'x' }]} />;
// @ts-expect-error: unknown typography variant is rejected
export const badTypography = <Typography variant="h7">x</Typography>;
