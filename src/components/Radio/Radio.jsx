import { createContext, forwardRef, useContext, useId, useState } from 'react';
import { cn } from '../../utils/cn';

const dotSizes = {
  sm: 'h-4 w-4 before:h-2 before:w-2',
  md: 'h-5 w-5 before:h-2.5 before:w-2.5',
  lg: 'h-6 w-6 before:h-3 before:w-3',
};
const labelSizes = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };

const RadioGroupContext = createContext(null);

/** Styled native radio button. Inside a RadioGroup, name/checked/onChange come from the group. */
export const Radio = forwardRef(function Radio(
  { label, size, id, value, disabled, className, containerClassName, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const resolvedSize = size ?? group?.size ?? 'md';
  const isDisabled = disabled || group?.disabled || false;

  const groupProps = group
    ? {
        name: group.name,
        checked: group.value === value,
        onChange: () => group.onChange(value),
        required: group.required || undefined,
      }
    : {};

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-3 text-field-label',
        labelSizes[resolvedSize] ?? labelSizes.md,
        isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        containerClassName,
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        value={value}
        disabled={isDisabled}
        className={cn(
          'grid shrink-0 appearance-none place-content-center rounded-full border-2 bg-white transition-colors cursor-[inherit]',
          group?.error ? 'border-field-error' : 'border-field-border',
          "before:scale-0 before:rounded-full before:bg-brand before:transition-transform before:content-['']",
          'checked:border-brand checked:before:scale-100',
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand/25',
          dotSizes[resolvedSize] ?? dotSizes.md,
          className,
        )}
        {...rest}
        {...groupProps}
      />
      {label}
    </label>
  );
});

/**
 * Group of radios sharing one name and one selected value.
 *
 * options: Array<{ value: string, label: ReactNode, disabled?: boolean }>
 * Or pass <Radio value="…" label="…" /> children instead.
 * Works controlled (value + onChange(value)) or uncontrolled (defaultValue).
 */
export function RadioGroup({
  label,
  options,
  name,
  value,
  defaultValue = '',
  onChange,
  orientation = 'vertical',
  size = 'md',
  helperText,
  error,
  required = false,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const generatedName = useId();
  const messageId = `${generatedName}-message`;
  const message = error || helperText;
  const [inner, setInner] = useState(defaultValue);
  const current = value !== undefined ? value : inner;

  const handleChange = (next) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const ctx = {
    name: name ?? generatedName,
    value: current,
    onChange: handleChange,
    size,
    required,
    disabled,
    error: Boolean(error),
  };

  return (
    <RadioGroupContext.Provider value={ctx}>
      <fieldset
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn('m-0 flex min-w-0 flex-col gap-2 border-0 p-0', className)}
        {...rest}
      >
        {label && (
          <legend className="mb-1 text-base text-field-label">
            {label}
            {required && <span aria-hidden="true">*</span>}
          </legend>
        )}
        <div className={cn('flex gap-3', orientation === 'horizontal' ? 'flex-row flex-wrap gap-x-6' : 'flex-col')}>
          {options
            ? options.map((opt) => (
                <Radio key={opt.value} value={opt.value} label={opt.label} disabled={opt.disabled} />
              ))
            : children}
        </div>
        {message && (
          <p id={messageId} className={cn('text-sm', error ? 'text-field-error' : 'text-gray-500')}>
            {message}
          </p>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}
