import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import products from '../products.json';
import DetailPage from './DetailPage';
import about from './About';
import reviews from './Reviews';
import HorizontalLinearStepper from './Stepper';

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function PageContent({ pathname, cartItems, setCartItems }) {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [district, setDistrict] = useState('');
    const [error, setError] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);


    const addFavorite = (product) => {
        setFavoriteItems((prevFavorites) => [...prevFavorites, product]);
    };

    const removeFavorite = (productId) => {
        setFavoriteItems((prevFavorites) => prevFavorites.filter(item => item.id !== productId));
    };
    useEffect(() => {
      const stateData = {
        favoriteItems,
        district,
        error,
        activeStep,
        cartItems,
      };
      window.history.pushState(stateData, '', pathname);
    }, [pathname, favoriteItems, district, error, activeStep, cartItems]);
  
    return (
        <Box
            sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            }}
        >
            <Typography>All Products content for {pathname}</Typography>
            {pathname.startsWith('/wax') ? (
                <Box sx={{paddingLeft : 10}}>
                    {getProducts("wax", addFavorite, removeFavorite, setCartItems)}
                </Box>
            ) : 
            pathname.startsWith('/colours') ? (
              <Box sx={{paddingLeft : 10}}>
                  {getProducts("colours", addFavorite, removeFavorite, setCartItems)}
              </Box>
            ) : 
            pathname.startsWith('/fragrances') ? (
              <Box sx={{paddingLeft : 10}}>
                  {getProducts("fragrances", addFavorite, removeFavorite, setCartItems)}
              </Box>
            ) : 
            pathname.startsWith('/wicks') ? (
              <Box sx={{paddingLeft : 10}}>
                  {getProducts("wicks", addFavorite, removeFavorite, setCartItems)}
              </Box>
            ) : 
            pathname.startsWith('/molds') ? (
              <Box sx={{paddingLeft : 10}}>
                  {getProducts("molds", addFavorite, removeFavorite, setCartItems)}
              </Box>
            ) : 
            pathname.startsWith('/deals') ? (
              <Box sx={{paddingLeft : 10}}>
                  {getProducts("deals", addFavorite, removeFavorite, setCartItems)}
              </Box>
            ) : 
            pathname.startsWith('/favorites') ? (
                <Box sx={{paddingLeft : 10}}>
                    {getFavoriteProducts(favoriteItems, addFavorite, removeFavorite, setCartItems)}
                </Box>
            ) :
            pathname.startsWith('/cart') ? (
              <Box sx={{paddingLeft : 10}}>
                <HorizontalLinearStepper activeStep={activeStep} setActiveStep={setActiveStep} cartItems={cartItems} 
                setCartItems={setCartItems} district={district} setDistrict={setDistrict} error={error} setError={setError}/>
              </Box>
            ) :
            pathname.startsWith('/reviews') ? (
              <Box sx={{paddingLeft : 10}}>
                {reviews()}
              </Box>  
            ) :
            pathname.startsWith('/track') ? (
              <Box sx={{paddingLeft : 10}}>
                {reviews()}
              </Box>  
            ) :
            pathname.startsWith('/about') ? (
              <Box sx={{paddingLeft : 10}}>
                {about()}
              </Box>
            ) :
            (<Box sx={{paddingLeft : 10}}>
                {getProducts(null, addFavorite, removeFavorite, setCartItems)}
            </Box>)}
        </Box>
    );
  }

  function getFavoriteProducts(favoriteItems, addFavorite, removeFavorite, setCartItems) {
    return (
      <Grid container spacing={2} minHeight={160} columns={{ xs: 4, sm: 8, md: 12 }}>
        {favoriteItems.map((product) => (
          <Grid item xs={4} sm={4} md={4} key={product.id}>
            <GetProductCard product={product} addFavorite={addFavorite} removeFavorite={removeFavorite}  setCartItems={setCartItems}/>
          </Grid>
        ))}
      </Grid>
    );
  }

  function getProducts(keyword, addFavorite, removeFavorite, setCartItems) {
    return (
        <Grid container spacing={2} minHeight={160} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.data.map((product) => (
                <Grid item xs={4} sm={4} md={4} key={product.id}>
                    <GetProductCard product={product} keyword={keyword} addFavorite={addFavorite} removeFavorite={removeFavorite} setCartItems={setCartItems} />
                </Grid>
            ))}
        </Grid>
    )
  }

  function GetProductCard({product, keyword, addFavorite, removeFavorite, setCartItems}) {
    const [open, setOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    // const [selectedImage, setSelectedImage] = useState(product.subimages[0]);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    if (keyword && !product.keywords.includes(keyword)) {
        return null;
    }

    return (
        
      <Card variant="outlined" sx={{ minWidth: 300 }}>
        <CardHeader
          title={product.title}
          // subheader={product.description}
        />
        <CardMedia
          component="img"
          height="194"
          image={product.image}
          alt="Paella dish"
        />
        <CardContent sx={{ width: 300 }}>
            <Typography sx={{ color: 'text.secondary', wordWrap: 'break-word'}}>
                {product.subheading}  
            </Typography>
            <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold'}}>
                {product.price}
            </Typography>
        </CardContent>
        <Divider inset="context" />
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={toggleFavorite} sx={{paddingLeft:2}}>
                {isFavorite ? <FavoriteIcon color="warning"/> : <FavoriteBorderIcon />}
            </IconButton>
            Favorites 
            <Divider orientation="vertical" flexItem sx={{padding:2}}/>
            <IconButton aria-label="add to cart" onClick={handleClickOpen} sx={{paddingLeft:2}}>
                <RemoveRedEyeIcon />
            </IconButton>
            View
        </CardActions>
        <DetailPage product={product} open={open} setOpen={setOpen} setCartItems={setCartItems}/>
      </Card>
    );
  }

export default PageContent;