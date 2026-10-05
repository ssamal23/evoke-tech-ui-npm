import { useId, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

/**
 * Accessible tabs (WAI-ARIA tabs pattern) with arrow / Home / End keys.
 *
 * items: Array<{ value: string, label: ReactNode, content?: ReactNode, disabled?: boolean }>
 * Works controlled (value + onChange(value)) or uncontrolled (defaultValue).
 * Only the active panel is rendered.
 */
export function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  'aria-label': ariaLabel,
  className,
  listClassName,
  panelClassName,
}) {
  const baseId = useId();
  const listRef = useRef(null);
  const firstEnabled = items.find((i) => !i.disabled)?.value;
  const [inner, setInner] = useState(defaultValue ?? firstEnabled);
  const current = value !== undefined ? value : inner;

  const select = (next) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const handleKeyDown = (e) => {
    const enabled = items.filter((i) => !i.disabled);
    const idx = enabled.findIndex((i) => i.value === current);
    let target;
    if (e.key === 'ArrowRight') target = enabled[(idx + 1) % enabled.length];
    else if (e.key === 'ArrowLeft') target = enabled[(idx - 1 + enabled.length) % enabled.length];
    else if (e.key === 'Home') target = enabled[0];
    else if (e.key === 'End') target = enabled[enabled.length - 1];
    else return;

    e.preventDefault();
    if (!target) return;
    select(target.value);
    listRef.current?.querySelector(`[data-value="${CSS.escape(target.value)}"]`)?.focus();
  };

  const active = items.find((i) => i.value === current);

  return (
    <div className={cn('font-brand', className)}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className={cn('flex gap-6 overflow-x-auto border-b border-field-border', listClassName)}
      >
        {items.map((item) => {
          const selected = item.value === current;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              data-value={item.value}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              className={cn(
                '-mb-px cursor-pointer whitespace-nowrap font-brand rounded-t border-b-2 px-1 pb-3 pt-2 text-base font-semibold transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                selected
                  ? 'border-brand text-brand'
                  : 'border-transparent text-field-placeholder hover:text-field-label',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {active && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${active.value}`}
          aria-labelledby={`${baseId}-tab-${active.value}`}
          tabIndex={0}
          className={cn('rounded pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40', panelClassName)}
        >
          {active.content}
        </div>
      )}
    </div>
  );
}
