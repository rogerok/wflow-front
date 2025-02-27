import React, { ElementType, ReactElement } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps<T extends ElementType = 'div'> = FlexProps<T>;

export const VStack = <T extends ElementType = 'div'>(
  props: VStackProps<T>,
): ReactElement => {
  return <Flex {...props} direction={'column'} />;
};
