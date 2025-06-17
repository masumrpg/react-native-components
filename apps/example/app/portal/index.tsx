import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {
  Portal,
  PortalHost,
  Tooltip,
  Button,
  ButtonText,
  Card,
  CardHeader,
  CardContent,
  Typography,
  VStack,
  HStack,
  useTheme,
  Badge,
  BadgeText,
} from 'rnc-theme';
import {
  Info,
  HelpCircle,
  Settings,
  Star,
  Heart,
  AlertCircle,
} from 'lucide-react-native';

export default function PortalExample() {
  const { theme } = useTheme();
  const [showPortalContent, setShowPortalContent] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
      gap: theme.spacing.lg,
    },
    section: {
      gap: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.title.fontSize,
      fontWeight: theme.typography.title.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    tooltipGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      justifyContent: 'space-around',
      padding: theme.spacing.lg,
    },
    portalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    portalContent: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.components.borderRadius.lg,
      margin: theme.spacing.lg,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });

  return (
    <PortalHost>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <Card>
          <CardHeader
            title="Portal & Tooltip Demo"
            subtitle="Demonstrasi komponen Portal dan Tooltip yang optimal"
          />
          <CardContent>
            <Typography>
              Portal memungkinkan rendering komponen di luar hierarki normal,
              sangat berguna untuk tooltip, modal, dan overlay.
            </Typography>
          </CardContent>
        </Card>

        {/* Basic Tooltip Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Tooltips</Text>
          <Card>
            <CardContent>
              <View style={styles.tooltipGrid}>
                <Tooltip content="Tooltip di atas" position="top">
                  <Button variant="primary">
                    <ButtonText>Hover Top</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Tooltip di bawah" position="bottom">
                  <Button variant="secondary">
                    <ButtonText>Hover Bottom</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Tooltip di kiri" position="left">
                  <Button variant="success">
                    <ButtonText>Hover Left</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Tooltip di kanan" position="right">
                  <Button variant="warning">
                    <ButtonText>Hover Right</ButtonText>
                  </Button>
                </Tooltip>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Advanced Tooltip Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Tooltips</Text>
          <Card>
            <CardContent>
              <VStack spacing="md">
                <HStack spacing="md" align="center">
                  <Tooltip
                    content={
                      <VStack spacing="xs">
                        <Typography variant="small" style={{ color: 'white', fontWeight: 'bold' }}>
                          Custom Tooltip
                        </Typography>
                        <Typography variant="small" style={{ color: 'white' }}>
                          Ini adalah tooltip dengan konten custom
                        </Typography>
                      </VStack>
                    }
                    position="top"
                  >
                    <HStack spacing="xs" align="center">
                      <Info size={20} color={theme.colors.info} />
                      <Typography>Custom Content Tooltip</Typography>
                    </HStack>
                  </Tooltip>
                </HStack>

                <HStack spacing="md" align="center">
                  <Tooltip
                    content="Tooltip dengan delay 1 detik"
                    delay={1000}
                    position="bottom"
                  >
                    <HStack spacing="xs" align="center">
                      <HelpCircle size={20} color={theme.colors.warning} />
                      <Typography>Delayed Tooltip (1s)</Typography>
                    </HStack>
                  </Tooltip>
                </HStack>

                <HStack spacing="md" align="center">
                  <Tooltip
                    content="Tooltip yang bisa dikontrol"
                    visible={tooltipVisible}
                    onVisibilityChange={setTooltipVisible}
                    position="right"
                  >
                    <Button
                      variant="outline"
                      onPress={() => setTooltipVisible(!tooltipVisible)}
                    >
                      <ButtonText>Controlled Tooltip</ButtonText>
                    </Button>
                  </Tooltip>
                </HStack>
              </VStack>
            </CardContent>
          </Card>
        </View>

        {/* Icon Tooltips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Icon Tooltips</Text>
          <Card>
            <CardContent>
              <HStack spacing="lg" justify="space-around" align="center">
                <Tooltip content="Pengaturan aplikasi" position="top">
                  <Settings size={32} color={theme.colors.primary} />
                </Tooltip>

                <Tooltip content="Tambahkan ke favorit" position="top">
                  <Star size={32} color={theme.colors.warning} />
                </Tooltip>

                <Tooltip content="Suka konten ini" position="top">
                  <Heart size={32} color={theme.colors.error} />
                </Tooltip>

                <Tooltip content="Informasi penting" position="top">
                  <AlertCircle size={32} color={theme.colors.info} />
                </Tooltip>
              </HStack>
            </CardContent>
          </Card>
        </View>

        {/* Badge Tooltips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badge Tooltips</Text>
          <Card>
            <CardContent>
              <HStack spacing="md" wrap justify="center">
                <Tooltip content="Status aktif" position="top">
                  <Badge variant="success">
                    <BadgeText>Active</BadgeText>
                  </Badge>
                </Tooltip>

                <Tooltip content="Menunggu persetujuan" position="top">
                  <Badge variant="warning">
                    <BadgeText>Pending</BadgeText>
                  </Badge>
                </Tooltip>

                <Tooltip content="Terjadi kesalahan" position="top">
                  <Badge variant="error">
                    <BadgeText>Error</BadgeText>
                  </Badge>
                </Tooltip>

                <Tooltip content="Informasi tambahan" position="top">
                  <Badge variant="info">
                    <BadgeText>Info</BadgeText>
                  </Badge>
                </Tooltip>
              </HStack>
            </CardContent>
          </Card>
        </View>

        {/* Portal Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portal Example</Text>
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography>
                  Portal memungkinkan rendering komponen di luar hierarki normal.
                  Klik tombol di bawah untuk melihat contoh overlay menggunakan Portal.
                </Typography>
                <Button
                  variant="primary"
                  onPress={() => setShowPortalContent(true)}
                >
                  <ButtonText>Show Portal Overlay</ButtonText>
                </Button>
              </VStack>
            </CardContent>
          </Card>
        </View>

        {/* Real-world Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-world Example</Text>
          <Card>
            <CardContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">User Profile</Typography>
                  <Tooltip
                    content="Edit profil pengguna"
                    position="left"
                  >
                    <Button variant="ghost" size="sm">
                      <Settings size={16} color={theme.colors.textSecondary} />
                    </Button>
                  </Tooltip>
                </HStack>

                <HStack spacing="md" align="center">
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: theme.colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ color: 'white', fontWeight: 'bold' }}>
                      JD
                    </Typography>
                  </View>
                  <VStack spacing="xs" flex={1}>
                    <Typography variant="subtitle">John Doe</Typography>
                    <Typography variant="small" color={theme.colors.textSecondary}>
                      john.doe@example.com
                    </Typography>
                  </VStack>
                  <Tooltip
                    content="Status online"
                    position="left"
                  >
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: theme.colors.success,
                      }}
                    />
                  </Tooltip>
                </HStack>
              </VStack>
            </CardContent>
          </Card>
        </View>
      </ScrollView>

      {/* Portal Overlay */}
      {showPortalContent && (
        <Portal name="overlay-example">
          <View style={styles.portalOverlay}>
            <View style={styles.portalContent}>
              <VStack spacing="md" align="center">
                <Typography variant="title">Portal Overlay</Typography>
                <Typography style={{ textAlign: 'center' }}>
                  Ini adalah konten yang di-render menggunakan Portal.
                  Konten ini berada di luar hierarki komponen normal.
                </Typography>
                <Button
                  variant="primary"
                  onPress={() => setShowPortalContent(false)}
                >
                  <ButtonText>Close</ButtonText>
                </Button>
              </VStack>
            </View>
          </View>
        </Portal>
      )}
    </PortalHost>
  );
}