import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
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


const PlatformAuthForm = ({ title, formId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);
  const savedData = localStorage.getItem('token');


  useEffect(() => {
    // Fonksiyonunuzu useEffect dışında tanımlayabilirsiniz.
    async function sitetwoAuthCheck() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/NTXmDwUxQx`, {
          headers: { 'Authorization': `${savedData ? savedData : ""}` }
        });
  
        if (response.data) {
          setEmail(response.data.data.me.email);
          setPassword("buVeriGizlidir");
          setAlertMessage("Kayıtlı Hesap Bilgilerini Değiştirebilmeniz İçin Yöneticiden İzin Almanız Gerek!");
          setAlertSeverity("error");
          setAlertOpen(true);
        }
      } catch (error) {
        // Hata yönetimi yapılabilir
      }
    }

    async function siteoneAuthCheck() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/njiAhSvPyT`, {
          headers: { 'Authorization': `${savedData ? savedData : ""}` }
        });
  
        if (response.data) {
          setEmail(response.data.data.Email);
          setPassword("buVeriGizlidir");
          setAlertMessage("Kayıtlı Hesap Bilgilerini Değiştirebilmeniz İçin Yöneticiden İzin Almanız Gerek!");
          setAlertSeverity("error");
          setAlertOpen(true);
        }
      } catch (error) {
        // Hata yönetimi yapılabilir
      }
    }
  
    // Burada savedData ve formId'yi bağımlılık dizisine ekliyoruz.
    if (formId === "1") {
      sitetwoAuthCheck();
    }
    if (formId === "2") {
      siteoneAuthCheck();
    }
  }, [savedData, formId]); // Bağımlılık dizisini güncelledik.

async function sitetwoLogin() {
  if(formId === "1") {
try {
  let data = JSON.stringify({
    "Email": `${email}`,
    "Password": `${password}`
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BACKEND_URI}/HyASVabahS`,
    headers: { 
      'Authorization': `${savedData}`, 
      'Content-Type': 'application/json'
    },
    maxRedirects: 0,
    data : data
  };
  const response = await axios.request(config);

  setAlertMessage(`${response.data.message}`);
  setAlertSeverity("success");
  setAlertOpen(true);
  


} catch (error) {
  if (error.response) {
    setAlertMessage(`${error.response.data.errorMessage}`);
    setAlertSeverity("error");
    setAlertOpen(true);
  } else {
    setAlertMessage(`bir hata oluştu tekrar dene sorun devam ederse yönetici ile görüş !`);
    setAlertSeverity("error");
    setAlertOpen(true);
  }
  
}
  

}
}


async function siteoneLogin() {
  if(formId === "2") {
try {
  let data = JSON.stringify({
    "Email": `${email}`,
    "Password": `${password}`
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BACKEND_URI}/arh1XfB3Dx`,
    headers: { 
      'Authorization': `${savedData}`, 
      'Content-Type': 'application/json'
    },
    maxRedirects: 0,
    data : data
  };
  const response = await axios.request(config);

  setAlertMessage(`${response.data.message}`);
  setAlertSeverity("success");
  setAlertOpen(true);
  


} catch (error) {
  if (error.response) {
    setAlertMessage(`${error.response.data.errorMessage}`);
    setAlertSeverity("error");
    setAlertOpen(true);
  } else {
    setAlertMessage(`bir hata oluştu tekrar dene sorun devam ederse yönetici ile görüş !`);
    setAlertSeverity("error");
    setAlertOpen(true);
  }
  
}
  

}
}



  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Form doğrulama yapabilirsiniz
    if (email === "" || password === "") {
      setAlertMessage("E-posta veya şifre boş bırakılamaz!");
      setAlertSeverity("error");
      setAlertOpen(true);
    } else {
      if (formId === "1") {
        sitetwoLogin()
      }
      if (formId === "2") {
        siteoneLogin()
      }
    }
  };

  return (
    <ThemeProvider theme={customDarkTheme}>
    <Box bgcolor="#282c34" p={3} my={2} borderRadius={2}>
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="E-posta Adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Şifre"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ // Bu kısım şifreyi göster/gizle ikonunu ekler
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Kaydet
        </Button>
        <Collapse in={alertOpen} style={{ marginTop: '16px' }}>
          <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
            {alertMessage}
          </Alert>
        </Collapse>
      </form>
    </Box>
    </ThemeProvider>
  );
};

export default PlatformAuthForm;