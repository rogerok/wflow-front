// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Decorator,
  Preview,
  ReactRenderer,
  StoryContext,
  StoryFn,
} from '@storybook/react';
import {
  createMemoryHistory,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router';

const rootRoute = new RootRoute();
const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/' });
const memoryHistory = createMemoryHistory({ initialEntries: ['/'] });
const routeTree = rootRoute.addChildren([indexRoute]);
const router = new Router({ routeTree, history: memoryHistory });

// @ts-expect-error todo maybe soon a better solution for this?
export const withSbTanstackRouter: Preview['decorators'][0] = (
  Story: StoryFn,
  context: StoryContext<ReactRenderer>
) => {
  return (
    <RouterProvider
      router={router}
      defaultComponent={() => <Story {...context} />}
    />
  );
};

export const SbDecorator: Decorator = (Story, args) => (
  <>{withSbTanstackRouter(Story, args)}</>
);
