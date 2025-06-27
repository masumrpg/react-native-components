import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Center,
  HDivider,
  VDivider,
  Typography,
} from 'rnc-theme';

const DividerScreen = () => {
  return (
    <VStack themed flex={1} padding="lg" spacing="md">
      {/* Header */}
      <Box padding="md" backgroundColor="blue" borderRadius="md">
        <Center>
          <Typography style={{ color: 'white', fontSize: 18 }}>
            Header
          </Typography>
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
          <Typography>Left Content</Typography>
        </Box>

        <VDivider thickness={1} length="100%" />

        <Box
          flex={2}
          padding="md"
          backgroundColor="lightblue"
          borderRadius="sm"
        >
          <Typography>Right Content</Typography>
        </Box>
      </HStack>

      <HDivider thickness={2} color="blue" margin="md" />

      {/* Footer */}
      <Center padding="md" backgroundColor="gray" borderRadius="md">
        <Typography style={{ color: 'white' }}>Footer</Typography>
      </Center>
    </VStack>
  );
};

export default DividerScreen;
