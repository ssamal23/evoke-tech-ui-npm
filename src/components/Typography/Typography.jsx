import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

// Type scale from the design spec. Sizes are px so they match it exactly.
export const typographyVariants = {
  h1: { tag: 'h1', className: 'text-[32px] leading-[40px] font-bold' },
  h2: { tag: 'h2', className: 'text-[28px] leading-[36px] font-semibold' },
  h3: { tag: 'h3', className: 'text-[24px] leading-[32px] font-semibold' },
  h4: { tag: 'h4', className: 'text-[22px] leading-[30px] font-semibold' },
  h5: { tag: 'h5', className: 'text-[18px] leading-[26px] font-semibold' },
  h6: { tag: 'h6', className: 'text-[16px] leading-[24px] font-semibold' },
  p1: { tag: 'p', className: 'text-[16px] leading-[24px] font-normal' },
  p2: { tag: 'p', className: 'text-[14px] leading-[20px] font-normal' },
  p3: { tag: 'p', className: 'text-[12px] leading-[16px] font-semibold' },
  p4: { tag: 'p', className: 'text-[12px] leading-[16px] font-normal' },
};

/**
 * Text styled from the type scale. `as` changes the rendered element without
 * changing the look, e.g. <Typography variant="h3" as="h1">.
 */
export const Typography = forwardRef(function Typography(
  { variant = 'p1', as, className, children, ...rest },
  ref,
) {
  const style = typographyVariants[variant] ?? typographyVariants.p1;
  const Tag = as ?? style.tag;

  return (
    <Tag ref={ref} className={cn('font-brand', style.className, className)} {...rest}>
      {children}
    </Tag>
  );
});
