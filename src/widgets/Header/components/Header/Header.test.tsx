import { componentRender } from '@shared/tests/componentRender/componentRender';
import { act } from '@testing-library/react';

import { Header } from './Header';

describe('Header test', () => {
  it('should render', async () => {
    await act(async () => {
      componentRender(<Header />);
    });
  });
});
