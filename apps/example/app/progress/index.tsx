import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Progress,
  ProgressFilledTrack,
  HStack,
  VStack,
  Box,
  useThemedStyles,
  Theme,
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
  ): 'default' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'in-progress':
        return 'default';
      default:
        return 'warning';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'failed':
        return '#EF4444';
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
        status: 'in-progress' as const,
      }))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Project Dashboard</Text>

      {/* Overall Progress */}
      <Box style={styles.overallCard}>
        <Text style={styles.overallTitle}>Overall Progress</Text>
        <Text style={styles.overallPercentage}>{overallProgress}%</Text>
        <Progress value={overallProgress} size="lg" variant="default">
          <ProgressFilledTrack />
        </Progress>

        <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
      </Box>

      {/* Task Progress List */}
      <VStack spacing="md">
        {tasks.map((task) => (
          <Box key={task.id} style={styles.taskCard}>
            <HStack
              justify="space-between"
              align="center"
              style={styles.taskHeader}
            >
              <VStack spacing="xs" style={styles.taskInfo}>
                <Text style={styles.taskName}>{task.name}</Text>
                <Text
                  style={[
                    styles.taskCategory,
                    { color: getStatusColor(task.status) },
                  ]}
                >
                  {task.category.toUpperCase()} • {task.status.toUpperCase()}
                </Text>
              </VStack>
              <Text style={styles.taskPercentage}>
                {Math.round(task.progress)}%
              </Text>
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

      {/* Category Summary */}
      <Box style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Category Summary</Text>

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
                <Text style={styles.categoryName}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <Text style={styles.categoryPercentage}>
                  {Math.round(categoryProgress)}%
                </Text>
              </HStack>
              <Progress value={categoryProgress} size="sm">
                <ProgressFilledTrack />
              </Progress>
            </VStack>
          );
        })}
      </Box>
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textAlign: 'center' as const,
  },
  overallCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  overallTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  overallPercentage: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  resetButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
    alignSelf: 'center' as const,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  taskCard: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
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
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  taskCategory: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  taskPercentage: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  taskProgress: {
    marginTop: theme.spacing.xs,
  },
  summaryCard: {
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  categoryItem: {
    marginBottom: theme.spacing.md,
  },
  categoryName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500' as const,
    color: theme.colors.text,
  },
  categoryPercentage: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.textSecondary,
  },
});

export default ProgressScreen;
