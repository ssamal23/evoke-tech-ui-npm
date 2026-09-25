import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import { fieldControlClass, fieldLabelClass, fieldMessageClass, fieldSizes } from '../Field/fieldStyles';

const paddingLeft = { sm: 'pl-4', md: 'pl-5', lg: 'pl-6' };

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
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label htmlFor={selectId} className={fieldLabelClass}>
          {label}
          {required && <span aria-hidden="true">*</span>}
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
            fieldControlClass,
            'appearance-none cursor-pointer pr-11',
            fieldSizes[size] ?? fieldSizes.md,
            paddingLeft[size] ?? paddingLeft.md,
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
          className="pointer-events-none absolute right-4 h-5 w-5 text-field-placeholder"
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
        <p id={messageId} className={fieldMessageClass(Boolean(error))}>
          {message}
        </p>
      )}
    </div>
  );
});
