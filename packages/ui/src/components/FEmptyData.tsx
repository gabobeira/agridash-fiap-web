import { Center, Text } from '@mantine/core';

export function FEmptyData() {
  return (
    <Center w="100%" h={100} bg="neutral.0" bdrs="md">
      <Text c="neutral.4" size="sm">
        Não há dados para exibir!
      </Text>
    </Center>
  );
}
