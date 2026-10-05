import { Fragment } from 'react';
import { cn } from '../../utils/cn';

function Chevron() {
  return (
    <svg className="h-4 w-4 shrink-0 text-field-placeholder" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const linkClass = cn(
  'rounded text-brand hover:underline',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
);

/**
 * Breadcrumb trail. The last item is the current page (aria-current="page") and is not a link.
 *
 * items: Array<{ label: ReactNode, href?: string, onClick?: (e) => void }>
 * An item without href or onClick renders as plain text.
 */
export function Breadcrumbs({ items = [], separator, className, ...rest }) {
  const sep = separator ?? <Chevron />;
  const last = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={cn('font-brand', className)} {...rest}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm">
        {items.map((item, i) => {
          const isCurrent = i === last;
          const interactive = !isCurrent && (item.href || item.onClick);
          return (
            <Fragment key={i}>
              <li className="inline-flex items-center gap-2">
                {interactive ? (
                  <a href={item.href} onClick={item.onClick} className={linkClass}>
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={isCurrent ? 'page' : undefined}
                    className={isCurrent ? 'font-semibold text-field-label' : 'text-gray-600'}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isCurrent && (
                <li aria-hidden="true" role="presentation" className="inline-flex items-center">
                  {sep}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
