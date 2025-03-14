/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './app/routes/__root'
import { Route as ProtectedImport } from './app/routes/_protected'
import { Route as IndexImport } from './app/routes/index'
import { Route as authSignInImport } from './app/routes/(auth)/signIn'

// Create Virtual Routes

const ProtectedStatisticLazyImport = createFileRoute('/_protected/statistic')()
const ProtectedSettingsLazyImport = createFileRoute('/_protected/settings')()
const ProtectedReportsLazyImport = createFileRoute('/_protected/reports')()
const ProtectedProfileLazyImport = createFileRoute('/_protected/profile')()
const authSignUpLazyImport = createFileRoute('/(auth)/signUp')()
const ProtectedGoalsIndexLazyImport = createFileRoute('/_protected/goals/')()
const ProtectedBooksIndexLazyImport = createFileRoute('/_protected/books/')()
const ProtectedGoalsCreateLazyImport = createFileRoute(
  '/_protected/goals/create',
)()
const ProtectedGoalsGoalIdLazyImport = createFileRoute(
  '/_protected/goals/$goalId',
)()
const ProtectedBooksCreateLazyImport = createFileRoute(
  '/_protected/books/create',
)()
const ProtectedBooksBookIdLazyImport = createFileRoute(
  '/_protected/books/$bookId',
)()

// Create/Update Routes

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedStatisticLazyRoute = ProtectedStatisticLazyImport.update({
  id: '/statistic',
  path: '/statistic',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/statistic.lazy').then((d) => d.Route),
)

const ProtectedSettingsLazyRoute = ProtectedSettingsLazyImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/settings.lazy').then((d) => d.Route),
)

const ProtectedReportsLazyRoute = ProtectedReportsLazyImport.update({
  id: '/reports',
  path: '/reports',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/reports.lazy').then((d) => d.Route),
)

const ProtectedProfileLazyRoute = ProtectedProfileLazyImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/profile.lazy').then((d) => d.Route),
)

const authSignUpLazyRoute = authSignUpLazyImport
  .update({
    id: '/(auth)/signUp',
    path: '/signUp',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./app/routes/(auth)/signUp.lazy').then((d) => d.Route))

const authSignInRoute = authSignInImport.update({
  id: '/(auth)/signIn',
  path: '/signIn',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedGoalsIndexLazyRoute = ProtectedGoalsIndexLazyImport.update({
  id: '/goals/',
  path: '/goals/',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/goals/index.lazy').then((d) => d.Route),
)

const ProtectedBooksIndexLazyRoute = ProtectedBooksIndexLazyImport.update({
  id: '/books/',
  path: '/books/',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/books/index.lazy').then((d) => d.Route),
)

const ProtectedGoalsCreateLazyRoute = ProtectedGoalsCreateLazyImport.update({
  id: '/goals/create',
  path: '/goals/create',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/goals/create.lazy').then((d) => d.Route),
)

const ProtectedGoalsGoalIdLazyRoute = ProtectedGoalsGoalIdLazyImport.update({
  id: '/goals/$goalId',
  path: '/goals/$goalId',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/goals/$goalId.lazy').then((d) => d.Route),
)

const ProtectedBooksCreateLazyRoute = ProtectedBooksCreateLazyImport.update({
  id: '/books/create',
  path: '/books/create',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/books/create.lazy').then((d) => d.Route),
)

const ProtectedBooksBookIdLazyRoute = ProtectedBooksBookIdLazyImport.update({
  id: '/books/$bookId',
  path: '/books/$bookId',
  getParentRoute: () => ProtectedRoute,
} as any).lazy(() =>
  import('./app/routes/_protected/books/$bookId.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signIn': {
      id: '/(auth)/signIn'
      path: '/signIn'
      fullPath: '/signIn'
      preLoaderRoute: typeof authSignInImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signUp': {
      id: '/(auth)/signUp'
      path: '/signUp'
      fullPath: '/signUp'
      preLoaderRoute: typeof authSignUpLazyImport
      parentRoute: typeof rootRoute
    }
    '/_protected/profile': {
      id: '/_protected/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProtectedProfileLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/reports': {
      id: '/_protected/reports'
      path: '/reports'
      fullPath: '/reports'
      preLoaderRoute: typeof ProtectedReportsLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/settings': {
      id: '/_protected/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof ProtectedSettingsLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/statistic': {
      id: '/_protected/statistic'
      path: '/statistic'
      fullPath: '/statistic'
      preLoaderRoute: typeof ProtectedStatisticLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/books/$bookId': {
      id: '/_protected/books/$bookId'
      path: '/books/$bookId'
      fullPath: '/books/$bookId'
      preLoaderRoute: typeof ProtectedBooksBookIdLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/books/create': {
      id: '/_protected/books/create'
      path: '/books/create'
      fullPath: '/books/create'
      preLoaderRoute: typeof ProtectedBooksCreateLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/goals/$goalId': {
      id: '/_protected/goals/$goalId'
      path: '/goals/$goalId'
      fullPath: '/goals/$goalId'
      preLoaderRoute: typeof ProtectedGoalsGoalIdLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/goals/create': {
      id: '/_protected/goals/create'
      path: '/goals/create'
      fullPath: '/goals/create'
      preLoaderRoute: typeof ProtectedGoalsCreateLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/books/': {
      id: '/_protected/books/'
      path: '/books'
      fullPath: '/books'
      preLoaderRoute: typeof ProtectedBooksIndexLazyImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/goals/': {
      id: '/_protected/goals/'
      path: '/goals'
      fullPath: '/goals'
      preLoaderRoute: typeof ProtectedGoalsIndexLazyImport
      parentRoute: typeof ProtectedImport
    }
  }
}

// Create and export the route tree

interface ProtectedRouteChildren {
  ProtectedProfileLazyRoute: typeof ProtectedProfileLazyRoute
  ProtectedReportsLazyRoute: typeof ProtectedReportsLazyRoute
  ProtectedSettingsLazyRoute: typeof ProtectedSettingsLazyRoute
  ProtectedStatisticLazyRoute: typeof ProtectedStatisticLazyRoute
  ProtectedBooksBookIdLazyRoute: typeof ProtectedBooksBookIdLazyRoute
  ProtectedBooksCreateLazyRoute: typeof ProtectedBooksCreateLazyRoute
  ProtectedGoalsGoalIdLazyRoute: typeof ProtectedGoalsGoalIdLazyRoute
  ProtectedGoalsCreateLazyRoute: typeof ProtectedGoalsCreateLazyRoute
  ProtectedBooksIndexLazyRoute: typeof ProtectedBooksIndexLazyRoute
  ProtectedGoalsIndexLazyRoute: typeof ProtectedGoalsIndexLazyRoute
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedProfileLazyRoute: ProtectedProfileLazyRoute,
  ProtectedReportsLazyRoute: ProtectedReportsLazyRoute,
  ProtectedSettingsLazyRoute: ProtectedSettingsLazyRoute,
  ProtectedStatisticLazyRoute: ProtectedStatisticLazyRoute,
  ProtectedBooksBookIdLazyRoute: ProtectedBooksBookIdLazyRoute,
  ProtectedBooksCreateLazyRoute: ProtectedBooksCreateLazyRoute,
  ProtectedGoalsGoalIdLazyRoute: ProtectedGoalsGoalIdLazyRoute,
  ProtectedGoalsCreateLazyRoute: ProtectedGoalsCreateLazyRoute,
  ProtectedBooksIndexLazyRoute: ProtectedBooksIndexLazyRoute,
  ProtectedGoalsIndexLazyRoute: ProtectedGoalsIndexLazyRoute,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteWithChildren
  '/signIn': typeof authSignInRoute
  '/signUp': typeof authSignUpLazyRoute
  '/profile': typeof ProtectedProfileLazyRoute
  '/reports': typeof ProtectedReportsLazyRoute
  '/settings': typeof ProtectedSettingsLazyRoute
  '/statistic': typeof ProtectedStatisticLazyRoute
  '/books/$bookId': typeof ProtectedBooksBookIdLazyRoute
  '/books/create': typeof ProtectedBooksCreateLazyRoute
  '/goals/$goalId': typeof ProtectedGoalsGoalIdLazyRoute
  '/goals/create': typeof ProtectedGoalsCreateLazyRoute
  '/books': typeof ProtectedBooksIndexLazyRoute
  '/goals': typeof ProtectedGoalsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteWithChildren
  '/signIn': typeof authSignInRoute
  '/signUp': typeof authSignUpLazyRoute
  '/profile': typeof ProtectedProfileLazyRoute
  '/reports': typeof ProtectedReportsLazyRoute
  '/settings': typeof ProtectedSettingsLazyRoute
  '/statistic': typeof ProtectedStatisticLazyRoute
  '/books/$bookId': typeof ProtectedBooksBookIdLazyRoute
  '/books/create': typeof ProtectedBooksCreateLazyRoute
  '/goals/$goalId': typeof ProtectedGoalsGoalIdLazyRoute
  '/goals/create': typeof ProtectedGoalsCreateLazyRoute
  '/books': typeof ProtectedBooksIndexLazyRoute
  '/goals': typeof ProtectedGoalsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_protected': typeof ProtectedRouteWithChildren
  '/(auth)/signIn': typeof authSignInRoute
  '/(auth)/signUp': typeof authSignUpLazyRoute
  '/_protected/profile': typeof ProtectedProfileLazyRoute
  '/_protected/reports': typeof ProtectedReportsLazyRoute
  '/_protected/settings': typeof ProtectedSettingsLazyRoute
  '/_protected/statistic': typeof ProtectedStatisticLazyRoute
  '/_protected/books/$bookId': typeof ProtectedBooksBookIdLazyRoute
  '/_protected/books/create': typeof ProtectedBooksCreateLazyRoute
  '/_protected/goals/$goalId': typeof ProtectedGoalsGoalIdLazyRoute
  '/_protected/goals/create': typeof ProtectedGoalsCreateLazyRoute
  '/_protected/books/': typeof ProtectedBooksIndexLazyRoute
  '/_protected/goals/': typeof ProtectedGoalsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/signIn'
    | '/signUp'
    | '/profile'
    | '/reports'
    | '/settings'
    | '/statistic'
    | '/books/$bookId'
    | '/books/create'
    | '/goals/$goalId'
    | '/goals/create'
    | '/books'
    | '/goals'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/signIn'
    | '/signUp'
    | '/profile'
    | '/reports'
    | '/settings'
    | '/statistic'
    | '/books/$bookId'
    | '/books/create'
    | '/goals/$goalId'
    | '/goals/create'
    | '/books'
    | '/goals'
  id:
    | '__root__'
    | '/'
    | '/_protected'
    | '/(auth)/signIn'
    | '/(auth)/signUp'
    | '/_protected/profile'
    | '/_protected/reports'
    | '/_protected/settings'
    | '/_protected/statistic'
    | '/_protected/books/$bookId'
    | '/_protected/books/create'
    | '/_protected/goals/$goalId'
    | '/_protected/goals/create'
    | '/_protected/books/'
    | '/_protected/goals/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProtectedRoute: typeof ProtectedRouteWithChildren
  authSignInRoute: typeof authSignInRoute
  authSignUpLazyRoute: typeof authSignUpLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProtectedRoute: ProtectedRouteWithChildren,
  authSignInRoute: authSignInRoute,
  authSignUpLazyRoute: authSignUpLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_protected",
        "/(auth)/signIn",
        "/(auth)/signUp"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/profile",
        "/_protected/reports",
        "/_protected/settings",
        "/_protected/statistic",
        "/_protected/books/$bookId",
        "/_protected/books/create",
        "/_protected/goals/$goalId",
        "/_protected/goals/create",
        "/_protected/books/",
        "/_protected/goals/"
      ]
    },
    "/(auth)/signIn": {
      "filePath": "(auth)/signIn.tsx"
    },
    "/(auth)/signUp": {
      "filePath": "(auth)/signUp.lazy.tsx"
    },
    "/_protected/profile": {
      "filePath": "_protected/profile.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/reports": {
      "filePath": "_protected/reports.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/settings": {
      "filePath": "_protected/settings.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/statistic": {
      "filePath": "_protected/statistic.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/books/$bookId": {
      "filePath": "_protected/books/$bookId.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/books/create": {
      "filePath": "_protected/books/create.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/goals/$goalId": {
      "filePath": "_protected/goals/$goalId.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/goals/create": {
      "filePath": "_protected/goals/create.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/books/": {
      "filePath": "_protected/books/index.lazy.tsx",
      "parent": "/_protected"
    },
    "/_protected/goals/": {
      "filePath": "_protected/goals/index.lazy.tsx",
      "parent": "/_protected"
    }
  }
}
ROUTE_MANIFEST_END */
