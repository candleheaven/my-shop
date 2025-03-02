import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Chip from '@mui/material/Chip';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitbitIcon from '@mui/icons-material/Fitbit';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MenuIcon from '@mui/icons-material/Menu';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import QueryStatsSharpIcon from '@mui/icons-material/QueryStatsSharp';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function NAVIGATION(count, price) {
    return (
      [
        {
          kind: 'header',
          title: 'Main items',
        },
        {
          segment: 'allProducts',
          title: 'All Products',
          icon: <DashboardIcon />,
        },
        {
          kind: 'divider',
        },
        {
          kind: 'header',
          title: 'Categories',
        },
        {
          segment: 'wax',
          title: 'Wax',
          icon: <MenuIcon />,
        },
        {
          segment: 'colours',
          title: 'Colours',
          icon: <ColorLensIcon />,
        },
        {
          segment: 'fragrances',
          title: 'Fragrances',
          icon: <SanitizerIcon />,
        },
        {
          segment: 'wicks',
          title: 'Wicks',
          icon: <FitbitIcon />,
        },
        {
          segment: 'molds',
          title: 'Molds & Containers',
          icon: <TakeoutDiningIcon />,
        },
        {
          segment: 'deals',
          title: 'Combo deals',
          icon: <CardGiftcardIcon />,
        },  
        {
            segment: 'favorites',
            title: 'My Favorites',
            icon: <FavoriteSharpIcon />,
          }, 
        {
          kind: 'divider',
        },
        {
          kind: 'header',
          title: 'Cart',
        },
        {
          segment: 'cart',
          title: <div>View Cart </div>,
          icon: <ShoppingCartIcon />,
          action: <div ><Chip label={"Rs. " + ccyFormat(price)} sx={{padding:0.5, marginRight:1}}/><Chip label={count} color="success" size="small" /></div>,
        },
        {
          kind: 'header',
          title: 'Candle Heaven',
        },
        {
          segment: 'reviews',
          title: 'Happy customers',
          icon: <InsertEmoticonIcon />,
        }, 
        {
          segment: 'track',
          title: 'Track your order',
          icon: <QueryStatsSharpIcon />,
        },  
        {
          segment: 'about',
          title: 'About us',
          icon: <HomeWorkIcon />,
        }, 
      ]
    );
  }

  export default NAVIGATION;