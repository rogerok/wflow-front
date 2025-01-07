import React, { ComponentProps, FC } from 'react';

import { Flex } from '../Flex/Flex';

type VStackProps = Omit<ComponentProps<typeof Flex>, 'direction'>;

export const VStack: FC<VStackProps> = (props) => {
  return <Flex direction={'column'} {...props} />;
};
