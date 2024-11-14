import React from 'react';
import { Tabs, Tab, useMediaQuery, useTheme, Box } from '@mui/material';
import StoreSatistakiUrunlerTab from './siteoneTabs/siteoneSatistakiUrunlerTab';
import StoreInfoTab from './siteoneTabs/StoreInfoTab';



// TabPanel bileşeni burada oluşturuluyor.
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
}

const ResponsiveTabssiteone = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        centered={!isMobile}
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons={isMobile ? 'on' : 'auto'}
        allowScrollButtonsMobile
      >
        <Tab label="siteone Bilgi" />
        <Tab label="Satıştaki Ürinler" />
        {/* Daha fazla tab eklenebilir */}
      </Tabs>
      <TabPanel value={value} index={0}>
      <StoreInfoTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <StoreSatistakiUrunlerTab />
      </TabPanel>
    </>
  );
};

export default ResponsiveTabssiteone;
