import { cn } from '../../utils/cn';

// Shared look for text-like form controls (Input, Dropdown) so they stay identical.

export const fieldSizes = {
  sm: 'h-10 text-sm',
  md: 'h-12 text-base',
  lg: 'h-14 text-lg',
};

export const fieldPaddingX = {
  sm: 'px-4',
  md: 'px-5',
  lg: 'px-6',
};

export const fieldControlClass = cn(
  'w-full rounded-lg border border-field-border bg-white text-field-label placeholder:text-field-placeholder transition-colors',
  'focus:outline-none focus:border-brand focus:ring-3 focus:ring-brand/15',
  'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60',
);

export const fieldLabelClass = 'text-base text-field-label';

export function fieldMessageClass(isError) {
  return cn('text-sm', isError ? 'text-field-error' : 'text-gray-500');
}
