import { View } from 'react-native'
import React from 'react'
import { Body, Heading, Small, Subtitle, TextError, TextPrimary, TextSuccess, TextWarning, Title, Typography, useTheme } from 'rnc-theme'

export default function TypographyScreen() {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Typography variant="heading">Judul Utama</Typography>
      <Typography variant="body" color={theme.colors.textSecondary}>
        Teks body dengan warna sekunder
      </Typography>

      <Heading>Judul dengan Heading</Heading>
      <Title>Judul dengan Title</Title>
      <Subtitle>Subtitle</Subtitle>
      <Body>Teks body normal</Body>
      <Small>Teks kecil</Small>

      <TextPrimary variant="title">Teks dengan warna primary</TextPrimary>
      <TextError>Pesan error</TextError>
      <TextSuccess>Pesan sukses</TextSuccess>
      <TextWarning>Pesan warning</TextWarning>

      <Typography
        variant="body"
        numberOfLines={2}
        ellipsizeMode="tail"
        onPress={() => console.log('Teks diklik')}
      >
        Teks panjang yang akan dipotong jika melebihi 2 baris...
      </Typography>
    </View>
  );
}