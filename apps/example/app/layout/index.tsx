import React from 'react';
import { Text } from 'react-native';
import { VStack, HStack, Box, Center, HDivider, VDivider } from 'rnc-theme';

const LayoutScreen = () => {
  return (
    <VStack flex={1} padding="lg" spacing="md">
      {/* Header */}
      <Box padding="md" backgroundColor="blue" borderRadius="md">
        <Center>
          <Text style={{ color: 'white', fontSize: 18 }}>Header</Text>
        </Center>
      </Box>

      <HDivider thickness={1} margin="sm" />

      {/* Content */}
      <HStack spacing="md" flex={1}>
        <Box
          flex={1}
          padding="md"
          backgroundColor="lightgray"
          borderRadius="sm"
        >
          <Text>Left Content</Text>
        </Box>

        <VDivider thickness={1} length="100%" />

        <Box
          flex={2}
          padding="md"
          backgroundColor="lightblue"
          borderRadius="sm"
        >
          <Text>Right Content</Text>
        </Box>
      </HStack>

      <HDivider thickness={2} color="blue" margin="md" />

      {/* Footer */}
      <Center padding="md" backgroundColor="gray" borderRadius="md">
        <Text style={{ color: 'white' }}>Footer</Text>
      </Center>
    </VStack>
  );
};

export default LayoutScreen;
