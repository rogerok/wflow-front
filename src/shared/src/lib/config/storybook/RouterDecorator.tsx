import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { StoryFn } from '@storybook/react';
import { ReactElement } from 'react';

const rootRoute = createRootRoute();
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

const router = createRouter({ routeTree: rootRoute.addChildren([indexRoute]) });

export const SbRouterDecorator = (StoryComponent: StoryFn): ReactElement => (
  <RouterProvider router={router} defaultComponent={() => <StoryComponent />} />
);
