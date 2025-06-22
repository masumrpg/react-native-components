import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableData,
  TableCaption,
  Badge,
  BadgeText,
  useThemedStyles,
  Theme,
  ComponentVariant,
} from 'rnc-theme';
import { Ionicons } from '@expo/vector-icons';

// 1. SIMPLE TABLE - Basic data display
const SimpleTable: React.FC = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>1. Simple Table</Text>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead align="right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>iPhone 15</TableData>
            <TableData align="right">$999</TableData>
          </TableRow>
          <TableRow>
            <TableData>MacBook Pro</TableData>
            <TableData align="right">$2,499</TableData>
          </TableRow>
          <TableRow>
            <TableData>AirPods Pro</TableData>
            <TableData align="right">$249</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  );
};

// 2. STRIPED TABLE - With alternating row colors
const StripedTable: React.FC = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>2. Striped Table</Text>
      <Table striped>
        <TableCaption position="top">Monthly Sales Report</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead align="center">Orders</TableHead>
            <TableHead align="right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { month: 'January', orders: 245, revenue: 12500 },
            { month: 'February', orders: 189, revenue: 9800 },
            { month: 'March', orders: 312, revenue: 15600 },
            { month: 'April', orders: 278, revenue: 14200 },
            { month: 'May', orders: 356, revenue: 18900 },
          ].map((item, index) => (
            <TableRow key={index}>
              <TableData>{item.month}</TableData>
              <TableData align="center">{item.orders}</TableData>
              <TableData align="right">
                ${item.revenue.toLocaleString()}
              </TableData>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableData style={{ fontWeight: '600' }}>Total</TableData>
            <TableData align="center" style={{ fontWeight: '600' }}>
              1,380
            </TableData>
            <TableData align="right" style={{ fontWeight: '600' }}>
              $71,000
            </TableData>
          </TableRow>
        </TableFooter>
      </Table>
    </View>
  );
};

// 3. INTERACTIVE TABLE - With sorting and filtering
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const InteractiveTable: React.FC = () => {
  const styles = useThemedStyles(createStyles);
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Laptop Gaming',
      category: 'Electronics',
      price: 1299,
      stock: 15,
      status: 'in-stock',
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 29,
      stock: 3,
      status: 'low-stock',
    },
    {
      id: '3',
      name: 'Office Chair',
      category: 'Furniture',
      price: 199,
      stock: 0,
      status: 'out-of-stock',
    },
    {
      id: '4',
      name: 'Desk Lamp',
      category: 'Furniture',
      price: 45,
      stock: 8,
      status: 'in-stock',
    },
    {
      id: '5',
      name: 'Smartphone',
      category: 'Electronics',
      price: 699,
      stock: 25,
      status: 'in-stock',
    },
  ]);

  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return (
          <Badge variant="success" size="sm">
            <BadgeText>In Stock</BadgeText>
          </Badge>
        );
      case 'low-stock':
        return (
          <Badge variant="warning" size="sm">
            <BadgeText>Low Stock</BadgeText>
          </Badge>
        );
      case 'out-of-stock':
        return (
          <Badge variant="error" size="sm">
            <BadgeText>Out of Stock</BadgeText>
          </Badge>
        );
      default:
        return (
          <Badge variant="default" size="sm">
            <BadgeText>{status}</BadgeText>
          </Badge>
        );
    }
  };

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        filterCategory === 'all' || product.category === filterCategory
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

  const getSortIcon = (field: keyof Product) => {
    if (sortField !== field) return 'swap-vertical';
    return sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        3. Interactive Table with Sorting & Filtering
      </Text>

      {/* Filter Controls */}
      <View style={styles.filterRow}>
        {['all', 'Electronics', 'Furniture'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              filterCategory === category && styles.filterButtonActive,
            ]}
            onPress={() => setFilterCategory(category)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterCategory === category && styles.filterButtonTextActive,
              ]}
            >
              {category === 'all' ? 'All Categories' : category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Table bordered striped scrollable>
        <TableHeader>
          <TableRow>
            <TableHead flex={2}>
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('name')}
              >
                <Text style={styles.headerText}>Product Name</Text>
                <Ionicons name={getSortIcon('name')} size={16} color="#666" />
              </TouchableOpacity>
            </TableHead>
            <TableHead>
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('category')}
              >
                <Text style={styles.headerText}>Category</Text>
                <Ionicons
                  name={getSortIcon('category')}
                  size={16}
                  color="#666"
                />
              </TouchableOpacity>
            </TableHead>
            <TableHead align="right">
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('price')}
              >
                <Text style={styles.headerText}>Price</Text>
                <Ionicons name={getSortIcon('price')} size={16} color="#666" />
              </TouchableOpacity>
            </TableHead>
            <TableHead align="center">
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('stock')}
              >
                <Text style={styles.headerText}>Stock</Text>
                <Ionicons name={getSortIcon('stock')} size={16} color="#666" />
              </TouchableOpacity>
            </TableHead>
            <TableHead align="center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableData flex={2}>{product.name}</TableData>
              <TableData>{product.category}</TableData>
              <TableData align="right">${product.price}</TableData>
              <TableData align="center">{product.stock}</TableData>
              <TableData align="center">
                {getStatusBadge(product.status)}
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  );
};

// 4. COMPLEX DASHBOARD TABLE - Real-world analytics
interface AnalyticsData {
  id: string;
  page: string;
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgTimeOnPage: string;
  conversions: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
}

const DashboardTable: React.FC = () => {
  const styles = useThemedStyles(createStyles);
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData] = useState<AnalyticsData[]>([
    {
      id: '1',
      page: '/home',
      views: 12543,
      uniqueVisitors: 8932,
      bounceRate: 32.5,
      avgTimeOnPage: '2:34',
      conversions: 156,
      revenue: 15600,
      trend: 'up',
    },
    {
      id: '2',
      page: '/products',
      views: 8765,
      uniqueVisitors: 6234,
      bounceRate: 28.7,
      avgTimeOnPage: '3:12',
      conversions: 234,
      revenue: 23400,
      trend: 'up',
    },
    {
      id: '3',
      page: '/about',
      views: 3421,
      uniqueVisitors: 2876,
      bounceRate: 45.2,
      avgTimeOnPage: '1:45',
      conversions: 12,
      revenue: 1200,
      trend: 'down',
    },
    {
      id: '4',
      page: '/contact',
      views: 1987,
      uniqueVisitors: 1654,
      bounceRate: 52.1,
      avgTimeOnPage: '1:23',
      conversions: 45,
      revenue: 4500,
      trend: 'stable',
    },
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <Ionicons name="trending-up" size={16} color="#10B981" />;
      case 'down':
        return <Ionicons name="trending-down" size={16} color="#EF4444" />;
      default:
        return <Ionicons name="remove" size={16} color="#6B7280" />;
    }
  };

  const totalViews = analyticsData.reduce((sum, item) => sum + item.views, 0);
  const totalRevenue = analyticsData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const avgBounceRate =
    analyticsData.reduce((sum, item) => sum + item.bounceRate, 0) /
    analyticsData.length;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>4. Analytics Dashboard Table</Text>

      {/* Time Range Selector */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Time Range:</Text>
        {['24h', '7d', '30d', '90d'].map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.filterButton,
              timeRange === range && styles.filterButtonActive,
            ]}
            onPress={() => setTimeRange(range)}
          >
            <Text
              style={[
                styles.filterButtonText,
                timeRange === range && styles.filterButtonTextActive,
              ]}
            >
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Table bordered variant="elevated" scrollable>
        <TableCaption position="top">
          Website Analytics - Last {timeRange}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead flex={2}>Page</TableHead>
            <TableHead align="right">Views</TableHead>
            <TableHead align="right">Unique</TableHead>
            <TableHead align="right">Bounce %</TableHead>
            <TableHead align="center">Avg Time</TableHead>
            <TableHead align="right">Conv.</TableHead>
            <TableHead align="right">Revenue</TableHead>
            <TableHead align="center">Trend</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {analyticsData.map((item) => (
            <TableRow key={item.id}>
              <TableData flex={2}>
                <Text style={styles.pageUrl}>{item.page}</Text>
              </TableData>
              <TableData align="right">
                <Text style={styles.metricValue}>
                  {item.views.toLocaleString()}
                </Text>
              </TableData>
              <TableData align="right">
                <Text style={styles.metricValue}>
                  {item.uniqueVisitors.toLocaleString()}
                </Text>
              </TableData>
              <TableData align="right">
                <Text
                  style={[
                    styles.metricValue,
                    { color: item.bounceRate > 40 ? '#EF4444' : '#10B981' },
                  ]}
                >
                  {item.bounceRate}%
                </Text>
              </TableData>
              <TableData align="center">
                <Text style={styles.metricValue}>{item.avgTimeOnPage}</Text>
              </TableData>
              <TableData align="right">
                <Text style={styles.metricValue}>{item.conversions}</Text>
              </TableData>
              <TableData align="right">
                <Text style={[styles.metricValue, styles.revenueText]}>
                  ${item.revenue.toLocaleString()}
                </Text>
              </TableData>
              <TableData align="center">{getTrendIcon(item.trend)}</TableData>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableData flex={2}>
              <Text style={styles.footerText}>Totals</Text>
            </TableData>
            <TableData align="right">
              <Text style={styles.footerText}>
                {totalViews.toLocaleString()}
              </Text>
            </TableData>
            <TableData align="right">
              <Text style={styles.footerText}>-</Text>
            </TableData>
            <TableData align="right">
              <Text style={styles.footerText}>{avgBounceRate.toFixed(1)}%</Text>
            </TableData>
            <TableData align="center">
              <Text style={styles.footerText}>-</Text>
            </TableData>
            <TableData align="right">
              <Text style={styles.footerText}>-</Text>
            </TableData>
            <TableData align="right">
              <Text style={[styles.footerText, styles.revenueText]}>
                ${totalRevenue.toLocaleString()}
              </Text>
            </TableData>
            <TableData align="center">
              <Text style={styles.footerText}>-</Text>
            </TableData>
          </TableRow>
        </TableFooter>
      </Table>
    </View>
  );
};

// 5. ACTIONABLE TABLE - With inline actions
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

const ActionableTable: React.FC = () => {
  const styles = useThemedStyles(createStyles);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-14',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'moderator',
      status: 'inactive',
      lastLogin: '2024-01-10',
    },
  ]);

  const handleUserAction = (userId: string, action: string) => {
    Alert.alert(
      'Action Confirmation',
      `Are you sure you want to ${action} this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            if (action === 'delete') {
              setUsers(users.filter((user) => user.id !== userId));
            } else {
              setUsers(
                users.map((user) =>
                  user.id === userId
                    ? {
                        ...user,
                        status: action === 'activate' ? 'active' : 'inactive',
                      }
                    : user
                )
              );
            }
          },
        },
      ]
    );
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'error',
      moderator: 'warning',
      user: 'default',
    };
    return (
      <Badge variant={variants[role as keyof typeof variants] as ComponentVariant} size="sm">
        <BadgeText>{role.charAt(0).toUpperCase() + role.slice(1)}</BadgeText>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'success',
      inactive: 'error',
      pending: 'warning',
    };
    return (
      <Badge
        variant={variants[status as keyof typeof variants] as ComponentVariant}
        size="sm"
      >
        <BadgeText>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </BadgeText>
      </Badge>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        5. User Management Table with Actions
      </Text>

      <Table bordered>
        <TableHeader>
          <TableRow>
            <TableHead flex={2}>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead align="center">Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead align="center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableData flex={2}>
                <View>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
              </TableData>
              <TableData>{getRoleBadge(user.role)}</TableData>
              <TableData align="center">
                {getStatusBadge(user.status)}
              </TableData>
              <TableData>
                <Text style={styles.dateText}>
                  {new Date(user.lastLogin).toLocaleDateString()}
                </Text>
              </TableData>
              <TableData align="center">
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() =>
                      Alert.alert('Edit User', `Edit ${user.name}`)
                    }
                  >
                    <Ionicons name="pencil" size={14} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      user.status === 'active'
                        ? styles.deactivateButton
                        : styles.activateButton,
                    ]}
                    onPress={() =>
                      handleUserAction(
                        user.id,
                        user.status === 'active' ? 'deactivate' : 'activate'
                      )
                    }
                  >
                    <Ionicons
                      name={user.status === 'active' ? 'pause' : 'play'}
                      size={14}
                      color="white"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleUserAction(user.id, 'delete')}
                  >
                    <Ionicons name="trash" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </View>
  );
};

// 6. MINIMAL TABLE - Clean design
const MinimalTable: React.FC = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>6. Minimal Design Table</Text>

      <Table variant="minimal" bordered={false}>
        <TableBody>
          <TableRow>
            <TableData>
              <Text style={styles.labelText}>Name</Text>
            </TableData>
            <TableData>
              <Text style={styles.valueText}>John Doe</Text>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <Text style={styles.labelText}>Email</Text>
            </TableData>
            <TableData>
              <Text style={styles.valueText}>john@example.com</Text>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <Text style={styles.labelText}>Phone</Text>
            </TableData>
            <TableData>
              <Text style={styles.valueText}>+1 (555) 123-4567</Text>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <Text style={styles.labelText}>Department</Text>
            </TableData>
            <TableData>
              <Text style={styles.valueText}>Engineering</Text>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  );
};

// Main Examples Component
const TableExamples: React.FC = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Table Component Examples</Text>
      <Text style={styles.subtitle}>
        Berbagai contoh penggunaan Table component dari yang sederhana hingga
        kompleks
      </Text>

      <SimpleTable />
      <StripedTable />
      <InteractiveTable />
      <DashboardTable />
      <ActionableTable />
      <MinimalTable />
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
    fontWeight: '700' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  filterRow: {
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
    flexWrap: 'wrap' as const,
    marginBottom: theme.spacing.md,
    alignItems: 'center' as const,
  },
  filterLabel: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.components.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterButtonText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  filterButtonTextActive: {
    color: 'white',
  },
  sortableHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  },
  headerText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  pageUrl: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500' as const,
    color: theme.colors.primary,
  },
  metricValue: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  revenueText: {
    fontWeight: '600' as const,
    color: theme.colors.success,
  },
  footerText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  userName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  dateText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row' as const,
    gap: theme.spacing.xs,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: theme.components.borderRadius.sm,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  activateButton: {
    backgroundColor: theme.colors.success,
  },
  deactivateButton: {
    backgroundColor: theme.colors.warning,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  labelText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500' as const,
    color: theme.colors.textSecondary,
  },
  valueText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
});

export default TableExamples;
