import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
  VStack,
  HStack,
  Box,
  Center,
  HDivider,
  VDivider,
  Grid,
} from 'rnc-theme';

const LayoutScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <VStack flex={1} padding="lg" spacing="lg">
        {/* Header Section */}
        <Box padding="lg" backgroundColor="primary" borderRadius="lg">
          <Center>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              Layout Components Demo
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                opacity: 0.8,
                marginTop: 4,
              }}
            >
              Showcase of Grid, Stack, and Box components
            </Text>
          </Center>
        </Box>

        {/* Grid Section */}
        <VStack spacing="md">
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
            Grid Layout Examples
          </Text>

          {/* 2 Column Grid */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              2 Column Grid
            </Text>
            <Grid columns={2} spacing="sm">
              <Box padding="md" backgroundColor="lightblue" borderRadius="md">
                <Center>
                  <Text style={{ fontWeight: 'bold' }}>Item 1</Text>
                </Center>
              </Box>
              <Box padding="md" backgroundColor="lightgreen" borderRadius="md">
                <Center>
                  <Text style={{ fontWeight: 'bold' }}>Item 2</Text>
                </Center>
              </Box>
              <Box padding="md" backgroundColor="lightcoral" borderRadius="md">
                <Center>
                  <Text style={{ fontWeight: 'bold' }}>Item 3</Text>
                </Center>
              </Box>
              <Box padding="md" backgroundColor="lightyellow" borderRadius="md">
                <Center>
                  <Text style={{ fontWeight: 'bold' }}>Item 4</Text>
                </Center>
              </Box>
            </Grid>
          </VStack>

          <HDivider thickness={1} color="#E0E0E0" margin="sm" />

          {/* 3 Column Grid */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              3 Column Grid
            </Text>
            <Grid columns={3} spacing="xs">
              <Box padding="sm" backgroundColor="#FF6B6B" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    A
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#4ECDC4" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    B
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#45B7D1" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    C
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#96CEB4" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    D
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#FFEAA7" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: '#333', fontSize: 12, fontWeight: 'bold' }}
                  >
                    E
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#DDA0DD" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    F
                  </Text>
                </Center>
              </Box>
            </Grid>
          </VStack>
        </VStack>

        <HDivider thickness={2} color="primary" margin="md" />

        {/* Stack Layout Section */}
        <VStack spacing="md">
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
            Stack Layout Examples
          </Text>

          {/* Horizontal Stack */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              Horizontal Stack
            </Text>
            <HStack spacing="md" justify="space-between">
              <Box
                flex={1}
                padding="md"
                backgroundColor="#E8F4FD"
                borderRadius="md"
                borderWidth={1}
                borderColor="#B3D9FF"
              >
                <Text style={{ textAlign: 'center', color: '#1976D2' }}>
                  Flex 1
                </Text>
              </Box>

              <VDivider thickness={2} color="#E0E0E0" />

              <Box
                flex={2}
                padding="md"
                backgroundColor="#F3E5F5"
                borderRadius="md"
                borderWidth={1}
                borderColor="#CE93D8"
              >
                <Text style={{ textAlign: 'center', color: '#7B1FA2' }}>
                  Flex 2
                </Text>
              </Box>
            </HStack>
          </VStack>

          {/* Vertical Stack */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              Vertical Stack
            </Text>
            <VStack spacing="sm">
              <Box
                padding="md"
                backgroundColor="#E8F5E8"
                borderRadius="md"
                borderWidth={1}
                borderColor="#A5D6A7"
              >
                <Text style={{ textAlign: 'center', color: '#388E3C' }}>
                  First Item
                </Text>
              </Box>
              <Box
                padding="md"
                backgroundColor="#FFF3E0"
                borderRadius="md"
                borderWidth={1}
                borderColor="#FFCC02"
              >
                <Text style={{ textAlign: 'center', color: '#F57C00' }}>
                  Second Item
                </Text>
              </Box>
              <Box
                padding="md"
                backgroundColor="#FFEBEE"
                borderRadius="md"
                borderWidth={1}
                borderColor="#EF5350"
              >
                <Text style={{ textAlign: 'center', color: '#D32F2F' }}>
                  Third Item
                </Text>
              </Box>
            </VStack>
          </VStack>
        </VStack>

        <HDivider thickness={2} color="primary" margin="md" />

        {/* Card Layout Section */}
        <VStack spacing="md">
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
            Card Layout Examples
          </Text>

          <Grid columns={2} spacing="md">
            <Box variant="card">
              <VStack spacing="sm">
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
                >
                  Card 1
                </Text>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  This is a sample card with some content inside.
                </Text>
                <Box padding="sm" backgroundColor="primary" borderRadius="sm">
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                    }}
                  >
                    Action
                  </Text>
                </Box>
              </VStack>
            </Box>

            <Box variant="card">
              <VStack spacing="sm">
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
                >
                  Card 2
                </Text>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  Another card with different content and styling.
                </Text>
                <Box padding="sm" backgroundColor="secondary" borderRadius="sm">
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                    }}
                  >
                    Button
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Grid>
        </VStack>

        {/* Footer */}
        <Box
          padding="lg"
          backgroundColor="#2C3E50"
          borderRadius="lg"
          margin="md"
        >
          <Center>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              🎉 Layout Demo Complete
            </Text>
            <Text style={{ color: '#BDC3C7', fontSize: 12, marginTop: 4 }}>
              Powered by RNC Theme Components
            </Text>
          </Center>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default LayoutScreen;
