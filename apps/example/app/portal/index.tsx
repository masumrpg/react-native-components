import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
  const [showModalPortal, setShowModalPortal] = useState(false);
  const [showTooltipPortal, setShowTooltipPortal] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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
    modalContent: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.components.borderRadius.lg,
      margin: theme.spacing.lg,
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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

  const showTooltip = (tooltipId: string) => {
    setActiveTooltip(tooltipId);
    setTimeout(() => setActiveTooltip(null), 2000);
  };

  return (
    <View style={styles.container}>
      {/* Main Portal Host */}
      <PortalHost name="main">
        <ScrollView contentContainerStyle={styles.content}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Multiple Portal Hosts</Text>
            <Card>
              <CardContent>
                <VStack spacing="lg">
                  {/* Modal Host */}
                  <View style={styles.hostContainer}>
                    <Text style={styles.hostLabel}>Modal Host</Text>
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
                  </View>

                  {/* Tooltip Host */}
                  <View style={styles.hostContainer}>
                    <Text style={styles.hostLabel}>Tooltip Host</Text>
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
                  </View>
                </VStack>
              </CardContent>
            </Card>
          </View>

          {/* Touch-based Tooltips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Touch-based Tooltips</Text>
            <Card>
              <CardContent>
                <View style={styles.tooltipGrid}>
                  <Tooltip
                    content="Tooltip di atas"
                    position="top"
                    visible={activeTooltip === 'top'}
                  >
                    <Button
                      variant="primary"
                      onPress={() => showTooltip('top')}
                    >
                      <ButtonText>Tap for Top</ButtonText>
                    </Button>
                  </Tooltip>

                  <Tooltip
                    content="Tooltip di bawah"
                    position="bottom"
                    visible={activeTooltip === 'bottom'}
                  >
                    <Button
                      variant="secondary"
                      onPress={() => showTooltip('bottom')}
                    >
                      <ButtonText>Tap for Bottom</ButtonText>
                    </Button>
                  </Tooltip>

                  <Tooltip
                    content="Tooltip di kiri"
                    position="left"
                    visible={activeTooltip === 'left'}
                  >
                    <Button
                      variant="success"
                      onPress={() => showTooltip('left')}
                    >
                      <ButtonText>Tap for Left</ButtonText>
                    </Button>
                  </Tooltip>

                  <Tooltip
                    content="Tooltip di kanan"
                    position="right"
                    visible={activeTooltip === 'right'}
                  >
                    <Button
                      variant="warning"
                      onPress={() => showTooltip('right')}
                    >
                      <ButtonText>Tap for Right</ButtonText>
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
                  <TouchableOpacity onPress={() => showTooltip('custom')}>
                    <Tooltip
                      content={
                        <VStack spacing="xs">
                          <Typography
                            variant="small"
                            style={{ color: 'white', fontWeight: 'bold' }}
                          >
                            Custom Tooltip
                          </Typography>
                          <Typography
                            variant="small"
                            style={{ color: 'white' }}
                          >
                            Ini adalah tooltip dengan konten custom
                          </Typography>
                        </VStack>
                      }
                      position="top"
                      visible={activeTooltip === 'custom'}
                    >
                      <HStack spacing="xs" align="center">
                        <Info size={20} color={theme.colors.info} />
                        <Typography>Tap for Custom Content Tooltip</Typography>
                      </HStack>
                    </Tooltip>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showTooltip('delayed')}>
                    <Tooltip
                      content="Tooltip dengan delay 1 detik"
                      delay={1000}
                      position="bottom"
                      visible={activeTooltip === 'delayed'}
                    >
                      <HStack spacing="xs" align="center">
                        <HelpCircle size={20} color={theme.colors.warning} />
                        <Typography>Tap for Delayed Tooltip (1s)</Typography>
                      </HStack>
                    </Tooltip>
                  </TouchableOpacity>

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
                  <TouchableOpacity onPress={() => showTooltip('settings')}>
                    <Tooltip
                      content="Pengaturan aplikasi"
                      position="top"
                      visible={activeTooltip === 'settings'}
                    >
                      <Settings size={32} color={theme.colors.primary} />
                    </Tooltip>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showTooltip('star')}>
                    <Tooltip
                      content="Tambahkan ke favorit"
                      position="top"
                      visible={activeTooltip === 'star'}
                    >
                      <Star size={32} color={theme.colors.warning} />
                    </Tooltip>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showTooltip('heart')}>
                    <Tooltip
                      content="Suka konten ini"
                      position="top"
                      visible={activeTooltip === 'heart'}
                    >
                      <Heart size={32} color={theme.colors.error} />
                    </Tooltip>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => showTooltip('alert')}>
                    <Tooltip
                      content="Informasi penting"
                      position="top"
                      visible={activeTooltip === 'alert'}
                    >
                      <AlertCircle size={32} color={theme.colors.info} />
                    </Tooltip>
                  </TouchableOpacity>
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
          </View>

          {/* Portal Example */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Portal Example</Text>
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
          </View>

          {/* Real-world Example */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Real-world Example</Text>
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
                      <Typography
                        style={{ color: 'white', fontWeight: 'bold' }}
                      >
                        JD
                      </Typography>
                    </View>
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
                        <View
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
          </View>
        </ScrollView>

        {/* Portal Overlay - Main Host */}
        {showPortalContent && (
          <Portal name="overlay-example">
            <View style={styles.portalOverlay}>
              <View style={styles.portalContent}>
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
              </View>
            </View>
          </Portal>
        )}
      </PortalHost>

      {/* Modal Portal - Targeted to Modal Host */}
      {showModalPortal && (
        <Portal name="modal-example" hostName="modal-host">
          <View style={styles.portalOverlay}>
            <View style={styles.modalContent}>
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
            </View>
          </View>
        </Portal>
      )}

      {/* Tooltip Portal - Targeted to Tooltip Host */}
      {showTooltipPortal && (
        <Portal name="tooltip-example" hostName="tooltip-host">
          <View
            style={[
              styles.portalOverlay,
              { backgroundColor: 'rgba(255, 165, 0, 0.3)' },
            ]}
          >
            <View
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
            </View>
          </View>
        </Portal>
      )}
    </View>
  );
}