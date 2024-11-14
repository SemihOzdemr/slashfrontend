import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  CircularProgress,
  Paper, Avatar, Grid, Container
} from '@mui/material';
import axios from 'axios';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const sitetwoInfoTab = () => {
  const savedData = localStorage.getItem('token');
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);



  React.useEffect(() => {

    async function getInfo() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/njiAhSvPyT`, {
          headers: { 'Authorization': `${savedData ? savedData : ""}` }
        });

        if (response.data) {
          setUserData(response.data.status ? response.data.data : null);
          setLoading(false);
        }
      } catch (error) {
       
        setLoading(false);
      }
    }

    if(savedData) {
      getInfo();
    }
      
    
  }, [savedData]);



  return (
    <ThemeProvider theme={customDarkTheme}>
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={loading ? "50vh" : "30vh"} 
        flexDirection="column"
      >
        {loading ? (
          <StyledCircularProgress />
        ) : (
          <StyledPaper elevation={4}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} display="flex" justifyContent="center">
                <StyledAvatar>{userData?.adi.charAt(0)}</StyledAvatar>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h5" align="center">
                <span style={{ fontWeight: 'bold' }}> {userData?.adi} {userData?.soyadı} </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}  >
                <Typography variant="body1">Email: <span style={{ fontWeight: 'bold' }}>{userData?.Email}</span></Typography>
              </Grid>
              <Grid item xs={12} sm={6}  >
                <Typography variant="body1">Seviye: <span style={{ fontWeight: 'bold' }}>{userData?.seviye}</span></Typography>
                <Typography variant="body1">Toplam Komisyon: <span style={{ fontWeight: 'bold' }}>{userData?.comiss}</span></Typography>
              </Grid>
              
            </Grid>
          </StyledPaper>
        )}
      </Box>
    </Container>
  </ThemeProvider>
  );
};

export default sitetwoInfoTab;