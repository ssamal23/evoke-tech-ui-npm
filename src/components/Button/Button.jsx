import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand',
  secondary: 'bg-brand-navy text-white hover:bg-brand-navy/90 focus-visible:ring-brand-navy',
  outline: 'border-2 border-brand bg-transparent text-brand hover:bg-brand hover:text-white focus-visible:ring-brand',
  ghost: 'bg-transparent text-brand hover:bg-brand/10 focus-visible:ring-brand',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
};

const sizes = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-12 px-7 text-base gap-2',
  lg: 'h-14 px-9 text-lg gap-2',
};

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    type = 'button',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
