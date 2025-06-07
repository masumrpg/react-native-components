import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
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
  Theme
} from 'rnc-theme';
import { Ionicons } from '@expo/vector-icons';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const TableScreen: React.FC = () => {
  const styles = useThemedStyles(createStyles);
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      department: 'Engineering',
      salary: 85000,
      status: 'active',
      joinDate: '2023-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@company.com',
      department: 'Design',
      salary: 75000,
      status: 'active',
      joinDate: '2023-03-20',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@company.com',
      department: 'Marketing',
      salary: 65000,
      status: 'inactive',
      joinDate: '2022-11-10',
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@company.com',
      department: 'Engineering',
      salary: 90000,
      status: 'pending',
      joinDate: '2024-01-05',
    },
  ]);

  const [sortField, setSortField] = useState<keyof Employee>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="success" size="sm">
            <BadgeText>Active</BadgeText>
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="error" size="sm">
            <BadgeText>Inactive</BadgeText>
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" size="sm">
            <BadgeText>Pending</BadgeText>
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

  const filteredAndSortedEmployees = employees
    .filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === 'all' || emp.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
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

  const totalSalary = filteredAndSortedEmployees.reduce(
    (sum, emp) => sum + emp.salary,
    0
  );
  const averageSalary =
    filteredAndSortedEmployees.length > 0
      ? totalSalary / filteredAndSortedEmployees.length
      : 0;

  const getSortIcon = (field: keyof Employee) => {
    if (sortField !== field) return 'swap-vertical';
    return sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Controls */}
      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search employees..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <View style={styles.filterRow}>
          {['all', 'active', 'inactive', 'pending'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                filterStatus === status && styles.filterButtonActive,
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterStatus === status && styles.filterButtonTextActive,
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Employee Table */}
      <Table bordered striped scrollable>
        <TableCaption position="top">
          Employee Directory ({filteredAndSortedEmployees.length} employees)
        </TableCaption>

        <TableHeader>
          <TableRow isHeader>
            <TableHead flex={2}>
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('name')}
              >
                <Text style={styles.headerText}>Name</Text>
                <Ionicons
                  name={getSortIcon('name')}
                  size={16}
                  color={styles.headerText.color}
                />
              </TouchableOpacity>
            </TableHead>

            <TableHead flex={2}>
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('email')}
              >
                <Text style={styles.headerText}>Email</Text>
                <Ionicons
                  name={getSortIcon('email')}
                  size={16}
                  color={styles.headerText.color}
                />
              </TouchableOpacity>
            </TableHead>

            <TableHead>
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('department')}
              >
                <Text style={styles.headerText}>Department</Text>
                <Ionicons
                  name={getSortIcon('department')}
                  size={16}
                  color={styles.headerText.color}
                />
              </TouchableOpacity>
            </TableHead>

            <TableHead align="right">
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('salary')}
              >
                <Text style={styles.headerText}>Salary</Text>
                <Ionicons
                  name={getSortIcon('salary')}
                  size={16}
                  color={styles.headerText.color}
                />
              </TouchableOpacity>
            </TableHead>

            <TableHead align="center">Status</TableHead>

            <TableHead>
              <TouchableOpacity
                style={styles.sortableHeader}
                onPress={() => handleSort('joinDate')}
              >
                <Text style={styles.headerText}>Join Date</Text>
                <Ionicons
                  name={getSortIcon('joinDate')}
                  size={16}
                  color={styles.headerText.color}
                />
              </TouchableOpacity>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredAndSortedEmployees.map((employee, index) => (
            <TableRow key={employee.id} isEven={index % 2 === 0}>
              <TableData flex={2}>
                <Text style={styles.employeeName}>{employee.name}</Text>
              </TableData>

              <TableData flex={2}>
                <Text style={styles.employeeEmail}>{employee.email}</Text>
              </TableData>

              <TableData>
                <Text style={styles.department}>{employee.department}</Text>
              </TableData>

              <TableData align="right">
                <Text style={styles.salary}>
                  ${employee.salary.toLocaleString()}
                </Text>
              </TableData>

              <TableData align="center">
                {getStatusBadge(employee.status)}
              </TableData>

              <TableData>
                <Text style={styles.joinDate}>
                  {new Date(employee.joinDate).toLocaleDateString()}
                </Text>
              </TableData>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableData flex={4} style={styles.footerCell}>
              <Text style={styles.footerText}>Summary</Text>
            </TableData>

            <TableData align="right" style={styles.footerCell}>
              <Text style={styles.footerText}>
                Avg: ${Math.round(averageSalary).toLocaleString()}
              </Text>
            </TableData>

            <TableData align="center" style={styles.footerCell}>
              <Text style={styles.footerText}>
                {
                  filteredAndSortedEmployees.filter(
                    (e) => e.status === 'active'
                  ).length
                }{' '}
                Active
              </Text>
            </TableData>

            <TableData style={styles.footerCell}>
              <Text style={styles.footerText}>
                Total: ${totalSalary.toLocaleString()}
              </Text>
            </TableData>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Statistics */}
      <View style={styles.statistics}>
        <Text style={styles.statisticsTitle}>Department Statistics</Text>

        <Table bordered>
          <TableHeader>
            <TableRow isHeader>
              <TableHead>Department</TableHead>
              <TableHead align="center">Employees</TableHead>
              <TableHead align="right">Avg Salary</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(
              filteredAndSortedEmployees.reduce((acc, emp) => {
                if (!acc[emp.department]) {
                  acc[emp.department] = { count: 0, totalSalary: 0 };
                }
                acc[emp.department].count++;
                acc[emp.department].totalSalary += emp.salary;
                return acc;
              }, {} as Record<string, { count: number; totalSalary: number }>)
            ).map(([dept, stats]) => (
              <TableRow key={dept}>
                <TableData>{dept}</TableData>
                <TableData align="center">{stats.count}</TableData>
                <TableData align="right">
                  $
                  {Math.round(stats.totalSalary / stats.count).toLocaleString()}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
  controls: {
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterRow: {
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
    flexWrap: 'wrap' as const,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
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
  employeeName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  employeeEmail: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  department: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  salary: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.success,
  },
  joinDate: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  footerCell: {
    // backgroundColor: theme.colors.surface,
  },
  footerText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  statistics: {
    marginTop: theme.spacing.xl,
  },
  statisticsTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
});

export default TableScreen;
