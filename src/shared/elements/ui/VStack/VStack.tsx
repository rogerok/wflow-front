import React, { ElementType, FC } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

//TODO: remove direction prop

type VStackProps = FlexProps<ElementType>;

export const VStack: FC<VStackProps> = (props) => {
  return <Flex {...props} direction={'column'} />;
};
