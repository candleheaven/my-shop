import React from "react";
import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react";
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';

function DetailPage({ product, open, setOpen, setCartItems }) {
  const [selectedOption, setSelectedOption] = useState(product.options ? product.options.length - 1 : null);
  const [selectedImage, setSelectedImage] = useState(product.subimages[0]);
  const [count, setCount] = React.useState(1);
  const [price, setPrice] = React.useState(product.options[selectedOption].price);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    const cartItem = {product: product, option: product.options[selectedOption], count: count};
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    setOpen(false);
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 3000); // Hide alert after 3 seconds
  };

  const handlePrice = () => {
    if (selectedOption !== null) {
      const optionPrice = product.options[selectedOption].price !== null ? product.options[selectedOption].price : 0;

      setPrice(optionPrice * count);
    }
  };

  useEffect(() => {
    handlePrice();
  }, [count, selectedOption]);


  return (
    <React.Fragment >
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2}} id="customized-dialog-title">
          {product.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{ margin: "0 1rem 1rem" }}>
              {carouselSlide(selectedImage, product, setSelectedImage)}
            </div>
          </Box>
        </DialogContent>
        <DialogContent sx={{textAlign: 'center'}}>
            {product.subheading}
            <Divider sx={{margin:1}}/>
            {product.description && (
            <>
              <Box
                sx={{
                  maxHeight: '100px', // Set maximum height for the description box
                  overflowY: 'auto', // Enable vertical scrolling
                  margin: 1,
                }}
              >
                <Typography variant="body2">
                  {product.description}
                </Typography>
              </Box>
              <Divider sx={{ margin: 1 }} />
            </>
          )}
            <Divider sx={{margin:1}}/>
            {product.options && product.options.length > 0 && (
              <Stack spacing={2} direction="row" sx={{ marginTop: 2, justifyContent: 'center' }}>
                {product.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedOption === index ? "contained" : "outlined"}
                    sx={{ marginTop: 2 }}
                    onClick={() => handleOptionClick(index)}
                  >
                    {option.title}
                  </Button>
                ))}
                <Divider orientation="vertical" flexItem sx={{padding:2}}/>
                {GetQuantityCounter(count, setCount)}
              </Stack>
            )}
            {product.options && product.options.length === 0 && (
              <Stack spacing={2} direction="row" sx={{ marginTop: 2, justifyContent: 'center' }}>
                {GetQuantityCounter(count, setCount)}
              </Stack>
            )}

        </DialogContent>
        <DialogActions>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Rs. {price}
          </Typography>
          <Button autoFocus onClick={handleAddToCart} disabled={count < 1} variant="contained" color="primary">
            <AddShoppingCartSharpIcon/>Add to cart
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {alertOpen && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          Item added to cart!
        </Alert>
      )}
    </React.Fragment>

  );
}


function carouselSlide(selectedImage, product, setSelectedImage) {
  return (
    <div style={{ height: '100%', maxWidth: '500px'}}>
      <div style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(219, 213, 213, 0.5)' }}>
        <Magnifier image={selectedImage} />
      </div>
      <Grid container spacing={0.5} height={70} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: 1, paddingBottom: 1, minWidth: 400 }}>
        {product.subimages.map((subimage, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <CardMedia
              component="img"
              height="60"
              image={subimage}
              alt="Product image"
              onClick={() => setSelectedImage(subimage)}
              sx={{ width: '100%', objectFit: 'contain', cursor: 'pointer' }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function GetQuantityCounter(count, setCount) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        // mt: 4,
      }}
    >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
      
          }}
        >
          <IconButton
            size="sm"
            variant="outlined"
            onClick={() => setCount((c) => c === 0 ? 0 : c - 1)}
            sx={{ border: '1px solid', borderColor: 'grey.500', borderRadius: '8px' }}
          >
            <Remove />
          </IconButton>
          <Typography textColor="text.secondary" sx={{ fontWeight: 'md' }}>
            {count}
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            onClick={() => setCount((c) => c + 1)}
            sx={{ border: '1px solid', borderColor: 'grey.500', borderRadius: '8px' }}
          >
            <Add />
          </IconButton>
        </Box>
        <Badge badgeContent={count} color="primary">
          <Typography level="h1" component="h2">
            🛍
          </Typography>
        </Badge>
      </Box>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function Magnifier({ image }) {
  const [magnifierStyle, setMagnifierStyle] = useState({ display: 'none' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const bgPosX = (x / width) * 100;
    const bgPosY = (y / height) * 100;

    setMagnifierStyle({
      display: 'block',
      left: `${x - 75}px`,
      top: `${y - 75}px`,
      backgroundPosition: `${bgPosX}% ${bgPosY}%`,
    });
  };

  const handleMouseLeave = () => {
    setMagnifierStyle({ display: 'none' });
  };

  return (
    <div
      style={{
        //   position: 'relative',
        width: '100%',
        height: '100%',
        maxHeight: 450,
        overflow: 'scroll',
        objectFit: 'contain'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="img"
        image={image}
        alt="Selected product"
        sx={{ width: '100%', objectFit: 'contain', cursor: "zoom-in" }}
      />
      <div
        style={{
          ...magnifierStyle,
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '900%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
export default DetailPage;