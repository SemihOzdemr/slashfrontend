import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

export default function SignIn() {

  const [open, setOpen] = React.useState({state: false, severity: 'success', message: ''});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let datak = JSON.stringify({
      "username": data.get('username'),
      "password": data.get('password'),
    });
   
    try {

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URI}/HBSGmcdlBd`,
        headers: { 
          'Content-Type': 'application/json'
        },
        maxRedirects: 0,
        data : datak
      };
      const response = await axios.request(config);
  
      // İstek başarılı bir şekilde gerçekleştiyse, dönen veriyi (ör. token) kullanarak gerekli işlemleri yapın
      if (response.data) {
        // Token'i saklayın, duruma göre local storage veya Redux store kullanabilirsiniz

        if(response?.data?.token) {
          localStorage.setItem('token', response.data.token);
  
        
          setOpen({state: true, severity: 'success', message: 'Giriş Başarılı Yönlendiriliyorsun...'})
  
          setTimeout(() => {
            window.location.href = '/'
          
          }, 5000);
        } else {
         
        }

       
      }
    } catch (error) {
     
      
     setOpen({state: true, severity: 'error', message: error?.response?.data?.errorMessage})
  
     setTimeout(() => {
       setOpen({state: false, severity: 'error', message: ""})
     
     }, 5000);
     
    }





    
  
    
  };

  return (
    <ThemeProvider theme={customDarkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Giriş yap
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı adı"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Giriş Yap
            </Button>
            
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
      <Collapse in={open.state}>
        <Alert variant="outlined" severity={open.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {open.message}
        </Alert>
      </Collapse>
     
    </Box>
      </Container>
      
    </ThemeProvider>
    
  );
}