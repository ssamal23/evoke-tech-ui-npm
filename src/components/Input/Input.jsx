import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import {
  fieldControlClass,
  fieldLabelClass,
  fieldMessageClass,
  fieldPaddingX,
  fieldSizes,
} from '../Field/fieldStyles';

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
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className={fieldLabelClass}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-4 flex text-field-placeholder">{leftIcon}</span>
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
            fieldControlClass,
            fieldSizes[size] ?? fieldSizes.md,
            fieldPaddingX[size] ?? fieldPaddingX.md,
            leftIcon && 'pl-11',
            className,
          )}
          {...rest}
        />
      </div>
      {message && (
        <p id={messageId} className={fieldMessageClass(Boolean(error))}>
          {message}
        </p>
      )}
    </div>
  );
});
