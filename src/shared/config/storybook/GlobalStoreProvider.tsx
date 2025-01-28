// import { GlobalStoreContextProvider } from '@shared';
// import {
//   Decorator,
//   Preview,
//   ReactRenderer,
//   StoryContext,
//   StoryFn,
// } from '@storybook/react';
//
// // @ts-expect-error todo maybe soon a better solution for this?
// export const withGlobalStore: Preview['decorators'][0] = (
//   Story: StoryFn,
//   context: StoryContext<ReactRenderer>,
// ) => {
//   return (
//     <GlobalStoreContextProvider>
//       <Story {...context} />
//     </GlobalStoreContextProvider>
//   );
// };
//
// export const GlobalStoreDecorator: Decorator = (Story, args) => (
//   <>{withGlobalStore(Story, args)}</>
// );
