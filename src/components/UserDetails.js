import React from 'react';
import { useRef, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import { subtotal, calculateShipping, ccyFormat } from './Cart';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import emailjs from '@emailjs/browser';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';

export default function UserDetails({ setActiveStep, cartItems, district }) {
    const formRef = useRef(null);
    const sub = (subtotal(cartItems));
    const weight = cartItems.map(({ option, count }) => option.weight * count).reduce((sum, i) => sum + i, 0);
    const shipping = (calculateShipping(district, weight));
    const total = ccyFormat(sub + shipping);
    const [error, setError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    // const [order, setOrder] = useState();
    const totalCount = cartItems.map(({ count }) => count).reduce((sum, i) => sum + i, 0);
    const handleCompleteOrder = (e) => {

        const formData = new FormData(formRef.current);
        if (!formData.get('name') || !formData.get('address') || !formData.get('contact-number-1') || !formData.get('payment-mode')) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000); // Hide alert after 3 seconds
            return;
        }
        const order = cartItems.map(({ product, option, count }) => ({
            product: product.title,
            option: option.title,
            count: count,
            price: option.price
        }));

        const orderDetails = cartItems.reduce((details, { product, option, count }) => {
            return details + `${product.title} ${option.title} x ${count} (Rs. ${option.price} x ${count}) = Rs. ${ccyFormat(option.price * count)}\n`;
        }, "");

        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
            formData.set('order', orderDetails);
            formData.set('subtotal', sub);
            formData.set('shipping', shipping);
            formData.set('total', total);
            console.log(formData.forEach((value, key) => console.log(key, value)));
            sendEmail(e, formData);
        }, 1000); // Hide alert after 3 seconds
    };

    const sendEmail = (e, formData) => {
        e.preventDefault();
    
        emailjs.send(
          'service_candle_heaven',  // Replace with your EmailJS Service ID
          'template_web_order', // Replace with your EmailJS Template ID
          {
            order: formData.get('order'),
            subtotal: formData.get('subtotal'),
            shipping: formData.get('shipping'),
            total: formData.get('total'),
            name: formData.get('name'),
            address: formData.get('address'),
            contactNumber1: formData.get('contact-number-1'),
            contactNumber2: formData.get('contact-number-2'),
            paymentMode: formData.get('payment-mode')
          },
          'u-vEeu4mGBgXOwIjR'   // Replace with your EmailJS Public Key
        ).then(
          (result) => {
            setShowSuccess(true);
            setShowError(false);
          },
          (error) => {
            setShowSuccess(false);
            setShowError(true);
          }
        );
      };

    return (
        <div>
                <Grid container sx={{ mt: 5, ml: 10}}>
                    <Grid size={2} />
                    <Grid size={10}>
                        <Accordion defaultExpanded={true} sx={{ width: '60%', mb: 2, background: 'aliceblue' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span" sx={{ fontWeight: 'bold' }}>Items ({totalCount})</Typography>
                            </AccordionSummary>
                            {cartItems.map(({ product, option, count }) => (
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid size={4} align='left'>
                                            <div>{product.title} {option.title}</div>
                                        </Grid>
                                        <Grid size={4}>
                                            <div>x {count}</div>
                                        </Grid>
                                        <Grid size={4}>
                                            <div>Rs. {ccyFormat(option.price * count)}</div>
                                        </Grid>
                                    </Grid>
                                    </AccordionDetails>
                            ))}
                        </Accordion>
                        <Accordion sx={{ width: '60%', mb: 2, background: 'aliceblue' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <Typography component="span" sx={{ fontWeight: 'bold' }}><Stack direction="row" spacing={51}><div>Total</div><div>Rs. {total}</div></Stack></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component="span"><Stack direction="row" spacing={30}><div>Cart value</div><div>Rs. {ccyFormat(sub)}</div></Stack></Typography>
                                <Typography component="span"><Stack direction="row" spacing={31}><div>Shipping</div><div>Rs. {ccyFormat(shipping)}</div></Stack></Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            <Typography align='center' sx={{ fontWeight: 'bold', fontSize: "1.8vw", pt: 4, pb: 2 }}>Delivery details</Typography>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1 }, display: 'inline-block', padding: 2, width: '80%' }}
                noValidate
                autoComplete="off"
                border={1}
                ref={formRef}
                pl="10"
            >
                <Stack direction="column" spacing={2}>
                    <TextField
                        required
                        id="name"
                        label="Full Name"
                        variant="outlined"
                        name="name"
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonSharpIcon />
                                </InputAdornment>
                              ),
                            },
                        }}
                    />
                    <TextField
                        required
                        id="address"
                        label="Address"
                        variant="outlined"
                        name="address"
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HomeSharpIcon />
                                </InputAdornment>
                              ),
                            },
                        }}
                    />
                     <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        name="email"
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailSharpIcon />
                                </InputAdornment>
                              ),
                            },
                        }}
                    />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            required
                            id="contact-number-1"
                            label="Contact Number 1"
                            variant="outlined"
                            sx={{ width: '200%' }}
                            name="contact-number-1"
                            slotProps={{
                                input: {
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <WhatsAppIcon />
                                    </InputAdornment>
                                  ),
                                },
                            }}
                        />
                        <TextField
                            id="contact-number-2"
                            label="Contact Number 2"
                            variant="outlined"
                            sx={{ width: '200%' }}
                            name="contact-number-2"
                            slotProps={{
                                input: {
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocalPhoneSharpIcon />
                                    </InputAdornment>
                                  ),
                                },
                            }}
                        />
                    </Stack>
                    <FormControl required sx={{ pl: 1, width: '99%' }}>
                        <InputLabel id="payment-mode-label" sx={{ ml: 1 }}>Payment Mode</InputLabel>
                        <Select
                            labelId="payment-mode-label"
                            id="payment-mode"
                            name="payment-mode"
                            label="Payment Mode"
                            defaultValue="cod"
                        >
                            <MenuItem value="cod">Cash on Delivery</MenuItem>
                            <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>
            {/* <TextField type="hidden" id="order" name="order" value={JSON.stringify(order)} />
            <TextField type="hidden" id="subtotal" name="subtotal" value={sub} />
            <TextField type="hidden"id="shipping" name="shipping" value={shipping} />
            <TextField type="hidden" id="total" name="total" value={total} /> */}
            <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2, marginRight: 60, ml: 70 }}>
                <Button variant="outlined" onClick={() => setActiveStep(0)} startIcon={<ArrowBackIosSharpIcon />}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleCompleteOrder} startIcon={<AssignmentTurnedInSharpIcon />}>
                    Complete Order
                </Button>
            </Box>
            {error && <Alert severity="error" sx={{ position: 'fixed', bottom: 16, right: 16 }}>Please enter all details</Alert>}
            {showSuccess && <Alert severity="success" sx={{ position: 'fixed', bottom: 16, right: 16 }} >Order placed successfully. You'll receive confirmation message shortly.</Alert>}
            {showError && <Alert severity="error" sx={{ position: 'fixed', bottom: 16, right: 16 }} >Order placement unseccessful. Please retry.</Alert>}
                
            <div>
                <Backdrop
                    sx={(theme) => ({
                        color: '#fff',
                        zIndex: theme.zIndex.drawer + 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    })}
                    open={showLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    );
}