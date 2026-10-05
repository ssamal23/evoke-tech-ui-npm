import { useId, useState } from 'react';
import { cn } from '../../utils/cn';

const itemBase = cn(
  'flex w-full cursor-pointer items-center gap-3 rounded-lg font-brand px-3 py-2.5 text-left text-base font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
  'aria-disabled:cursor-not-allowed aria-disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50',
);

function Caret({ open }) {
  return (
    <svg
      className={cn('ml-auto h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')}
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
  );
}

function NavItem({ item, activeValue, onSelect, nested }) {
  const groupId = useId();
  const hasChildren = Boolean(item.children?.length);
  const containsActive = hasChildren && item.children.some((c) => c.value === activeValue);
  const [open, setOpen] = useState(containsActive);
  const isActive = item.value === activeValue;

  const content = (
    <>
      {item.icon && (
        <span className="h-5 w-5 shrink-0 [&>svg]:h-full [&>svg]:w-full" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className="truncate">{item.label}</span>
      {item.badge != null && (
        <span className="ml-auto rounded-full bg-brand px-2 text-xs font-semibold leading-5 text-white">
          {item.badge}
        </span>
      )}
    </>
  );

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={groupId}
          disabled={item.disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(itemBase, containsActive ? 'text-brand' : 'text-field-label hover:bg-gray-100')}
        >
          {content}
          <Caret open={open} />
        </button>
        {open && (
          <ul id={groupId} className="m-0 mt-1 flex list-none flex-col gap-1 p-0 pl-6">
            {item.children.map((child) => (
              <NavItem key={child.value} item={child} activeValue={activeValue} onSelect={onSelect} nested />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const handleClick = (e) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    item.onClick?.(e);
    onSelect?.(item.value, item);
  };

  const shared = {
    'aria-current': isActive ? 'page' : undefined,
    'aria-disabled': item.disabled || undefined,
    onClick: handleClick,
    className: cn(itemBase, nested && 'text-sm', isActive ? 'bg-brand/10 text-brand' : 'text-field-label hover:bg-gray-100'),
  };

  return (
    <li>
      {item.href ? (
        <a href={item.href} {...shared}>
          {content}
        </a>
      ) : (
        <button type="button" {...shared}>
          {content}
        </button>
      )}
    </li>
  );
}

/**
 * Left navigation.
 *
 * items: Array<{
 *   value: string, label: ReactNode, icon?: ReactNode, badge?: ReactNode,
 *   href?: string, onClick?: (e) => void, disabled?: boolean,
 *   children?: Array<same, one level deep>   // makes it an expandable group
 * }>
 * activeValue marks the current page. onSelect(value, item) fires when a link/button item is chosen.
 * header and footer render above and below the list.
 */
export function SideNav({
  items = [],
  activeValue,
  onSelect,
  header,
  footer,
  'aria-label': ariaLabel = 'Main navigation',
  className,
  ...rest
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn('flex w-64 shrink-0 flex-col gap-4 border-r border-field-border bg-white p-4 font-brand', className)}
      {...rest}
    >
      {header && <div>{header}</div>}
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {items.map((item) => (
          <NavItem key={item.value} item={item} activeValue={activeValue} onSelect={onSelect} />
        ))}
      </ul>
      {footer && <div className="mt-auto">{footer}</div>}
    </nav>
  );
}
