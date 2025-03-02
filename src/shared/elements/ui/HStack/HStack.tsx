import React, { ElementType, ReactElement } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps<T extends ElementType = 'div'> = FlexProps<T>;

export const HStack = <T extends ElementType = 'div'>(
  props: HStackProps<T>,
): ReactElement => {
  return <Flex {...props} direction={'row'} />;
};
