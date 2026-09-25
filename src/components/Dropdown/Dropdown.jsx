import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

/**
 * Styled native <select>. Native keeps keyboard, screen-reader and mobile
 * picker behaviour for free.
 *
 * options: Array<{ value: string, label: string, disabled?: boolean }>
 */
export const Dropdown = forwardRef(function Dropdown(
  {
    label,
    options = [],
    placeholder,
    helperText,
    error,
    size = 'md',
    id,
    required = false,
    disabled = false,
    fullWidth = true,
    value,
    defaultValue,
    className,
    containerClassName,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;
  const message = error || helperText;

  // With a placeholder and no value supplied, start on the placeholder option.
  const valueProps =
    value !== undefined
      ? { value }
      : { defaultValue: defaultValue ?? (placeholder ? '' : undefined) };

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'w-full appearance-none rounded-md border bg-white pl-3 pr-9 text-gray-900 transition-colors cursor-pointer',
            'focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
            sizes[size] ?? sizes.md,
            className,
          )}
          {...valueProps}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 h-4 w-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {message && (
        <p id={messageId} className={cn('text-xs', error ? 'text-red-600' : 'text-gray-500')}>
          {message}
        </p>
      )}
    </div>
  );
});
