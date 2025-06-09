import React, { forwardRef } from 'react';
import { View, Text, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

interface TableProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  bordered?: boolean;
  striped?: boolean;
  scrollable?: boolean;
}

interface TableHeaderProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface TableBodyProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  striped?: boolean; // Added missing property
}

interface TableFooterProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface TableRowProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  isHeader?: boolean;
  isEven?: boolean;
}

interface TableHeadProps {
  children?: React.ReactNode;
  style?: TextStyle;
  align?: 'left' | 'center' | 'right';
  flex?: number;
}

interface TableDataProps {
  children?: React.ReactNode;
  style?: TextStyle;
  align?: 'left' | 'center' | 'right';
  flex?: number;
}

interface TableCaptionProps {
  children?: React.ReactNode;
  style?: TextStyle;
  position?: 'top' | 'bottom';
}

const Table = forwardRef<React.ComponentRef<typeof View>, TableProps>(
  (
    {
      children,
      style,
      bordered = true,
      striped = false,
      scrollable = false,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createTableStyles);

    const tableContent = (
      <View
        ref={ref}
        style={[styles.table, bordered && styles.bordered, style]}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TableBody) {
            return React.cloneElement(
              child as React.ReactElement<TableBodyProps>,
              { striped }
            );
          }
          return child;
        })}
      </View>
    );

    if (scrollable) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tableContent}
        </ScrollView>
      );
    }

    return tableContent;
  }
);

Table.displayName = 'Table';

const TableHeader = forwardRef<
  React.ComponentRef<typeof View>,
  TableHeaderProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createTableHeaderStyles);

  return (
    <View ref={ref} style={[styles.header, style]} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TableRow) {
          return React.cloneElement(
            child as React.ReactElement<TableRowProps>,
            { isHeader: true }
          );
        }
        return child;
      })}
    </View>
  );
});

TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<React.ComponentRef<typeof View>, TableBodyProps>(
  ({ children, style, striped, ...props }, ref) => {
    const styles = useThemedStyles(createTableBodyStyles);

    return (
      <View ref={ref} style={[styles.body, style]} {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === TableRow) {
            return React.cloneElement(
              child as React.ReactElement<TableRowProps>,
              {
                isEven: striped && index % 2 === 0,
              }
            );
          }
          return child;
        })}
      </View>
    );
  }
);

TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<
  React.ComponentRef<typeof View>,
  TableFooterProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createTableFooterStyles);

  return (
    <View ref={ref} style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
});

TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<React.ComponentRef<typeof View>, TableRowProps>(
  ({ children, style, isHeader = false, isEven = false, ...props }, ref) => {
    const styles = useThemedStyles(createTableRowStyles);

    return (
      <View
        ref={ref}
        style={[
          styles.row,
          isHeader && styles.headerRow,
          isEven && styles.evenRow,
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

TableRow.displayName = 'TableRow';

const TableHead = forwardRef<React.ComponentRef<typeof View>, TableHeadProps>(
  ({ children, style, align = 'left', flex = 1, ...props }, ref) => {
    const styles = useThemedStyles(createTableHeadStyles);

    return (
      <View ref={ref} style={[styles.cell, { flex }]}>
        <Text style={[styles.headText, styles[align], style]} {...props}>
          {children}
        </Text>
      </View>
    );
  }
);

TableHead.displayName = 'TableHead';

const TableData = forwardRef<React.ComponentRef<typeof View>, TableDataProps>(
  ({ children, style, align = 'left', flex = 1, ...props }, ref) => {
    const styles = useThemedStyles(createTableDataStyles);

    return (
      <View ref={ref} style={[styles.cell, { flex }]}>
        <Text style={[styles.dataText, styles[align], style]} {...props}>
          {children}
        </Text>
      </View>
    );
  }
);

TableData.displayName = 'TableData';

const TableCaption = forwardRef<
  React.ComponentRef<typeof Text>,
  TableCaptionProps
>(({ children, style, position = 'bottom', ...props }, ref) => {
  const styles = useThemedStyles(createTableCaptionStyles);

  return (
    <Text
      ref={ref}
      style={[styles.caption, styles[position], style]}
      {...props}
    >
      {children}
    </Text>
  );
});

TableCaption.displayName = 'TableCaption';

// Styles
const createTableStyles = (theme: Theme) => ({
  table: {
    backgroundColor: theme.colors.surface,
  },
  bordered: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
  },
});

const createTableHeaderStyles = (theme: Theme) => ({
  header: {
    backgroundColor: theme.colors.background,
  },
});

const createTableBodyStyles = (theme: Theme) => ({
  body: {},
});

const createTableFooterStyles = (theme: Theme) => ({
  footer: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

const createTableRowStyles = (theme: Theme) => ({
  row: {
    flexDirection: 'row' as const,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    minHeight: 44,
    alignItems: 'center' as const,
  },
  headerRow: {
    backgroundColor: theme.colors.background,
  },
  evenRow: {
    backgroundColor: theme.colors.background,
  },
});

const createTableHeadStyles = (theme: Theme) => ({
  cell: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  headText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  left: {
    textAlign: 'left' as const,
  },
  center: {
    textAlign: 'center' as const,
  },
  right: {
    textAlign: 'right' as const,
  },
});

const createTableDataStyles = (theme: Theme) => ({
  cell: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  dataText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.text,
  },
  left: {
    textAlign: 'left' as const,
  },
  center: {
    textAlign: 'center' as const,
  },
  right: {
    textAlign: 'right' as const,
  },
});

const createTableCaptionStyles = (theme: Theme) => ({
  caption: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
    paddingVertical: theme.spacing.sm,
  },
  top: {
    paddingBottom: theme.spacing.md,
  },
  bottom: {
    paddingTop: theme.spacing.md,
  },
});

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableData,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableDataProps,
  type TableCaptionProps,
};
