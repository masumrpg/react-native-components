import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Badge,
  BadgeText,
  useThemedStyles,
  Theme,
  BadgeIcon,
  VScroll,
  Box,
  Typography,
  Card,
} from 'rnc-theme';
import { Ionicons } from '@expo/vector-icons';

const BadgeScreen: React.FC = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <VScroll style={styles.container}>
      <Box themed={false} style={{ gap: 20 }}>
        {/* Basic Badge */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>Basic Badge</Typography>
          <Badge animated={true} fadeIn={true}>
            <BadgeText>Default</BadgeText>
          </Badge>
        </Card>

        {/* Original Variants */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>Original Variants</Typography>
          <Box style={styles.statusRow}>
            <Badge variant="primary">
              <BadgeText>Primary</BadgeText>
            </Badge>
            <Badge variant="secondary">
              <BadgeText>Secondary</BadgeText>
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
          </Box>
        </Card>

        {/* New Variants */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>New Variants</Typography>
          <Box style={styles.statusRow}>
            <Badge variant="outline">
              <BadgeText>Outline</BadgeText>
            </Badge>
            <Badge variant="filled">
              <BadgeText>Filled</BadgeText>
            </Badge>
            <Badge variant="ghost">
              <BadgeText>Ghost</BadgeText>
            </Badge>
            <Badge variant="info">
              <BadgeText>Info</BadgeText>
            </Badge>
            <Badge variant="destructive">
              <BadgeText>Destructive</BadgeText>
            </Badge>
          </Box>
        </Card>

        {/* Different Sizes */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>All Sizes</Typography>
          <Box style={styles.sizeRow}>
            <Badge size="xs">
              <BadgeText>XS</BadgeText>
            </Badge>
            <Badge size="sm">
              <BadgeText>Small</BadgeText>
            </Badge>
            <Badge size="md">
              <BadgeText>Medium</BadgeText>
            </Badge>
            <Badge size="lg">
              <BadgeText>Large</BadgeText>
            </Badge>
          </Box>
        </Card>

        {/* Size Comparison with New Variants */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>
            Size Comparison - New Variants
          </Typography>
          <Box style={styles.sizeComparison}>
            <Typography style={styles.smallDescription}>
              Outline variant in different sizes:
            </Typography>
            <Box style={styles.sizeRow}>
              <Badge variant="outline" size="xs">
                <BadgeText>XS</BadgeText>
              </Badge>
              <Badge variant="outline" size="sm">
                <BadgeText>SM</BadgeText>
              </Badge>
              <Badge variant="outline" size="md">
                <BadgeText>MD</BadgeText>
              </Badge>
              <Badge variant="outline" size="lg">
                <BadgeText>LG</BadgeText>
              </Badge>
            </Box>

            <Typography style={styles.smallDescription}>
              Ghost variant in different sizes:
            </Typography>
            <Box style={styles.sizeRow}>
              <Badge variant="ghost" size="xs">
                <BadgeText>XS</BadgeText>
              </Badge>
              <Badge variant="ghost" size="sm">
                <BadgeText>SM</BadgeText>
              </Badge>
              <Badge variant="ghost" size="md">
                <BadgeText>MD</BadgeText>
              </Badge>
              <Badge variant="ghost" size="lg">
                <BadgeText>LG</BadgeText>
              </Badge>
            </Box>
          </Box>
        </Card>

        {/* Badge with Icons - New Variants */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>
            New Variants with Icons
          </Typography>
          <Box style={styles.statusRow}>
            <Badge variant="outline">
              <BadgeIcon position="left">
                <Ionicons name="star-outline" size={16} color="#007AFF" />
              </BadgeIcon>
              <BadgeText>Outline</BadgeText>
            </Badge>

            <Badge variant="ghost">
              <BadgeIcon position="left">
                <Ionicons name="eye-outline" size={16} color="#666" />
              </BadgeIcon>
              <BadgeText>Ghost</BadgeText>
            </Badge>

            <Badge variant="info">
              <BadgeIcon position="left">
                <Ionicons name="information-circle" size={16} color="white" />
              </BadgeIcon>
              <BadgeText>Info</BadgeText>
            </Badge>

            <Badge variant="destructive">
              <BadgeIcon position="left">
                <Ionicons name="trash" size={16} color="white" />
              </BadgeIcon>
              <BadgeText>Delete</BadgeText>
            </Badge>
          </Box>
        </Card>

        {/* Badge with Icon Positions */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>Icon Positions</Typography>
          <Box style={styles.badgeColumn}>
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
          </Box>
        </Card>

        {/* Status Badges */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>User Status</Typography>
          <Box style={styles.statusRow}>
            <Badge variant="success" size="sm">
              <BadgeIcon position="left">
                <Box style={styles.onlineIndicator} />
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
          </Box>
        </Card>

        {/* Custom Styled Badges */}
        <Card style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>Custom Badges</Typography>
          <Box style={styles.badgeColumn}>
            <Badge style={styles.customBadge}>
              <BadgeText style={styles.customBadgeText}>Custom Style</BadgeText>
            </Badge>

            <Badge variant="primary" rounded={false}>
              <BadgeText>Square Badge</BadgeText>
            </Badge>
          </Box>
        </Card>
      </Box>
    </VScroll>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    sectionCard: {
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
    title: {
      fontSize: theme.typography.title.fontSize,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    notificationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.components.borderRadius.md,
      marginBottom: theme.spacing.sm,
    },
    notificationContent: {
      flexDirection: 'row',
      alignItems: 'center',
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
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    statusRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      flexWrap: 'wrap',
    },
    sizeRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    badgeColumn: {
      gap: theme.spacing.sm,
      alignItems: 'flex-start',
    },
    sizeComparison: {
      gap: theme.spacing.md,
    },
    smallDescription: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
      fontStyle: 'italic',
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
      fontWeight: 'bold',
    },
  });

export default BadgeScreen;
