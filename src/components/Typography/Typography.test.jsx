import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it.each([
    ['h1', 'H1', 'text-[32px]', 'font-bold'],
    ['h2', 'H2', 'text-[28px]', 'font-semibold'],
    ['h3', 'H3', 'text-[24px]', 'font-semibold'],
    ['h4', 'H4', 'text-[22px]', 'font-semibold'],
    ['h5', 'H5', 'text-[18px]', 'font-semibold'],
    ['h6', 'H6', 'text-[16px]', 'font-semibold'],
    ['p1', 'P', 'text-[16px]', 'font-normal'],
    ['p2', 'P', 'text-[14px]', 'font-normal'],
    ['p3', 'P', 'text-[12px]', 'font-semibold'],
    ['p4', 'P', 'text-[12px]', 'font-normal'],
  ])('%s renders <%s> with %s and %s', (variant, tag, size, weight) => {
    render(<Typography variant={variant}>Text</Typography>);
    const el = screen.getByText('Text');
    expect(el.tagName).toBe(tag);
    expect(el).toHaveClass(size, weight, 'font-brand');
  });

  it('defaults to p1', () => {
    render(<Typography>Body</Typography>);
    expect(screen.getByText('Body')).toHaveClass('text-[16px]', 'font-normal');
  });

  it('`as` changes the element but keeps the style', () => {
    render(<Typography variant="h3" as="h1">Title</Typography>);
    const el = screen.getByRole('heading', { level: 1 });
    expect(el).toHaveClass('text-[24px]');
  });

  it('merges className and forwards ref', () => {
    const ref = createRef();
    render(<Typography ref={ref} className="extra">x</Typography>);
    expect(ref.current).toHaveClass('extra');
  });
});
