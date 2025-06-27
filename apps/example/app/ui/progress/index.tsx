import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  Progress,
  ProgressFilledTrack,
  HStack,
  VStack,
  Box,
  useThemedStyles,
  Theme,
  ComponentVariant,
  VScroll,
  Typography,
} from 'rnc-theme';

interface TaskProgress {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  category: 'development' | 'design' | 'testing' | 'deployment';
}

const ProgressScreen = () => {
  const [tasks, setTasks] = useState<TaskProgress[]>([
    {
      id: '1',
      name: 'Frontend Development',
      progress: 75,
      status: 'in-progress',
      category: 'development',
    },
    {
      id: '2',
      name: 'Backend API',
      progress: 90,
      status: 'in-progress',
      category: 'development',
    },
    {
      id: '3',
      name: 'UI/UX Design',
      progress: 100,
      status: 'completed',
      category: 'design',
    },
    {
      id: '4',
      name: 'Unit Testing',
      progress: 45,
      status: 'in-progress',
      category: 'testing',
    },
    {
      id: '5',
      name: 'Integration Testing',
      progress: 20,
      status: 'pending',
      category: 'testing',
    },
    {
      id: '6',
      name: 'Production Deploy',
      progress: 0,
      status: 'pending',
      category: 'deployment',
    },
  ]);

  const [overallProgress, setOverallProgress] = useState(0);
  const styles = useThemedStyles(createStyles);

  // Calculate overall progress
  useEffect(() => {
    const total = tasks.reduce((sum, task) => sum + task.progress, 0);
    setOverallProgress(Math.round(total / tasks.length));
  }, [tasks]);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.status === 'in-progress' && task.progress < 100) {
            const increment = Math.random() * 2;
            const newProgress = Math.min(100, task.progress + increment);
            return {
              ...task,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'in-progress',
            };
          }
          return task;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getVariantByStatus = (
    status: string
  ): 'default' | 'success' | 'warning' | 'error' | 'info' | 'destructive' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'destructive';
      case 'in-progress':
        return 'info';
      default:
        return 'warning';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'failed':
        return '#DC2626';
      case 'in-progress':
        return '#3B82F6';
      default:
        return '#F59E0B';
    }
  };

  const resetProgress = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        progress: Math.random() * 100,
        status: 'in-progress',
      }))
    );
  };

  return (
    <VScroll style={styles.container}>
      <Typography style={styles.title}>Progress Component Showcase</Typography>

      {/* Size Comparison */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Size Comparison</Typography>
        <VStack spacing="md">
          <VStack spacing="xs">
            <Typography style={styles.label}>Extra Small (xs)</Typography>
            <Progress value={75} size="xs" variant="primary">
              <ProgressFilledTrack />
            </Progress>
          </VStack>
          <VStack spacing="xs">
            <Typography style={styles.label}>Small (sm)</Typography>
            <Progress value={75} size="sm" variant="primary">
              <ProgressFilledTrack />
            </Progress>
          </VStack>
          <VStack spacing="xs">
            <Typography style={styles.label}>Medium (md)</Typography>
            <Progress value={75} size="md" variant="primary">
              <ProgressFilledTrack />
            </Progress>
          </VStack>
          <VStack spacing="xs">
            <Typography style={styles.label}>Large (lg)</Typography>
            <Progress value={75} size="lg" variant="primary">
              <ProgressFilledTrack />
            </Progress>
          </VStack>
          <VStack spacing="xs">
            <Typography style={styles.label}>Extra Large (xl)</Typography>
            <Progress value={75} size="xl" variant="primary">
              <ProgressFilledTrack />
            </Progress>
          </VStack>
        </VStack>
      </Box>

      {/* All Variants */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>All Variants</Typography>
        <VStack spacing="md">
          {[
            'default',
            'primary',
            'secondary',
            'outline',
            'filled',
            'ghost',
            'success',
            'error',
            'warning',
            'info',
            'destructive',
          ].map((variant) => (
            <VStack key={variant} spacing="xs">
              <Typography style={styles.label}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Typography>
              <Progress
                value={65}
                variant={variant as ComponentVariant}
                size="md"
              >
                <ProgressFilledTrack />
              </Progress>
            </VStack>
          ))}
        </VStack>
      </Box>

      {/* Overall Progress */}
      <Box style={styles.overallCard}>
        <Typography style={styles.overallTitle}>Overall Progress</Typography>
        <Typography style={styles.overallPercentage}>
          {overallProgress}%
        </Typography>
        <Progress value={overallProgress} size="lg" variant="primary">
          <ProgressFilledTrack />
        </Progress>

        <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
          <Typography style={styles.resetButtonText}>Reset Progress</Typography>
        </TouchableOpacity>
      </Box>

      {/* Task Progress List */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Project Tasks</Typography>
        <VStack spacing="md">
          {tasks.map((task) => (
            <Box key={task.id} style={styles.taskCard}>
              <HStack
                justify="space-between"
                align="center"
                style={styles.taskHeader}
              >
                <VStack spacing="xs" style={styles.taskInfo}>
                  <Typography style={styles.taskName}>{task.name}</Typography>
                  <Typography
                    style={[
                      styles.taskCategory,
                      { color: getStatusColor(task.status) },
                    ]}
                  >
                    {task.category.toUpperCase()} • {task.status.toUpperCase()}
                  </Typography>
                </VStack>
                <Typography style={styles.taskPercentage}>
                  {Math.round(task.progress)}%
                </Typography>
              </HStack>

              <Progress
                value={task.progress}
                variant={getVariantByStatus(task.status)}
                style={styles.taskProgress}
              >
                <ProgressFilledTrack />
              </Progress>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Category Summary */}
      <Box style={styles.summaryCard}>
        <Typography style={styles.summaryTitle}>Category Summary</Typography>

        {['development', 'design', 'testing', 'deployment'].map((category) => {
          const categoryTasks = tasks.filter(
            (task) => task.category === category
          );
          const categoryProgress =
            categoryTasks.length > 0
              ? categoryTasks.reduce((sum, task) => sum + task.progress, 0) /
                categoryTasks.length
              : 0;

          return (
            <VStack key={category} spacing="xs" style={styles.categoryItem}>
              <HStack justify="space-between">
                <Typography style={styles.categoryName}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
                <Typography style={styles.categoryPercentage}>
                  {Math.round(categoryProgress)}%
                </Typography>
              </HStack>
              <Progress value={categoryProgress} size="sm" variant="secondary">
                <ProgressFilledTrack />
              </Progress>
            </VStack>
          );
        })}
      </Box>

      {/* Real-world Examples */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Real-world Examples</Typography>
        <VStack spacing="lg">
          {/* File Upload */}
          <VStack spacing="sm">
            <Typography style={styles.exampleTitle}>File Upload</Typography>
            <Progress value={85} variant="info" size="md">
              <ProgressFilledTrack />
            </Progress>
            <Typography style={styles.exampleDescription}>
              Uploading document.pdf (85%)
            </Typography>
          </VStack>

          {/* System Health */}
          <VStack spacing="sm">
            <Typography style={styles.exampleTitle}>System Health</Typography>
            <VStack spacing="xs">
              <HStack justify="space-between">
                <Typography style={styles.metricLabel}>CPU Usage</Typography>
                <Typography style={styles.metricValue}>45%</Typography>
              </HStack>
              <Progress value={45} variant="success" size="sm">
                <ProgressFilledTrack />
              </Progress>
            </VStack>
            <VStack spacing="xs">
              <HStack justify="space-between">
                <Typography style={styles.metricLabel}>Memory Usage</Typography>
                <Typography style={styles.metricValue}>78%</Typography>
              </HStack>
              <Progress value={78} variant="warning" size="sm">
                <ProgressFilledTrack />
              </Progress>
            </VStack>
            <VStack spacing="xs">
              <HStack justify="space-between">
                <Typography style={styles.metricLabel}>Disk Usage</Typography>
                <Typography style={styles.metricValue}>92%</Typography>
              </HStack>
              <Progress value={92} variant="destructive" size="sm">
                <ProgressFilledTrack />
              </Progress>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </VScroll>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textAlign: 'center' ,
  },
  section: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
    borderRadius: theme.components.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '500' ,
    color: theme.colors.textSecondary,
  },
  overallCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.components.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  overallTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  overallPercentage: {
    fontSize: 32,
    fontWeight: '700' ,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  resetButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.components.borderRadius.md,
    marginTop: theme.spacing.md,
    alignSelf: 'center' ,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600' ,
  },
  taskCard: {
    padding: theme.spacing.md,
    borderRadius: theme.components.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  taskHeader: {
    marginBottom: theme.spacing.sm,
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
  },
  taskCategory: {
    fontSize: 12,
    fontWeight: '500' ,
  },
  taskPercentage: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
  },
  taskProgress: {
    marginTop: theme.spacing.xs,
  },
  summaryCard: {
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    borderRadius: theme.components.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  categoryItem: {
    marginBottom: theme.spacing.md,
  },
  categoryName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500' ,
    color: theme.colors.text,
  },
  categoryPercentage: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' ,
    color: theme.colors.textSecondary,
  },
  exampleTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
  },
  exampleDescription: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  metricLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  metricValue: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600' ,
    color: theme.colors.text,
  },
});

export default ProgressScreen;
