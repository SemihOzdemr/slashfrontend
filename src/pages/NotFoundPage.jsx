// NotFoundPage.js
import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const customDarkTheme = createTheme({
  palette: {
    mode: 'dark', // Koyu tema olduğu için karanlık modda olacak
    background: {
      default: '#1f2126', // Koyu gri bir arka plan rengi
      paper: '#282c34', // Biraz daha koyu gri tonu kağıt elementleri için
    },
    primary: {
      main: '#2196f3', // Ana mavi tonu
      dark: '#1565c0', // Daha koyu bir mavi tonu, etkileşimli durumlar için
      light: '#64b5f6', // Daha açık bir mavi, belirli UI elementleri için kontrast ve vurgu sağlar
      contrastText: '#ffffff', // Beyaz metin, genel kullanım için yeterli kontrast sağlar
    },
    secondary: {
      main: '#ff5722', // Ana turuncu tonu
      dark: '#e64a19', // Daha koyu bir turuncu tonu, etkileşimli durumlar için
      light: '#ffab91', // Daha açık bir turuncu, ek vurgu ve farkındalık için
      contrastText: '#ffffff', // Beyaz metin, ikincil renk üzerinde yüksek kontrast sağlar
    },
    // Standart hata, uyarı, bilgi ve başarı renklerini burada özelleştirebilirsiniz
    error: {
      main: '#e53935', // Canlı kırmızı
    },
    warning: {
      main: '#ffab00', // Canlı turuncu
    },
    info: {
      main: '#29b6f6', // Canlı mavi
    },
    success: {
      main: '#00c853', // Parlak yeşil
    },
    text: {
      primary: '#ffffff', // Beyaz metin
      secondary: '#b0bec5', // Soluk mavi-gri metin
    },
  },
  // Tipografi, bileşenler ve geçişler gibi diğer tema özelleştirmeleri burada yapılabilir
});
  
function NotFoundPage() {
    return (
      <ThemeProvider theme={customDarkTheme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh', // Sayfa boyunu tam ekran yapar
            backgroundColor: '#1f2126', // Arka plan rengini temanızla uyumlu olarak ayarlayın
            color: '#fff', // Metin rengi
          }}
        >
          <Typography variant="h1" component="div">
            404
          </Typography>
          <Typography variant="h4" component="div">
            Aradığınız sayfa bulunamadı.
          </Typography>
          <Typography variant="subtitle1" component="div">
            Yanlış bir bağlantıyı takip etmiş olabilirsiniz veya sayfa silinmiş olabilir.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              href="/" // Ana sayfaya yönlendirir
            >
              Anasayfaya Dön
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
  
  export default NotFoundPage;