import { RouterProvider } from '@tanstack/react-router';
import { render, RenderResult } from '@testing-library/react';
import { JSX, ReactNode } from 'react';

import { router } from '../../../app/app';
import { GlobalStoreContextProvider, useGlobalStore } from '../../stores';
import { RouterType } from '../../types';

interface TestProviderProps {
  children: ReactNode;
  router: RouterType;
}

export const TestProvider = ({
  children,
  router,
}: TestProviderProps): ReactNode => {
  return (
    <GlobalStoreContextProvider router={router}>
      <InnerTestProvider>{children}</InnerTestProvider>
    </GlobalStoreContextProvider>
  );
};

const InnerTestProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { authController, userService } = useGlobalStore();
  userService.setUserData({
    firstName: 'John',
    email: 'john@example.com',
    createdAt: '2021-01-12',
    lastName: null,
    middleName: null,
    pseudonym: { firstName: null, lastName: null },
    socialLinks: {
      instagram: null,
      telegram: null,
      tiktok: null,
      vk: null,
    },
    bornDate: null,
  });

  return (
    <RouterProvider
      router={router}
      context={{
        isAuth: userService.isAuth,
        authController: authController,
      }}
      defaultComponent={() => children}
    />
  );
};

export const componentRender = (
  component: ReactNode,
  customRouter: RouterType = router,
): RenderResult => {
  return render(<TestProvider router={customRouter}>{component}</TestProvider>);
};
