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
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
            🔲 Grid Layout Examples
          </Text>

          {/* 2 Column Grid - 2 Kiri, 2 Kanan */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              2 Column Grid (2 Kiri, 2 Kanan)
            </Text>
            <Grid columns={2} spacing="sm">
              <Box
                padding="md"
                backgroundColor="#E3F2FD"
                borderRadius="md"
                borderWidth={1}
                borderColor="#BBDEFB"
              >
                <Center>
                  <Text style={{ fontWeight: 'bold', color: '#1976D2' }}>
                    📱 Mobile
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#1976D2', marginTop: 4 }}
                  >
                    Responsive Design
                  </Text>
                </Center>
              </Box>
              <Box
                padding="md"
                backgroundColor="#E8F5E8"
                borderRadius="md"
                borderWidth={1}
                borderColor="#C8E6C9"
              >
                <Center>
                  <Text style={{ fontWeight: 'bold', color: '#388E3C' }}>
                    💻 Desktop
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#388E3C', marginTop: 4 }}
                  >
                    Web Application
                  </Text>
                </Center>
              </Box>
              <Box
                padding="md"
                backgroundColor="#FFEBEE"
                borderRadius="md"
                borderWidth={1}
                borderColor="#FFCDD2"
              >
                <Center>
                  <Text style={{ fontWeight: 'bold', color: '#D32F2F' }}>
                    🎨 Design
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#D32F2F', marginTop: 4 }}
                  >
                    UI/UX Components
                  </Text>
                </Center>
              </Box>
              <Box
                padding="md"
                backgroundColor="#FFF3E0"
                borderRadius="md"
                borderWidth={1}
                borderColor="#FFE0B2"
              >
                <Center>
                  <Text style={{ fontWeight: 'bold', color: '#F57C00' }}>
                    ⚡ Performance
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#F57C00', marginTop: 4 }}
                  >
                    Fast & Optimized
                  </Text>
                </Center>
              </Box>
            </Grid>
          </VStack>

          <HDivider thickness={1} color="#E0E0E0" margin="sm" />

          {/* 3 Column Grid - 2 Kiri, 2 Tengah, 2 Kanan */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              3 Column Grid (2 Kiri, 2 Tengah, 2 Kanan)
            </Text>
            <Grid columns={3} spacing="xs">
              <Box padding="sm" backgroundColor="#FF6B6B" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    🏠 Home
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#4ECDC4" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    👤 Profile
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#45B7D1" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    ⚙️ Settings
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#96CEB4" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    📊 Analytics
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#FFEAA7" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: '#333', fontSize: 11, fontWeight: 'bold' }}
                  >
                    💬 Messages
                  </Text>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#DDA0DD" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    🔔 Notifications
                  </Text>
                </Center>
              </Box>
            </Grid>
          </VStack>

          <HDivider thickness={1} color="#E0E0E0" margin="sm" />

          {/* 4 Column Grid - 2 per baris */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              4 Column Grid (2 per baris)
            </Text>
            <Grid columns={4} spacing="xs">
              <Box padding="xs" backgroundColor="#FF5722" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📈
                  </Text>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#9C27B0" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📉
                  </Text>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#2196F3" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📊
                  </Text>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#4CAF50" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📋
                  </Text>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#FF9800" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    🎯
                  </Text>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#607D8B" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    🔍
                  </Text>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#795548" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📝
                  </Text>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#E91E63" borderRadius="sm">
                <Center>
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    ❤️
                  </Text>
                </Center>
              </Box>
            </Grid>
          </VStack>

          <HDivider thickness={1} color="#E0E0E0" margin="sm" />

          {/* 5 Column Grid */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              5 Column Grid (Compact Layout)
            </Text>
            <Grid columns={5} spacing="xs">
              {['🌟', '⭐', '✨', '💫', '🌙', '☀️', '🌈', '🔥', '💎', '🎉'].map(
                (emoji, index) => (
                  <Box
                    key={index}
                    padding="xs"
                    backgroundColor={`hsl(${index * 36}, 70%, 60%)`}
                    borderRadius="sm"
                  >
                    <Center>
                      <Text style={{ fontSize: 12 }}>{emoji}</Text>
                    </Center>
                  </Box>
                )
              )}
            </Grid>
          </VStack>
        </VStack>

        <HDivider thickness={2} color="primary" margin="md" />

        {/* Stack Layout Section */}
        <VStack spacing="md">
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
            📚 Stack Layout Examples
          </Text>

          {/* Horizontal Stack */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              Horizontal Stack with Flex
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
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#1976D2',
                    fontWeight: 'bold',
                  }}
                >
                  📱 Mobile First
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#1976D2',
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Responsive Design
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
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#7B1FA2',
                    fontWeight: 'bold',
                  }}
                >
                  💻 Desktop Enhanced
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#7B1FA2',
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  More space for content and features
                </Text>
              </Box>
            </HStack>
          </VStack>

          {/* Vertical Stack */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              Vertical Stack with Status
            </Text>
            <VStack spacing="sm">
              <Box
                padding="md"
                backgroundColor="#E8F5E8"
                borderRadius="md"
                borderWidth={1}
                borderColor="#A5D6A7"
              >
                <HStack spacing="sm" align="center">
                  <Text style={{ fontSize: 16 }}>✅</Text>
                  <VStack flex={1}>
                    <Text style={{ color: '#388E3C', fontWeight: 'bold' }}>
                      Task Completed
                    </Text>
                    <Text style={{ color: '#388E3C', fontSize: 12 }}>
                      All tests passed successfully
                    </Text>
                  </VStack>
                </HStack>
              </Box>
              <Box
                padding="md"
                backgroundColor="#FFF3E0"
                borderRadius="md"
                borderWidth={1}
                borderColor="#FFCC02"
              >
                <HStack spacing="sm" align="center">
                  <Text style={{ fontSize: 16 }}>⚠️</Text>
                  <VStack flex={1}>
                    <Text style={{ color: '#F57C00', fontWeight: 'bold' }}>
                      Warning
                    </Text>
                    <Text style={{ color: '#F57C00', fontSize: 12 }}>
                      Some issues need attention
                    </Text>
                  </VStack>
                </HStack>
              </Box>
              <Box
                padding="md"
                backgroundColor="#FFEBEE"
                borderRadius="md"
                borderWidth={1}
                borderColor="#EF5350"
              >
                <HStack spacing="sm" align="center">
                  <Text style={{ fontSize: 16 }}>❌</Text>
                  <VStack flex={1}>
                    <Text style={{ color: '#D32F2F', fontWeight: 'bold' }}>
                      Error
                    </Text>
                    <Text style={{ color: '#D32F2F', fontSize: 12 }}>
                      Build failed, please check logs
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </VStack>
        </VStack>

        <HDivider thickness={2} color="primary" margin="md" />

        {/* Card Layout Section */}
        <VStack spacing="md">
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
            🃏 Card Layout Examples
          </Text>

          <Grid columns={2} spacing="md">
            <Box variant="card">
              <VStack spacing="sm">
                <HStack spacing="sm" align="center">
                  <Text style={{ fontSize: 20 }}>📱</Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
                  >
                    Mobile App
                  </Text>
                </HStack>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  Cross-platform mobile application with native performance.
                </Text>
                <Box padding="sm" backgroundColor="primary" borderRadius="sm">
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    Download
                  </Text>
                </Box>
              </VStack>
            </Box>

            <Box variant="card">
              <VStack spacing="sm">
                <HStack spacing="sm" align="center">
                  <Text style={{ fontSize: 20 }}>💻</Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
                  >
                    Web Platform
                  </Text>
                </HStack>
                <Text style={{ fontSize: 14, color: '#666' }}>
                  Modern web application with responsive design and PWA support.
                </Text>
                <Box padding="sm" backgroundColor="secondary" borderRadius="sm">
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    Launch
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Grid>

          {/* Feature Cards Grid */}
          <VStack spacing="sm">
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
              Feature Cards (3 Column)
            </Text>
            <Grid columns={3} spacing="sm">
              <Box variant="card" style={{ padding: 12 }}>
                <Center>
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>🚀</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                    }}
                  >
                    Fast
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#666',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Lightning speed
                  </Text>
                </Center>
              </Box>
              <Box variant="card" style={{ padding: 12 }}>
                <Center>
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>🔒</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                    }}
                  >
                    Secure
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#666',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Bank-level security
                  </Text>
                </Center>
              </Box>
              <Box variant="card" style={{ padding: 12 }}>
                <Center>
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>📱</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                    }}
                  >
                    Mobile
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#666',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Mobile optimized
                  </Text>
                </Center>
              </Box>
            </Grid>
          </VStack>
        </VStack>

        {/* Footer */}
        <Box
          padding="lg"
          backgroundColor="#2C3E50"
          borderRadius="lg"
          style={{ marginTop: 24, marginBottom: 16 }}
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
