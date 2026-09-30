import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('is hidden until hover, then describes the trigger', async () => {
    render(
      <Tooltip content="More info">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).toBeNull();
    await userEvent.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('More info');
    expect(screen.getByRole('button')).toHaveAccessibleDescription('More info');
    await userEvent.unhover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows on keyboard focus and hides on blur', async () => {
    render(
      <Tooltip content="Tip">
        <button>Trigger</button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('closes on Escape', async () => {
    render(
      <Tooltip content="Tip">
        <button>Trigger</button>
      </Tooltip>,
    );
    await userEvent.tab();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('renders just the child when there is no content', async () => {
    render(
      <Tooltip content="">
        <button>Trigger</button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});
