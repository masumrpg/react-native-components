import React, { forwardRef } from 'react';
import { View, ScrollView, ViewStyle, TextStyle, StyleProp, StyleSheet } from 'react-native';
import { Typography } from '../typography';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { createShadow } from '../../../utils';

interface TableProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  bordered?: boolean;
  striped?: boolean;
  scrollable?: boolean;
  variant?: 'default' | 'minimal' | 'elevated';
}

interface TableHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface TableBodyProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  striped?: boolean;
}

interface TableFooterProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface TableRowProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isHeader?: boolean;
  isEven?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

interface TableHeadProps {
  children?: React.ReactNode;
  style?: TextStyle;
  align?: 'left' | 'center' | 'right';
  flex?: number;
  sortable?: boolean;
  onSort?: () => void;
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
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createTableStyles);

    const processChildren = (children: React.ReactNode) => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TableBody) {
            return React.cloneElement(child as React.ReactElement<TableBodyProps>, { striped });
          }
          if (
            child.type === TableHeader ||
            child.type === TableBody ||
            child.type === TableFooter
          ) {
            const childElement = child as React.ReactElement<{
              children?: React.ReactNode;
            }>;
            const childrenArray = React.Children.toArray(childElement.props.children);
            const processedChildren = React.Children.map(
              childElement.props.children,
              (rowChild, index) => {
                if (React.isValidElement(rowChild) && rowChild.type === TableRow) {
                  return React.cloneElement(rowChild as React.ReactElement<TableRowProps>, {
                    isFirst: index === 0,
                    isLast: index === childrenArray.length - 1,
                    ...(child.type === TableHeader && { isHeader: true }),
                    ...(child.type === TableBody && striped && { isEven: index % 2 === 0 }),
                  });
                }
                return rowChild;
              }
            );
            return React.cloneElement(childElement, {
              children: processedChildren,
            });
          }
        }
        return child;
      });
    };

    const tableContent = (
      <View
        ref={ref}
        style={[styles.table, bordered && styles.bordered, styles[variant], style]}
        {...props}
      >
        {processChildren(children)}
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

const TableHeader = forwardRef<React.ComponentRef<typeof View>, TableHeaderProps>(
  ({ children, style, ...props }, ref) => {
    const styles = useThemedStyles(createTableHeaderStyles);

    return (
      <View ref={ref} style={[styles.header, style]} {...props}>
        {children}
      </View>
    );
  }
);

TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<React.ComponentRef<typeof View>, TableBodyProps>(
  ({ children, style, striped, ...props }, ref) => {
    const styles = useThemedStyles(createTableBodyStyles);

    return (
      <View ref={ref} style={[styles.body, style]} {...props}>
        {children}
      </View>
    );
  }
);

TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<React.ComponentRef<typeof View>, TableFooterProps>(
  ({ children, style, ...props }, ref) => {
    const styles = useThemedStyles(createTableFooterStyles);

    return (
      <View ref={ref} style={[styles.footer, style]} {...props}>
        {children}
      </View>
    );
  }
);

TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<React.ComponentRef<typeof View>, TableRowProps>(
  (
    {
      children,
      style,
      isHeader = false,
      isEven = false,
      isFirst = false,
      isLast = false,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createTableRowStyles);

    return (
      <View
        ref={ref}
        style={[
          styles.row,
          isHeader && styles.headerRow,
          isEven && styles.evenRow,
          isFirst && styles.firstRow,
          isLast && styles.lastRow,
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
  ({ children, style, align = 'left', flex = 1, sortable = false, onSort, ...props }, ref) => {
    const styles = useThemedStyles(createTableHeadStyles);

    return (
      <View ref={ref} style={[styles.cell, { flex }]}>
        <Typography variant="subtitle" style={[styles.headText, styles[align], style]} {...props}>
          {children}
        </Typography>
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
        <Typography variant="body" style={[styles.dataText, styles[align], style]} {...props}>
          {children}
        </Typography>
      </View>
    );
  }
);

TableData.displayName = 'TableData';

const TableCaption = forwardRef<React.ComponentRef<typeof Typography>, TableCaptionProps>(
  ({ children, style, position = 'bottom', ...props }, ref) => {
    const styles = useThemedStyles(createTableCaptionStyles);

    return (
      <Typography
        variant="small"
        ref={ref}
        style={[styles.caption, styles[position], style]}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);

TableCaption.displayName = 'TableCaption';

// Styles
const createTableStyles = (theme: Theme) => StyleSheet.create({
  table: {
    backgroundColor: theme.colors.surface,
    overflow: 'hidden' ,
  },
  bordered: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.components.borderRadius.md,
  },
  default: {
    // Default styling
  },
  minimal: {
    backgroundColor: 'transparent',
  },
  elevated: {
    ...createShadow(5),
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

const createTableRowStyles = (theme: Theme) => StyleSheet.create({
  row: {
    flexDirection: 'row' ,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    minHeight: 44,
    alignItems: 'center' ,
  },
  headerRow: {
    backgroundColor: theme.colors.background,
  },
  evenRow: {
    backgroundColor: theme.colors.background,
  },
  firstRow: {
    borderTopLeftRadius: theme.components.borderRadius.md,
    borderTopRightRadius: theme.components.borderRadius.md,
    overflow: 'hidden' ,
  },
  lastRow: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: theme.components.borderRadius.md,
    borderBottomRightRadius: theme.components.borderRadius.md,
    overflow: 'hidden' ,
  },
});

const createTableHeadStyles = (theme: Theme) => StyleSheet.create({
  cell: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  headText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    fontWeight: '600' ,
    color: theme.colors.text,
  },
  left: {
    textAlign: 'left' ,
  },
  center: {
    textAlign: 'center' ,
  },
  right: {
    textAlign: 'right' ,
  },
});

const createTableDataStyles = (theme: Theme) => StyleSheet.create({
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
    textAlign: 'left' ,
  },
  center: {
    textAlign: 'center' ,
  },
  right: {
    textAlign: 'right' ,
  },
});

const createTableCaptionStyles = (theme: Theme) => StyleSheet.create({
  caption: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.textSecondary,
    textAlign: 'center' ,
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
