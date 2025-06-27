import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  DatePicker,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  ButtonText,
  useTheme,
  VStack,
  HStack,
  VScroll,
  useToast,
} from 'rnc-theme';
import { Text } from 'react-native';

const DatePickerScreen = () => {
  const { theme } = useTheme();
  const { toast } = useToast();

  const [basicDate, setBasicDate] = useState<string>('');
  const [birthdayDate, setBirthdayDate] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');

  const handleBasicDateSelect = (date: string) => {
    setBasicDate(date);
    toast({
      title: 'Date Picker',
      description: `You choose: ${date}`,
    });
  };

  const handleBirthdaySelect = (date: string) => {
    setBirthdayDate(date);
  };

  const handleAppointmentSelect = (date: string) => {
    setAppointmentDate(date);
  };

  const handleEventSelect = (date: string) => {
    setEventDate(date);
  };

  const today = new Date();
  const maxBirthday = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split('T')[0];
  const minAppointment = today.toISOString().split('T')[0];
  const maxAppointment = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split('T')[0];

  return (
    <VScroll
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <VStack spacing="lg">
        {/* Basic DatePicker */}
        <Card>
          <CardHeader>
            <Typography variant="h3">DatePicker Dasar</Typography>
            <Typography variant="body" color="textSecondary">
              Contoh penggunaan DatePicker sederhana
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <DatePicker
                label="Pilih Tanggal"
                placeholder="Klik untuk memilih tanggal"
                value={basicDate}
                onDateSelect={handleBasicDateSelect}
                helperText="Format: DD/MM/YYYY"
              />
              {basicDate && (
                <Text style={{ color: theme.colors.text }}>
                  Tanggal terpilih: {basicDate}
                </Text>
              )}
            </VStack>
          </CardContent>
        </Card>

        {/* Different Formats */}
        <Card>
          <CardHeader>
            <Typography variant="h3">Format Tanggal</Typography>
            <Typography variant="body" color="textSecondary">
              DatePicker dengan berbagai format tanggal
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <DatePicker
                label="Format DD/MM/YYYY"
                placeholder="Pilih tanggal"
                dateFormat="DD/MM/YYYY"
                size="sm"
              />
              <DatePicker
                label="Format MM/DD/YYYY"
                placeholder="Pilih tanggal"
                dateFormat="MM/DD/YYYY"
                size="md"
              />
              <DatePicker
                label="Format YYYY-MM-DD"
                placeholder="Pilih tanggal"
                dateFormat="YYYY-MM-DD"
                size="lg"
              />
              <DatePicker
                label="Format DD MMM YYYY"
                placeholder="Pilih tanggal"
                dateFormat="DD MMM YYYY"
              />
            </VStack>
          </CardContent>
        </Card>

        {/* Variants and Sizes */}
        <Card>
          <CardHeader>
            <Typography variant="h3">Varian dan Ukuran</Typography>
            <Typography variant="body" color="textSecondary">
              DatePicker dengan berbagai varian dan ukuran
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <DatePicker
                label="Default Variant"
                placeholder="Default"
                variant="default"
                size="sm"
              />
              <DatePicker
                label="Filled Variant"
                placeholder="Filled"
                variant="filled"
                size="md"
              />
              <DatePicker
                label="Outlined Variant"
                placeholder="Outlined"
                variant="outline"
                size="lg"
              />
            </VStack>
          </CardContent>
        </Card>

        {/* Icon Positions */}
        <Card>
          <CardHeader>
            <Typography variant="h3">Posisi Icon</Typography>
            <Typography variant="body" color="textSecondary">
              DatePicker dengan posisi icon yang berbeda
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <DatePicker
                label="Icon Kiri"
                placeholder="Icon di sebelah kiri"
                iconPosition="left"
              />
              <DatePicker
                label="Icon Kanan"
                placeholder="Icon di sebelah kanan"
                iconPosition="right"
              />
              <DatePicker
                label="Tanpa Icon"
                placeholder="Tanpa icon"
                showIcon={false}
              />
            </VStack>
          </CardContent>
        </Card>

        {/* Practical Examples */}
        <Card>
          <CardHeader>
            <Typography variant="h3">Contoh Praktis</Typography>
            <Typography variant="body" color="textSecondary">
              Penggunaan DatePicker dalam skenario nyata
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              {/* Birthday Picker */}
              <DatePicker
                label="Tanggal Lahir"
                placeholder="Pilih tanggal lahir Anda"
                value={birthdayDate}
                onDateSelect={handleBirthdaySelect}
                maxDate={maxBirthday}
                dateFormat="DD MMM YYYY"
                helperText="Minimal umur 13 tahun"
                required
              />

              {/* Appointment Picker */}
              <DatePicker
                label="Jadwal Appointment"
                placeholder="Pilih tanggal appointment"
                value={appointmentDate}
                onDateSelect={handleAppointmentSelect}
                minDate={minAppointment}
                maxDate={maxAppointment}
                helperText="Hanya bisa memilih tanggal masa depan"
                variant="filled"
              />

              {/* Event Date */}
              <DatePicker
                label="Tanggal Event"
                placeholder="Pilih tanggal event"
                value={eventDate}
                onDateSelect={handleEventSelect}
                closeOnSelect={false}
                variant="outline"
                helperText="Tanggal dengan tanda memiliki event khusus"
              />
            </VStack>
          </CardContent>
        </Card>

        {/* States */}
        <Card>
          <CardHeader>
            <Typography variant="h3">Status Komponen</Typography>
            <Typography variant="body" color="textSecondary">
              DatePicker dalam berbagai status
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <DatePicker
                label="Normal State"
                placeholder="Status normal"
                helperText="Ini adalah helper text"
              />
              <DatePicker
                label="Disabled State"
                placeholder="Status disabled"
                disabled
                helperText="DatePicker ini tidak dapat digunakan"
              />
              <DatePicker
                label="Error State"
                placeholder="Status error"
                error="Tanggal tidak valid"
              />
              <DatePicker
                label="Required Field"
                placeholder="Field wajib diisi"
                required
                helperText="Field ini wajib diisi"
              />
            </VStack>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <Typography variant="h3">Ringkasan Pilihan</Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="sm">
              <HStack spacing="md">
                <Typography variant="body" style={{ fontWeight: 'bold' }}>
                  Tanggal Dasar:
                </Typography>
                <Typography variant="body">
                  {basicDate || 'Belum dipilih'}
                </Typography>
              </HStack>
              <HStack spacing="md">
                <Typography variant="body" style={{ fontWeight: 'bold' }}>
                  Tanggal Lahir:
                </Typography>
                <Typography variant="body">
                  {birthdayDate || 'Belum dipilih'}
                </Typography>
              </HStack>
              <HStack spacing="md">
                <Typography variant="body" style={{ fontWeight: 'bold' }}>
                  Appointment:
                </Typography>
                <Typography variant="body">
                  {appointmentDate || 'Belum dipilih'}
                </Typography>
              </HStack>
              <HStack spacing="md">
                <Typography variant="body" style={{ fontWeight: 'bold' }}>
                  Event:
                </Typography>
                <Typography variant="body">
                  {eventDate || 'Belum dipilih'}
                </Typography>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <Button
          onPress={() => {
            setBasicDate('');
            setBirthdayDate('');
            setAppointmentDate('');
            setEventDate('');
          }}
          variant="outline"
        >
          <ButtonText>Reset Semua Tanggal</ButtonText>
        </Button>
      </VStack>
    </VScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default DatePickerScreen;