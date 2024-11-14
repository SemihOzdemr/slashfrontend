import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
const pages = [{name: 'sitetwo', dom: "sitetwo"}, {name: 'siteone', dom: "siteone"}, {name: 'sitethree', dom: "sitethree"}];
const logoImageUrl = '/logo.png';
const StyledTypography = styled(Typography)({
  cursor: 'pointer', // Metin üzerine gelindiğinde imleç, tıklanabilir olduğunu gösterir.
  marginRight: '16px', // Sağ marjini biraz artırıyoruz (ihtiyacınıza göre ayarlayın).
  padding: '6px 12px', // Metin etrafında biraz dolgu ekleyin.
  borderRadius: '4px', // Köşeleri yuvarlaklaştırın.
  transition: 'background-color 0.3s ease-in-out', // Arka plan renginin değişimini yumuşatın.
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // İmleç metin üzerindeyken arka plan rengini değiştirin.
  },
  '&:active': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Tıklama (aktif) durumunda arka plan daha da koyulaşır.
  },
});

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

export default function ButtonAppBar(props) {
  const { isAuthenticated } = props;
  const location = useLocation();
 
  
    function clickPage(page) {
      // Her bir sayfa için uygun URL'yi buraya yazın.
      const pageUrl = `/${page.dom}`;
      window.location.href = pageUrl
    }
  

  

  return (
    <ThemeProvider theme={customDarkTheme}>
     
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: { xs: 'block', sm: 'flex' } }}>
        <StyledTypography 
          variant="h6" 
          component="div" 
          onClick={() => isAuthenticated ? clickPage({dom: ""}) : ""} 
          sx={{ 
            backgroundColor: location.pathname === `/` ? 'rgba(255, 255, 255, 0.2)' : '', 
            display: 'flex',
    alignItems: 'center', // Logo ve metni dikey olarak hizalar
            // İsteğe bağlı: Eğer bu stil 'sx' prop içinde değil, doğrudan StyledTypography içinde tanımlanırsa, buradan kaldırılabilir.
          }}
        >
           <img
                src={logoImageUrl}
                alt="KickSlash Logo"
                style={{ marginRight: '10px', height: '42px', width: '42px', marginTop: "10px" }} // Boyutu ve diğer stilleri gereğine göre ayarlayın
              />
          KickSlash 
        </StyledTypography>
        
          {/* Menü öğelerini içeren bir kutu ekleyin ve bu kutuya yatay düzen verin */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {isAuthenticated && pages.map((page) => (
        <MenuItem
          key={page.dom}
          onClick={() => clickPage(page)}
          sx={{ backgroundColor: location.pathname === `/${page.dom}` ? 'rgba(255, 255, 255, 0.2)' : '' }  }
        >
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      ))}
          </Box>
          
        </Toolbar>
      </AppBar>
    </Box>
  </ThemeProvider>
  );
}
