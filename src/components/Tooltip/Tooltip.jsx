import { cloneElement, isValidElement, useEffect, useId, useState } from 'react';
import { cn } from '../../utils/cn';

const placements = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Tooltip shown on hover and keyboard focus; Escape dismisses it.
 * Wrap a single focusable element (e.g. a Button). `content` is the tip text.
 * Positioned with CSS next to the trigger, so an ancestor with overflow:hidden can clip it.
 */
export function Tooltip({ content, placement = 'top', children, className }) {
  const id = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (content === undefined || content === null || content === '') return children;

  const trigger = isValidElement(children)
    ? cloneElement(children, { 'aria-describedby': open ? id : children.props['aria-describedby'] })
    : children;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {trigger}
      {open && (
        <span
          role="tooltip"
          id={id}
          className={cn(
            'pointer-events-none absolute z-50 w-max max-w-xs rounded-md bg-brand-navy px-3 py-1.5 text-xs font-medium text-white shadow-lg',
            placements[placement] ?? placements.top,
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
