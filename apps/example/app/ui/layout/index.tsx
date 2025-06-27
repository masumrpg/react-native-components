import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Center,
  HDivider,
  VDivider,
  Grid,
  VScroll,
  Typography,
} from 'rnc-theme';

const LayoutScreen = () => {
  return (
    <VScroll themed style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} padding="lg" spacing="lg">
        {/* Header Section */}
        <Box padding="lg" backgroundColor="primary" borderRadius="lg">
          <Center>
            <Typography style={{ fontSize: 24, fontWeight: 'bold' }}>
              Layout Components Demo
            </Typography>
            <Typography
              style={{
                fontSize: 14,
                opacity: 0.8,
                marginTop: 4,
              }}
            >
              Showcase of Grid, Stack, and Box components
            </Typography>
          </Center>
        </Box>

        {/* Grid Section */}
        <VStack spacing="md">
          <Typography
            style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}
          >
            🔲 Grid Layout Examples
          </Typography>

          {/* 2 Column Grid - 2 Kiri, 2 Kanan */}
          <VStack spacing="sm">
            <Typography
              style={{ fontSize: 16, fontWeight: '600', color: '#666' }}
            >
              2 Column Grid (2 Kiri, 2 Kanan)
            </Typography>
            <Grid columns={2} spacing="sm">
              <Box
                padding="md"
                backgroundColor="#E3F2FD"
                borderRadius="md"
                borderWidth={1}
                borderColor="#BBDEFB"
              >
                <Center>
                  <Typography style={{ fontWeight: 'bold', color: '#1976D2' }}>
                    📱 Mobile
                  </Typography>
                  <Typography
                    style={{ fontSize: 12, color: '#1976D2', marginTop: 4 }}
                  >
                    Responsive Design
                  </Typography>
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
                  <Typography style={{ fontWeight: 'bold', color: '#388E3C' }}>
                    💻 Desktop
                  </Typography>
                  <Typography
                    style={{ fontSize: 12, color: '#388E3C', marginTop: 4 }}
                  >
                    Web Application
                  </Typography>
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
                  <Typography style={{ fontWeight: 'bold', color: '#D32F2F' }}>
                    🎨 Design
                  </Typography>
                  <Typography
                    style={{ fontSize: 12, color: '#D32F2F', marginTop: 4 }}
                  >
                    UI/UX Components
                  </Typography>
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
                  <Typography style={{ fontWeight: 'bold', color: '#F57C00' }}>
                    ⚡ Performance
                  </Typography>
                  <Typography
                    style={{ fontSize: 12, color: '#F57C00', marginTop: 4 }}
                  >
                    Fast & Optimized
                  </Typography>
                </Center>
              </Box>
            </Grid>
          </VStack>

          <HDivider thickness={1} color="#E0E0E0" margin="sm" />

          {/* 3 Column Grid - 2 Kiri, 2 Tengah, 2 Kanan */}
          <VStack spacing="sm">
            <Typography
              style={{ fontSize: 16, fontWeight: '600', color: '#666' }}
            >
              3 Column Grid (2 Kiri, 2 Tengah, 2 Kanan)
            </Typography>
            <Grid columns={3} spacing="xs">
              <Box padding="sm" backgroundColor="#FF6B6B" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    🏠 Home
                  </Typography>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#4ECDC4" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    👤 Profile
                  </Typography>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#45B7D1" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    ⚙️ Settings
                  </Typography>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#96CEB4" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    📊 Analytics
                  </Typography>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#FFEAA7" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: '#333', fontSize: 11, fontWeight: 'bold' }}
                  >
                    💬 Messages
                  </Typography>
                </Center>
              </Box>
              <Box padding="sm" backgroundColor="#DDA0DD" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  >
                    🔔 Notifications
                  </Typography>
                </Center>
              </Box>
            </Grid>
          </VStack>

          <HDivider thickness={1} color="#E0E0E0" margin="sm" />

          {/* 4 Column Grid - 2 per baris */}
          <VStack spacing="sm">
            <Typography
              style={{ fontSize: 16, fontWeight: '600', color: '#666' }}
            >
              4 Column Grid (2 per baris)
            </Typography>
            <Grid columns={4} spacing="xs">
              <Box padding="xs" backgroundColor="#FF5722" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📈
                  </Typography>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#9C27B0" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📉
                  </Typography>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#2196F3" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📊
                  </Typography>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#4CAF50" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📋
                  </Typography>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#FF9800" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    🎯
                  </Typography>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#607D8B" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    🔍
                  </Typography>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#795548" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    📝
                  </Typography>
                </Center>
              </Box>
              <Box padding="xs" backgroundColor="#E91E63" borderRadius="sm">
                <Center>
                  <Typography
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    ❤️
                  </Typography>
                </Center>
              </Box>
            </Grid>
          </VStack>

          <HDivider thickness={1} color="#E0E0E0" margin="sm" />

          {/* 5 Column Grid */}
          <VStack spacing="sm">
            <Typography
              style={{ fontSize: 16, fontWeight: '600', color: '#666' }}
            >
              5 Column Grid (Compact Layout)
            </Typography>
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
                      <Typography style={{ fontSize: 12 }}>{emoji}</Typography>
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
          <Typography
            style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}
          >
            📚 Stack Layout Examples
          </Typography>

          {/* Horizontal Stack */}
          <VStack spacing="sm">
            <Typography
              style={{ fontSize: 16, fontWeight: '600', color: '#666' }}
            >
              Horizontal Stack with Flex
            </Typography>
            <HStack spacing="md" justify="space-between">
              <Box
                flex={1}
                padding="md"
                backgroundColor="#E8F4FD"
                borderRadius="md"
                borderWidth={1}
                borderColor="#B3D9FF"
              >
                <Typography
                  style={{
                    textAlign: 'center',
                    color: '#1976D2',
                    fontWeight: 'bold',
                  }}
                >
                  📱 Mobile First
                </Typography>
                <Typography
                  style={{
                    textAlign: 'center',
                    color: '#1976D2',
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Responsive Design
                </Typography>
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
                <Typography
                  style={{
                    textAlign: 'center',
                    color: '#7B1FA2',
                    fontWeight: 'bold',
                  }}
                >
                  💻 Desktop Enhanced
                </Typography>
                <Typography
                  style={{
                    textAlign: 'center',
                    color: '#7B1FA2',
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  More space for content and features
                </Typography>
              </Box>
            </HStack>
          </VStack>

          {/* Vertical Stack */}
          <VStack spacing="sm">
            <Typography
              style={{ fontSize: 16, fontWeight: '600', color: '#666' }}
            >
              Vertical Stack with Status
            </Typography>
            <VStack spacing="sm">
              <Box
                padding="md"
                backgroundColor="#E8F5E8"
                borderRadius="md"
                borderWidth={1}
                borderColor="#A5D6A7"
              >
                <HStack spacing="sm" align="center">
                  <Typography style={{ fontSize: 16 }}>✅</Typography>
                  <VStack flex={1}>
                    <Typography
                      style={{ color: '#388E3C', fontWeight: 'bold' }}
                    >
                      Task Completed
                    </Typography>
                    <Typography style={{ color: '#388E3C', fontSize: 12 }}>
                      All tests passed successfully
                    </Typography>
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
                  <Typography style={{ fontSize: 16 }}>⚠️</Typography>
                  <VStack flex={1}>
                    <Typography
                      style={{ color: '#F57C00', fontWeight: 'bold' }}
                    >
                      Warning
                    </Typography>
                    <Typography style={{ color: '#F57C00', fontSize: 12 }}>
                      Some issues need attention
                    </Typography>
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
                  <Typography style={{ fontSize: 16 }}>❌</Typography>
                  <VStack flex={1}>
                    <Typography
                      style={{ color: '#D32F2F', fontWeight: 'bold' }}
                    >
                      Error
                    </Typography>
                    <Typography style={{ color: '#D32F2F', fontSize: 12 }}>
                      Build failed, please check logs
                    </Typography>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </VStack>
        </VStack>

        <HDivider thickness={2} color="primary" margin="md" />

        {/* Card Layout Section */}
        <VStack spacing="md">
          <Typography
            style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}
          >
            🃏 Card Layout Examples
          </Typography>

          <Grid columns={2} spacing="md">
            <Box variant="card">
              <VStack spacing="sm">
                <HStack spacing="sm" align="center">
                  <Typography style={{ fontSize: 20 }}>📱</Typography>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
                  >
                    Mobile App
                  </Typography>
                </HStack>
                <Typography style={{ fontSize: 14, color: '#666' }}>
                  Cross-platform mobile application with native performance.
                </Typography>
                <Box padding="sm" backgroundColor="primary" borderRadius="sm">
                  <Typography
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    Download
                  </Typography>
                </Box>
              </VStack>
            </Box>

            <Box variant="card">
              <VStack spacing="sm">
                <HStack spacing="sm" align="center">
                  <Typography style={{ fontSize: 20 }}>💻</Typography>
                  <Typography
                    style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
                  >
                    Web Platform
                  </Typography>
                </HStack>
                <Typography style={{ fontSize: 14, color: '#666' }}>
                  Modern web application with responsive design and PWA support.
                </Typography>
                <Box padding="sm" backgroundColor="secondary" borderRadius="sm">
                  <Typography
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    Launch
                  </Typography>
                </Box>
              </VStack>
            </Box>
          </Grid>

          {/* Feature Cards Grid */}
          <VStack spacing="sm">
            <Typography
              style={{ fontSize: 16, fontWeight: '600', color: '#666' }}
            >
              Feature Cards (3 Column)
            </Typography>
            <Grid columns={3} spacing="sm">
              <Box variant="card" style={{ padding: 12 }}>
                <Center>
                  <Typography style={{ fontSize: 24, marginBottom: 8 }}>
                    🚀
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                    }}
                  >
                    Fast
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 10,
                      color: '#666',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Lightning speed
                  </Typography>
                </Center>
              </Box>
              <Box variant="card" style={{ padding: 12 }}>
                <Center>
                  <Typography style={{ fontSize: 24, marginBottom: 8 }}>
                    🔒
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                    }}
                  >
                    Secure
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 10,
                      color: '#666',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Bank-level security
                  </Typography>
                </Center>
              </Box>
              <Box variant="card" style={{ padding: 12 }}>
                <Center>
                  <Typography style={{ fontSize: 24, marginBottom: 8 }}>
                    📱
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center',
                    }}
                  >
                    Mobile
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 10,
                      color: '#666',
                      textAlign: 'center',
                      marginTop: 4,
                    }}
                  >
                    Mobile optimized
                  </Typography>
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
            <Typography
              style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
            >
              🎉 Layout Demo Complete
            </Typography>
            <Typography
              style={{ color: '#BDC3C7', fontSize: 12, marginTop: 4 }}
            >
              Powered by RNC Theme Components
            </Typography>
          </Center>
        </Box>
      </VStack>
    </VScroll>
  );
};

export default LayoutScreen;
