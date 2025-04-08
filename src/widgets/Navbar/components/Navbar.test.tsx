import { logoutRequest } from '@shared/api';
import { componentRender } from '@shared/tests';
import { userEvent } from '@storybook/test';
import { screen } from '@testing-library/react';

import { Navbar } from './Navbar';

const cnExpanded = 'Navbar-Inner_expanded';
const cnCollapsed = 'Navbar-Inner_collapsed';

vi.mock('@shared/api');

const mockedLogout = vi.mocked(logoutRequest);

describe('Navbar tests', () => {
  test('should render correctly', async () => {
    componentRender(<Navbar />);

    expect(await screen.findByTestId('Navbar')).toBeInTheDocument();
  });
  test('should be expanded', async () => {
    componentRender(<Navbar />);

    expect(await screen.findByTestId('NavbarInner')).toHaveClass(cnExpanded);
  });

  test('should toggle collapsed', async () => {
    componentRender(<Navbar />);
    const toggleBtn = screen.getByTestId('NavbarToggleButton');

    screen.debug();
    await userEvent.click(toggleBtn);

    expect(await screen.findByTestId('NavbarInner')).toHaveClass(cnCollapsed);

    await userEvent.click(toggleBtn);
    expect(screen.getByTestId('NavbarInner')).toHaveClass(cnExpanded);
  });

  test('should handle logout', async () => {
    componentRender(<Navbar />);
    const logoutBtn = screen.getByTestId('NavbarLogoutButton');

    await userEvent.click(logoutBtn);

    expect(mockedLogout).toHaveBeenCalledOnce();
  });
});
