import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Badge, BadgeText, useThemedStyles, Theme, BadgeIcon } from 'rnc-theme';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItem {
  id: string;
  type: 'message' | 'alert' | 'success' | 'error';
  count: number;
  title: string;
  isRead: boolean;
}

const BadgeScreen: React.FC = () => {
  const styles = useThemedStyles(createStyles);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', type: 'message', count: 5, title: 'Messages', isRead: false },
    { id: '2', type: 'alert', count: 2, title: 'Alerts', isRead: false },
    { id: '3', type: 'success', count: 1, title: 'Updates', isRead: true },
    { id: '4', type: 'error', count: 0, title: 'Errors', isRead: true },
  ]);

  const getBadgeVariant = (type: string, isRead: boolean) => {
    if (isRead) return 'secondary';
    switch (type) {
      case 'message':
        return 'primary';
      case 'alert':
        return 'warning';
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return 'mail';
      case 'alert':
        return 'warning';
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      default:
        return 'notifications';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ gap: 20 }}>
        {/* Basic Badge */}
        <Badge animated={true} fadeIn={true}>
          <BadgeText>Default</BadgeText>
        </Badge>

        {/* Different Variants */}
        <Badge variant="primary">
          <BadgeText>Primary</BadgeText>
        </Badge>

        <Badge variant="success">
          <BadgeText>Success</BadgeText>
        </Badge>

        <Badge variant="warning">
          <BadgeText>Warning</BadgeText>
        </Badge>

        <Badge variant="error">
          <BadgeText>Error</BadgeText>
        </Badge>

        {/* Different Sizes */}
        <Badge size="sm">
          <BadgeText>Small</BadgeText>
        </Badge>

        <Badge size="md">
          <BadgeText>Medium</BadgeText>
        </Badge>

        <Badge size="lg">
          <BadgeText>Large</BadgeText>
        </Badge>

        {/* Badge with Left Icon */}
        <Badge variant="primary">
          <BadgeIcon position="left">
            <Ionicons name="star" size={16} color="white" />
          </BadgeIcon>
          <BadgeText>Featured</BadgeText>
        </Badge>

        {/* Badge with Right Icon */}
        <Badge variant="success">
          <BadgeText>Completed</BadgeText>
          <BadgeIcon position="right">
            <Ionicons name="checkmark" size={16} color="white" />
          </BadgeIcon>
        </Badge>

        {/* Badge with Both Icons */}
        <Badge variant="warning">
          <BadgeIcon position="left">
            <Ionicons name="warning" size={16} color="white" />
          </BadgeIcon>
          <BadgeText>Alert</BadgeText>
          <BadgeIcon position="right">
            <Ionicons name="arrow-forward" size={16} color="white" />
          </BadgeIcon>
        </Badge>

        {/* Icon Only Badge */}
        <Badge variant="error" size="sm">
          <BadgeIcon>
            <Ionicons name="close" size={14} color="white" />
          </BadgeIcon>
        </Badge>

        {/* Complex */}
        <Text style={styles.title}>Notification Center</Text>

        {/* Notification List */}
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.notificationItem}
            onPress={() => markAsRead(item.id)}
          >
            <View style={styles.notificationContent}>
              <Ionicons
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                name={getIcon(item.type) as any}
                size={24}
                color={styles.iconColor.color}
              />
              <Text style={styles.notificationTitle}>{item.title}</Text>
            </View>

            {item.count > 0 && (
              <Badge
                variant={getBadgeVariant(item.type, item.isRead)}
                size={item.count > 99 ? 'lg' : 'md'}
                rounded={true}
              >
                <BadgeText>
                  {item.count > 99 ? '99+' : item.count.toString()}
                </BadgeText>
              </Badge>
            )}
          </TouchableOpacity>
        ))}

        {/* Status Badges */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>User Status</Text>

          <View style={styles.statusRow}>
            <Badge variant="success" size="sm">
              <BadgeIcon position="left">
                <View style={styles.onlineIndicator} />
              </BadgeIcon>
              <BadgeText>Online</BadgeText>
            </Badge>

            <Badge variant="primary">
              <BadgeIcon position="left">
                <Ionicons name="shield-checkmark" size={16} color="white" />
              </BadgeIcon>
              <BadgeText>Verified</BadgeText>
            </Badge>

            <Badge variant="warning">
              <BadgeIcon position="left">
                <Ionicons name="star" size={16} color="white" />
              </BadgeIcon>
              <BadgeText>Premium</BadgeText>
            </Badge>
          </View>
        </View>

        {/* Custom Styled Badges */}
        <View style={styles.customSection}>
          <Text style={styles.sectionTitle}>Custom Badges</Text>

          <Badge style={styles.customBadge}>
            <BadgeText style={styles.customBadgeText}>Custom Style</BadgeText>
          </Badge>

          <Badge variant="primary" rounded={false}>
            <BadgeText>Square Badge</BadgeText>
          </Badge>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  notificationItem: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  notificationContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.sm,
  },
  notificationTitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  iconColor: {
    color: theme.colors.text,
  },
  statusSection: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  statusRow: {
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
    flexWrap: 'wrap' as const,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF00',
  },
  customSection: {
    marginTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
  customBadge: {
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#FF5252',
  },
  customBadgeText: {
    color: 'white',
    fontWeight: 'bold' as const,
  },
});

export default BadgeScreen;