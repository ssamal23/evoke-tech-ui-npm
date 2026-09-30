import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import { cn } from '../../utils/cn';

const boxSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
const labelSizes = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };

/** Styled native checkbox with optional label, helper/error text and indeterminate state. */
export const Checkbox = forwardRef(function Checkbox(
  {
    label,
    helperText,
    error,
    size = 'md',
    indeterminate = false,
    id,
    disabled = false,
    className,
    containerClassName,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error || helperText;
  const innerRef = useRef(null);

  useImperativeHandle(ref, () => innerRef.current);
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-center gap-3 text-field-label',
          labelSizes[size] ?? labelSizes.md,
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        )}
      >
        <span className="relative inline-flex shrink-0">
          <input
            ref={innerRef}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={message ? messageId : undefined}
            className={cn(
              'peer appearance-none rounded border-2 bg-white transition-colors cursor-[inherit]',
              error ? 'border-field-error' : 'border-field-border',
              'checked:border-brand checked:bg-brand indeterminate:border-brand indeterminate:bg-brand',
              'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand/25',
              boxSizes[size] ?? boxSizes.md,
              className,
            )}
            {...rest}
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-white opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {indeterminate ? <path d="M5 10h10" /> : <path d="M5 10.5l3.2 3.2L15 6.8" />}
          </svg>
        </span>
        {label}
      </label>
      {message && (
        <p id={messageId} className={cn('text-sm', error ? 'text-field-error' : 'text-gray-500')}>
          {message}
        </p>
      )}
    </div>
  );
});
