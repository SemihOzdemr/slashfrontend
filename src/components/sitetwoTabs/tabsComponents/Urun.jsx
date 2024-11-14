import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Slider from '@mui/joy/Slider';
import Switch from '@mui/joy/Switch';
import { extendTheme, CssVarsProvider} from '@mui/joy/styles';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Collapse from '@mui/material/Collapse';
import ReportIcon from '@mui/icons-material/Report';
import axios from 'axios';

const darkTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // Dark tema için belirlediğiniz arkaplan renkleri
        background: {
          body: '#1f2126', 
          surface: '#282c34',
        },
        // Dark tema metin renkleri
        text: {
          primary: '#ecf0f1', 
          secondary: '#b0bec5',
          tertiary: '#8eacbb', // Eğer ek metin rengi ihtiyacınız varsa
        },
        // Diğer renkler
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
          secondary: '#ffffff', // Soluk mavi-gri metin
          tertiary: "#B0C4DE"
        }
      },
     
    },
    dark: {
      palette: {
        // Dark tema için belirlediğiniz arkaplan renkleri
        background: {
          body: '#1f2126', 
          surface: '#282c34',
        },
        // Dark tema metin renkleri
        text: {
          primary: '#ecf0f1', 
          secondary: '#b0bec5',
          tertiary: '#8eacbb', // Eğer ek metin rengi ihtiyacınız varsa
        },
        // Diğer renkler
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
          secondary: '#ffffff', // Soluk mavi-gri metin
          tertiary: "#B0C4DE"
        }
      },
      
    },
  },
});


function Urun(props) {
  const savedData = localStorage.getItem('token');
  const {data, data2} = props;
  const [savedProduct, setSavedProduct] = React.useState(props.savedProduct ? props.savedProduct : undefined);
  const [minPrice, setMinPrice] = React.useState(data?.totalAmount?.toFixed() || 0);
  const [checkedBot, setCheckedBot] = React.useState(false);
  const [checkedTers, setCheckedTers] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [open, setOpen] = React.useState({state: false, severity: 'Error', color: 'danger', message: '' , icon: <ReportIcon />});

 
 
  React.useEffect(() => {
    if (savedProduct) { 
      setMinPrice(savedProduct.minPrice)
      setCheckedBot(savedProduct.checkedBot)
      setCheckedTers(savedProduct.checkedTers)
    }
}, [savedProduct]);



  React.useEffect(() => {
    if (savedProduct) {
    
      if (Number(savedProduct.minPrice) !== Number(minPrice) || savedProduct.checkedBot !== checkedBot || savedProduct.checkedTers !== checkedTers) {
        setButtonDisabled(false);
     
      } else {
      
        setButtonDisabled(true);
      }
      
    }
  }, [savedProduct, minPrice, checkedBot, checkedTers, buttonDisabled]);


  const handleClick = async () => {
    try {
    let darta = JSON.stringify({minPrice, checkedBot, checkedTers, productId: data.listing.id, productCode: data.listing.productCode, ilanID: data.id, size: data.size})
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BACKEND_URI}/pnsgSlWIRv`,
      headers: { 
        'Authorization': `${savedData ? savedData : ""}`, 
        'Content-Type': 'application/json'
      },
      maxRedirects: 0,
      data : darta
    };

    const response = await axios.request(config);

    if (response.data.status) {
      setOpen({state: true, severity: 'Success', color: 'success' , message: "Değişiklikler Kaydedildi !", icon: <CheckCircleIcon />})
      setSavedProduct(response?.data?.data)
      setMinPrice(minPrice)
      setCheckedBot(checkedBot)
      setCheckedTers(checkedTers)
        setButtonDisabled(true);
      
      setTimeout(() => {
        setOpen({state: false, severity: 'Success', color: 'success' , message: "", icon: <CheckCircleIcon />})
      
      }, 3000);


    } else {
      setOpen({state: true, severity: 'error', color: 'danger' , message: "Kaydedilirken Hata Oluştu !", icon: <ReportIcon />})
  
    setTimeout(() => {
      setOpen({state: false, severity: 'error', color: 'danger' , message: "", icon: <ReportIcon />})
    
    }, 3000);
    }



  } catch (error) {
    
    setOpen({state: true, severity: 'error', color: 'danger' , message: "Kaydedilirken Hata Oluştu !", icon: <ReportIcon />})
  
    setTimeout(() => {
      setOpen({state: false, severity: 'error', color: 'danger' , message: "", icon: <ReportIcon />})
    
    }, 5000);
  }
  
  };

  function hesapla(fiyat,hizmetBedeli,komisyonOrani) {
   
const netFiyat = fiyat - hizmetBedeli;


const komisyon = netFiyat * komisyonOrani / 100;


const saticiPayi = netFiyat - komisyon;

return saticiPayi.toFixed(2);
  }

  function valueText(value) {
    setMinPrice(value)
  }
  
  return (
    <CssVarsProvider theme={darkTheme}>

    <Box
          sx={{
            color: '#1f2126',
            background: "#1f2126",
            paddingTop: '15px',
            width: '100%',
            position: 'relative',
            overflow: { xs: 'auto', sm: 'initial' },
          }}
        >
        
          <Card
            orientation="horizontal"
            variant='outlined'
            
            color="primary"
            sx={{
              width: '100%',
              flexWrap: 'wrap',
              overflow: 'auto',
            
            }}
          >
           <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
                 <img 
                   src={data?.listing?.code?.image?.media?.pathSmall}
                   loading="lazy"
                   alt=""
                   style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center center' }}
                  />
           </AspectRatio>
            <CardContent>
              <Typography fontSize="xl" fontWeight="lg">
                {data?.title}
              </Typography>
              <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                Beden: <span style={{ color: '#ffffff' }}>{data?.size?.title}</span> <br /> Satış Sırası: <span style={{ color: '#ffffff' }}>{data?.sellerDynamics?.sellRankNumber+1}.<br /></span>
              </Typography>
              <Sheet
                sx={{
                  bgcolor: 'background.level',
                  borderRadius: 'sm',
                  p: 1.5,
                  my: 1.5,
                  display: 'flex',
                  gap: 2,
                  '& > div': { flex: 1 },
                }}
              >
                <div>
                  <Typography level="body-xs" fontWeight="lg">
                    Satış Fiyatı
                  </Typography>
                  <Typography fontWeight="lg">{data?.totalAmount} ₺</Typography>
                </div>
                <div>
                  <Typography level="body-xs" fontWeight="lg">
                    Satıcı Payı
                  </Typography>
                  <Typography fontWeight="lg">{data?.userAmount?.toFixed(2)} ₺</Typography>
                </div>
                <div>
                  <Typography level="body-xs" fontWeight="lg">
                   {data?.serviceFee} ₺ Hiz. Bed. + %{data?.commissionRate} Kom.
                  </Typography>
                  <Typography fontWeight="lg">{(data?.serviceFee + data?.commissionAmount).toFixed(2)}</Typography>
                </div>
                
              </Sheet>

              { data2 ? (
                <Sheet
                sx={{
                  bgcolor: 'background.level',
                  borderRadius: 'sm',
                  p: 1.5,
                  my: 1.5,
                  display: 'flex',
                  gap: 2,
                  '& > div': { flex: 1 },
                }}
              >
                 <div>
                  <Typography level="body-xs" fontWeight="lg">
                    1. Sıradaki Ürünün Fiyatı
                  </Typography>
                  <Typography fontWeight="lg">{data2?.sonuc?.totalAmount} ₺</Typography>
                </div>

              </Sheet>
              ) : ( "") }
              
              <Sheet
                sx={{
                  bgcolor: 'background.level',
                  borderRadius: 'sm',
                  p: 1.5,
                  my: 1.5,
                  display: 'flex',
                  gap: 2,
                  '& > div': { flex: 1 },
                }}
              >
                <Typography fontSize="xm" fontWeight="lg">
                Bot Ayarları:
              </Typography>
                </Sheet>
              <Sheet
              
                sx={{
                  bgcolor: 'background.level',
                  borderRadius: 'sm',
                  p: 1.5,
                  my: 1.5,
                  display: 'flex',
                  gap: 2,
                  '& > div': { flex: 1 },
                }}
              >

                  <div>
                  <Typography level="body-xs" fontWeight="lg">
                   Min. Düşülebilecek Fiyat
                  </Typography>
                  <Typography fontWeight="lg">
                  <Typography level="xm" fontWeight="lg">
                   {hesapla(Number(minPrice),data.serviceFee,Number(data.commissionRate))} Min. Fiyatta Satıcı payı
                   
                  </Typography>
                  <Slider
                     aria-label="Always visible"
                     defaultValue={savedProduct ? Number(savedProduct.minPrice) : Number(data?.totalAmount?.toFixed() || 0)}
                     onChange={(event, newValue) => valueText(newValue)}
                     step={10}
                     max={Number(data?.totalAmount?.toFixed() || 0)}
                     valueLabelDisplay="on"
                    />
                    
                  </Typography>
                </div>


               
              </Sheet>
              <Sheet
                sx={{
                  bgcolor: 'background.level',
                  borderRadius: 'sm',
                  p: 1.5,
                  my: 1.5,
                  display: 'flex',
                  gap: 2,
                  '& > div': { flex: 1 },
                }}
              >
                 <Switch
                     checked={checkedBot}
                     backgroundcolor={"red"}
                     onChange={(event) => setCheckedBot(event.target.checked)}
                     color={checkedBot ? 'success' : 'danger'}
                     variant={checkedBot ? 'solid' : 'outlined'}
                     endDecorator={checkedBot ? 'Bot Aktif' : 'Bot Pasif'}
                     slotProps={{
                       endDecorator: {
                         sx: {
                           minWidth: 24,
                           color: '#ffffff',
                         },
                       },
                     }}
                   />

                  <Switch
                     checked={checkedTers}
                     backgroundcolor={"red"}
                     onChange={(event) => setCheckedTers(event.target.checked)}
                     color={checkedTers ? 'success' : 'danger'}
                     variant={checkedTers ? 'solid' : 'outlined'}
                     endDecorator={checkedTers ? 'Tersine Bot Aktif' : 'Tersine Bot Pasif'}
                     slotProps={{
                       endDecorator: {
                         sx: {
                           minWidth: 24,
                           color: '#ffffff',
                         },
                       },
                     }}
                   />
                    
              </Sheet>
              <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                
                <Button onClick={handleClick} disabled={buttonDisabled} variant="solid" color="primary">
                  Kaydet
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Collapse in={open.state}>
        <Alert
          key={open.severity}
          sx={{ alignItems: 'flex-start' }}
          startDecorator={open.icon}
          variant="soft"
          color={open.color}
          endDecorator={
            <IconButton onClick={() => {
              setOpen(false);
            }} variant="soft" color={open.color}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{open.severity}</div>
            <Typography level="body-sm" color={open.color}>
              {open.message}
            </Typography>
          </div>
        </Alert>
        </Collapse>
      
        </CssVarsProvider>
  )
}



export default Urun
