import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

export const Input = forwardRef(function Input(
  {
    label,
    helperText,
    error,
    size = 'md',
    id,
    type = 'text',
    required = false,
    disabled = false,
    leftIcon,
    fullWidth = true,
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

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 flex text-gray-400">{leftIcon}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'w-full rounded-md border bg-white px-3 text-gray-900 placeholder:text-gray-400 transition-colors',
            'focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
            sizes[size] ?? sizes.md,
            leftIcon && 'pl-9',
            className,
          )}
          {...rest}
        />
      </div>
      {message && (
        <p id={messageId} className={cn('text-xs', error ? 'text-red-600' : 'text-gray-500')}>
          {message}
        </p>
      )}
    </div>
  );
});
