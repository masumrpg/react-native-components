import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
  Theme,
  useThemedStyles,
  Box,
  VScroll,
  utils,
} from 'rnc-theme';
import { Settings, Star, Heart, AlertCircle } from 'lucide-react-native';

export default function TooltipScreen() {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [showPortalContent, setShowPortalContent] = useState(false);
  const [showModalPortal, setShowModalPortal] = useState(false);
  const [showTooltipPortal, setShowTooltipPortal] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const showTooltip = (tooltipId: string) => {
    setActiveTooltip(tooltipId);
    setTimeout(() => setActiveTooltip(null), 2000);
  };

  return (
    <Box themed style={styles.container}>
      {/* Main Portal Host */}
      <PortalHost name="main">
        <VScroll contentContainerStyle={styles.content}>
          {/* Header */}
          <Card>
            <CardHeader
              title="Portal & Tooltip Demo"
              subtitle="Demonstrasi komponen Portal dan Tooltip yang optimal untuk mobile"
            />
            <CardContent>
              <Typography>
                Portal memungkinkan rendering komponen di luar hierarki normal,
                sangat berguna untuk tooltip, modal, dan overlay di aplikasi
                mobile.
              </Typography>
            </CardContent>
          </Card>

          {/* Multiple Portal Hosts Example */}
          {/* <Box style={styles.section}>
            <Typography style={styles.sectionTitle}>
              Multiple Portal Hosts
            </Typography>
            <Card>
              <CardContent>
                <VStack spacing="lg">
                  <Box style={styles.hostContainer}>
                    <Typography style={styles.hostLabel}>Modal Host</Typography>
                    <PortalHost name="modal-host">
                      <VStack spacing="md">
                        <Typography variant="subtitle">
                          Modal Portal Host
                        </Typography>
                        <Typography variant="small">
                          Host khusus untuk modal dan dialog
                        </Typography>
                        <Button
                          variant="primary"
                          onPress={() => setShowModalPortal(true)}
                        >
                          <ButtonText>Show Modal in Modal Host</ButtonText>
                        </Button>
                      </VStack>
                    </PortalHost>
                  </Box>

                  <Box style={styles.hostContainer}>
                    <Typography style={styles.hostLabel}>
                      Tooltip Host
                    </Typography>
                    <PortalHost name="tooltip-host">
                      <VStack spacing="md">
                        <Typography variant="subtitle">
                          Tooltip Portal Host
                        </Typography>
                        <Typography variant="small">
                          Host khusus untuk tooltip dan popover
                        </Typography>
                        <Button
                          variant="secondary"
                          onPress={() => setShowTooltipPortal(true)}
                        >
                          <ButtonText>Show Tooltip in Tooltip Host</ButtonText>
                        </Button>
                      </VStack>
                    </PortalHost>
                  </Box>
                </VStack>
              </CardContent>
            </Card>
          </Box> */}

          {/* Icon Tooltips - Updated section */}
          <Box style={styles.section}>
            <Typography style={styles.sectionTitle}>
              Icon Tooltips (Long Press)
            </Typography>
            <Card>
              <CardContent>
                <HStack spacing="lg" justify="space-around" align="center">
                  <Tooltip
                    content="Pengaturan aplikasi"
                    position="top"
                    visible={activeTooltip === 'settings'}
                    onVisibilityChange={(visible) => {
                      if (visible) {
                        setActiveTooltip('settings');
                        setTimeout(() => setActiveTooltip(null), 2000);
                      } else {
                        setActiveTooltip(null);
                      }
                    }}
                  >
                    <Settings size={32} color={theme.colors.primary} />
                  </Tooltip>

                  <Tooltip
                    content="Tambahkan ke favorit"
                    position="right"
                    visible={activeTooltip === 'star'}
                    onVisibilityChange={(visible) => {
                      if (visible) {
                        setActiveTooltip('star');
                        setTimeout(() => setActiveTooltip(null), 2000);
                      } else {
                        setActiveTooltip(null);
                      }
                    }}
                  >
                    <Star size={32} color={theme.colors.warning} />
                  </Tooltip>

                  <Tooltip
                    content="Suka konten ini"
                    position="bottom"
                    visible={activeTooltip === 'heart'}
                    onVisibilityChange={(visible) => {
                      if (visible) {
                        setActiveTooltip('heart');
                        setTimeout(() => setActiveTooltip(null), 2000);
                      } else {
                        setActiveTooltip(null);
                      }
                    }}
                  >
                    <Heart size={32} color={theme.colors.error} />
                  </Tooltip>

                  <Tooltip
                    content="Informasi penting"
                    position="left"
                    visible={activeTooltip === 'alert'}
                    onVisibilityChange={(visible) => {
                      if (visible) {
                        setActiveTooltip('alert');
                        setTimeout(() => setActiveTooltip(null), 2000);
                      } else {
                        setActiveTooltip(null);
                      }
                    }}
                  >
                    <AlertCircle size={32} color={theme.colors.info} />
                  </Tooltip>
                </HStack>
                <Typography
                  variant="small"
                  style={{
                    textAlign: 'center',
                    marginTop: 8,
                    color: theme.colors.textSecondary,
                  }}
                >
                  Long press pada icon untuk menampilkan tooltip
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Badge Tooltips */}
          <Box style={styles.section}>
            <Typography style={styles.sectionTitle}>Badge Tooltips</Typography>
            <Card>
              <CardContent>
                <HStack spacing="md" wrap justify="center">
                  <TouchableOpacity onPress={() => showTooltip('active')}>
                    <Tooltip
                      content="Status aktif"
                      position="top"
                      visible={activeTooltip === 'active'}
                    >
                      <Badge variant="success">
                        <BadgeText>Active</BadgeText>
                      </Badge>
                    </Tooltip>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showTooltip('pending')}>
                    <Tooltip
                      content="Menunggu persetujuan"
                      position="top"
                      visible={activeTooltip === 'pending'}
                    >
                      <Badge variant="warning">
                        <BadgeText>Pending</BadgeText>
                      </Badge>
                    </Tooltip>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showTooltip('error')}>
                    <Tooltip
                      content="Terjadi kesalahan"
                      position="top"
                      visible={activeTooltip === 'error'}
                    >
                      <Badge variant="error">
                        <BadgeText>Error</BadgeText>
                      </Badge>
                    </Tooltip>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showTooltip('info')}>
                    <Tooltip
                      content="Informasi tambahan"
                      position="top"
                      visible={activeTooltip === 'info'}
                    >
                      <Badge variant="info">
                        <BadgeText>Info</BadgeText>
                      </Badge>
                    </Tooltip>
                  </TouchableOpacity>
                </HStack>
              </CardContent>
            </Card>
          </Box>

          {/* Portal Example */}
          <Box style={styles.section}>
            <Typography style={styles.sectionTitle}>Portal Example</Typography>
            <Card>
              <CardContent>
                <VStack spacing="md">
                  <Typography>
                    Portal memungkinkan rendering komponen di luar hierarki
                    normal. Klik tombol di bawah untuk melihat contoh overlay
                    menggunakan Portal.
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
          </Box>

          {/* Real-world Example */}
          {/* <Box style={styles.section}>
            <Typography style={styles.sectionTitle}>
              Real-world Example
            </Typography>
            <Card>
              <CardContent>
                <VStack spacing="md">
                  <HStack justify="space-between" align="center">
                    <Typography variant="subtitle">User Profile</Typography>
                    <TouchableOpacity onPress={() => showTooltip('edit')}>
                      <Tooltip
                        content="Edit profil pengguna"
                        position="left"
                        visible={activeTooltip === 'edit'}
                      >
                        <Button variant="ghost" size="sm">
                          <Settings
                            size={16}
                            color={theme.colors.textSecondary}
                          />
                        </Button>
                      </Tooltip>
                    </TouchableOpacity>
                  </HStack>

                  <HStack spacing="md" align="center">
                    <Box
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: theme.colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        style={{ color: 'white', fontWeight: 'bold' }}
                      >
                        JD
                      </Typography>
                    </Box>
                    <VStack spacing="xs" flex={1}>
                      <Typography variant="subtitle">John Doe</Typography>
                      <Typography
                        variant="small"
                        color={theme.colors.textSecondary}
                      >
                        john.doe@example.com
                      </Typography>
                    </VStack>
                    <TouchableOpacity onPress={() => showTooltip('status')}>
                      <Tooltip
                        content="Status online"
                        position="left"
                        visible={activeTooltip === 'status'}
                      >
                        <Box
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: theme.colors.success,
                          }}
                        />
                      </Tooltip>
                    </TouchableOpacity>
                  </HStack>
                </VStack>
              </CardContent>
            </Card>
          </Box> */}
        </VScroll>

        {/* Portal Overlay - Main Host */}
        {showPortalContent && (
          <Portal name="overlay-example">
            <Box style={styles.portalOverlay}>
              <Box style={styles.portalContent}>
                <VStack spacing="md" align="center">
                  <Typography variant="title">Portal Overlay</Typography>
                  <Typography style={{ textAlign: 'center' }}>
                    Ini adalah konten yang di-render menggunakan Portal di Main
                    Host. Konten ini berada di luar hierarki komponen normal.
                  </Typography>
                  <Button
                    variant="primary"
                    onPress={() => setShowPortalContent(false)}
                  >
                    <ButtonText>Close</ButtonText>
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Portal>
        )}
      </PortalHost>

      {/* Modal Portal - Targeted to Modal Host */}
      {showModalPortal && (
        <Portal name="modal-example" hostName="modal-host">
          <Box style={styles.portalOverlay}>
            <Box style={styles.modalContent}>
              <VStack spacing="md" align="center">
                <Typography variant="title">Modal Portal</Typography>
                <Typography style={{ textAlign: 'center' }}>
                  Ini adalah modal yang di-render di Modal Host khusus.
                </Typography>
                <Button
                  variant="secondary"
                  onPress={() => setShowModalPortal(false)}
                >
                  <ButtonText>Close Modal</ButtonText>
                </Button>
              </VStack>
            </Box>
          </Box>
        </Portal>
      )}

      {/* Tooltip Portal - Targeted to Tooltip Host */}
      {showTooltipPortal && (
        <Portal name="tooltip-example" hostName="tooltip-host">
          <Box
            style={[
              styles.portalOverlay,
              { backgroundColor: 'rgba(255, 165, 0, 0.3)' },
            ]}
          >
            <Box
              style={[
                styles.modalContent,
                { backgroundColor: theme.colors.warning },
              ]}
            >
              <VStack spacing="md" align="center">
                <Typography variant="title" style={{ color: 'white' }}>
                  Tooltip Portal
                </Typography>
                <Typography style={{ textAlign: 'center', color: 'white' }}>
                  Ini adalah tooltip yang di-render di Tooltip Host khusus.
                </Typography>
                <Button
                  variant="outline"
                  onPress={() => setShowTooltipPortal(false)}
                >
                  <ButtonText>Close Tooltip</ButtonText>
                </Button>
              </VStack>
            </Box>
          </Box>
        </Portal>
      )}
    </Box>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
      ...utils.createShadow(8)
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.components.borderRadius.lg,
      margin: theme.spacing.lg,
      maxWidth: 300,
      ...utils.createShadow(5)
    },
    hostContainer: {
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: theme.components.borderRadius.md,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
    },
    hostLabel: {
      position: 'absolute',
      top: -10,
      left: 10,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.xs,
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });