import { cn } from '../../utils/cn';

// Shared look for text-like form controls (Input, Dropdown) so they stay identical.

export const fieldSizes = {
  sm: 'h-10 text-sm',
  md: 'h-14 text-base',
  lg: 'h-16 text-lg',
};

export const fieldPaddingX = {
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-7',
};

export const fieldPaddingLeft = {
  sm: 'pl-4',
  md: 'pl-6',
  lg: 'pl-7',
};

export const fieldControlClass = cn(
  'w-full rounded-lg border border-field-border bg-white font-brand text-field-label placeholder:text-field-placeholder transition-colors',
  'focus:outline-none focus:border-brand focus:ring-3 focus:ring-brand/15',
  'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60',
);

export const fieldLabelClass = 'font-brand text-base text-field-label';

export function fieldMessageClass(isError) {
  return cn('font-brand text-sm', isError ? 'text-field-error' : 'text-gray-500');
}
