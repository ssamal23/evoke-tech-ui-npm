import type {
  ButtonHTMLAttributes,
  ElementType,
  FieldsetHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  RefAttributes,
  SelectHTMLAttributes,
} from 'react';

export type ComponentSize = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default 'primary' */
  variant?: ButtonVariant;
  /** @default 'md' */
  size?: ComponentSize;
  /** Shows a spinner and disables the button. @default false */
  loading?: boolean;
  /** Stretch to the container width. @default false */
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  helperText?: ReactNode;
  /** Error message; switches to error styling and replaces helperText. */
  error?: ReactNode;
  /** @default 'md' */
  size?: ComponentSize;
  leftIcon?: ReactNode;
  /** @default true */
  fullWidth?: boolean;
  /** Class name for the wrapper element around label, input and message. */
  containerClassName?: string;
}

export interface DropdownOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options?: DropdownOption[];
  /** Disabled first option shown until a value is chosen. */
  placeholder?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  /** Error message; switches to error styling and replaces helperText. */
  error?: ReactNode;
  /** @default 'md' */
  size?: ComponentSize;
  /** @default true */
  fullWidth?: boolean;
  /** Class name for the wrapper element around label, select and message. */
  containerClassName?: string;
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  helperText?: ReactNode;
  /** Error message; switches to error styling and replaces helperText. */
  error?: ReactNode;
  /** @default 'md' */
  size?: ComponentSize;
  /** Shows the mixed state (dash). @default false */
  indeterminate?: boolean;
  /** Class name for the wrapper element. */
  containerClassName?: string;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  /** Defaults to the group's size inside a RadioGroup. @default 'md' */
  size?: ComponentSize;
  containerClassName?: string;
}

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'defaultValue'> {
  label?: ReactNode;
  /** Renders a Radio per option. Omit to pass <Radio> children instead. */
  options?: RadioOption[];
  name?: string;
  /** Selected value (controlled). */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** @default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** @default 'md' */
  size?: ComponentSize;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export interface TabItem {
  value: string;
  label: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items?: TabItem[];
  /** Selected tab (controlled). */
  value?: string;
  /** Initially selected tab when uncontrolled. Defaults to the first enabled tab. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  'aria-label'?: string;
  className?: string;
  listClassName?: string;
  panelClassName?: string;
}

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The last item is the current page. */
  items?: BreadcrumbItem[];
  /** Replaces the default chevron. */
  separator?: ReactNode;
}

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content?: ReactNode;
  /** @default 'top' */
  placement?: TooltipPlacement;
  /** A single focusable element. */
  children: ReactNode;
  /** Class name for the tooltip bubble. */
  className?: string;
}

export interface SideNavItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  /** Makes the item an expandable group (one level deep). */
  children?: SideNavItem[];
}

export interface SideNavProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'onSelect'> {
  items?: SideNavItem[];
  /** `value` of the current page. */
  activeValue?: string;
  onSelect?: (value: string, item: SideNavItem) => void;
  header?: ReactNode;
  footer?: ReactNode;
}

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1' | 'p2' | 'p3' | 'p4';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** @default 'p1' */
  variant?: TypographyVariant;
  /** Element to render; defaults to h1–h6 or p from the variant. */
  as?: ElementType;
}

export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;
export declare const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;
export declare const Dropdown: ForwardRefExoticComponent<DropdownProps & RefAttributes<HTMLSelectElement>>;
export declare const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>>;
export declare const Radio: ForwardRefExoticComponent<RadioProps & RefAttributes<HTMLInputElement>>;
export declare function RadioGroup(props: RadioGroupProps): ReactElement;
export declare function Tabs(props: TabsProps): ReactElement;
export declare function Breadcrumbs(props: BreadcrumbsProps): ReactElement;
export declare function Tooltip(props: TooltipProps): ReactElement;
export declare function SideNav(props: SideNavProps): ReactElement;
export declare const Typography: ForwardRefExoticComponent<TypographyProps & RefAttributes<HTMLElement>>;
export declare const typographyVariants: Record<TypographyVariant, { tag: string; className: string }>;

/** Joins truthy class names into a single string. */
export declare function cn(...classes: Array<string | false | null | undefined | 0>): string;
