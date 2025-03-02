import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import NAVIGATION from './components/Navigation';
import theme from './components/Theme';
import PageContent from './components/PageContent';
import SidebarFooter from './components/SidebarFooter';
import './index.css';
import { subtotal } from './components/Cart';
import { useNavigate } from 'react-router-dom';

function App(props) {
  const { window, route } = props;
  const router = useDemoRouter(route);
  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;
  const [cartItems, setCartItems] = React.useState([]);
  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION(cartItems.length, subtotal(cartItems))}
      router={router}
      theme={theme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >
        <PageContent pathname={router.pathname} cartItems={cartItems} setCartItems={setCartItems} />
      </DashboardLayout>
      
    </AppProvider>
    
    // preview-end
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

function CustomAppTitle() {
  const navigate = useNavigate();
  const handleTitleClick = () => {
    navigate('/all-products'); // Change this to your home page route
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2} onClick={handleTitleClick} sx={{ cursor: 'pointer' }}>
       <img src="images/logo.jpeg" alt="Candle Heaven" width='90px' height='70px'/> 
      <Typography variant="h4" sx={{fontWeight:"bold"}}>Candle Heaven</Typography>
      <WhatsAppIcon color="success"/><h5 sx={{fontWeight:'bold'}}>070 53 20 205</h5>
    </Stack>
  );
}

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: 'inline', md: 'none' },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        onInput={handleSearch}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}
export default App;

function handleSearch(event) {
  console.log(event.target.value);
  // setInput(event.target.value);
}

