import * as React from 'react';

import Urun from './tabsComponents/Urun';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  
  
  CircularProgress,
  Paper, 
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

}));



const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));


const sitetwoSatistakiUrunlerTab = () => {
  const savedData = localStorage.getItem('token');
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    async function getInfo() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/QMgJeSOeVg`, {
          headers: { 'Authorization': `${savedData ? savedData : ""}` }
        });

        if (response.data) {
          let dosta = response.data.data
          let aka = response.data.data.products.map(x => x.userAmount)

          dosta.toplam = await aka.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
          setData(response?.data?.status ? response.data : null);
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

     {loading ? (
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <StyledCircularProgress />
       <span>Yüklenme süresi ürün sayısına göre değişiklik gösterebilir lütfen bekleyin...</span> {/* Bu kısma eklediğiniz metin */}
     </div>
           
        ) : (

          
           
          <StyledPaper elevation={4}>
           <Card sx={{ display: 'flex' }}>
      <Box  sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
           Toplam {data?.data?.statics?.countTotal} Üründe {data?.data?.toplam.toFixed(2)}₺ Kazanç.
          </Typography>
          
        </CardContent>
        
      </Box>
      
    </Card>


            {data?.data?.products.map((product) => (
              
              <Urun key={product.id} data={product} data2={data?.extraData?.find(x => x.anaproduct == product.id)} savedProduct={data?.savedProducts?.find(x => x.ilanID == product.id)} />
            ))}


</StyledPaper>
        )}


</ThemeProvider>
  );
};

export default sitetwoSatistakiUrunlerTab;