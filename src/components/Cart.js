import React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import { FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import RemoveShoppingCartSharpIcon from '@mui/icons-material/RemoveShoppingCartSharp';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


const districts = ['Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'NuwaraEliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'];
export function ccyFormat(price) {
    return `${price.toFixed(2)}`;
}

function multiply(price, quantity) {
    return price * quantity;
}

export function calculateShipping(district, weight) {
    const districtCost = district === "Colombo" ? 300 : district !== "" ? 375 : 0;
    const weightCost = district !== "" ? 100 * Math.ceil(weight - 1) : 0;
    return districtCost + weightCost;
}

export function subtotal(items) {
    return items.map(({ option, count }) => option.price * count).reduce((sum, i) => sum + i, 0);
}

function isValidCode(code) {
    return code === 'DISCOUNT';
}

function handleError(setError) {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000); // Hide alert after 3 seconds
}

function Cart(cartItems, setCartItems, district, setDistrict, setActiveStep, error, setError) {
    const cartSubtotal = subtotal(cartItems);
    const cartWeight = cartItems.map(({ option, count }) => option.weight * count).reduce((sum, i) => sum + i, 0);
    let shipping = calculateShipping(district, cartWeight);
    const itemCount = cartItems.length;

    const handleChange = (event) => {
        setDistrict(event.target.value);
        shipping = calculateShipping(district, cartWeight);
    };

    const handleDelete = (productId) => {
        setCartItems(cartItems.filter(item => item.product.id !== productId));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handleIncrement = (productId) => {
        setCartItems(cartItems.map(item =>
            item.product.id === productId ? { ...item, count: item.count + 1 } : item
        ));
    };

    const handleDecrement = (productId) => {
        setCartItems(cartItems.map(item =>
            item.product.id === productId && item.count > 1 ? { ...item, count: item.count - 1 } : item
        ));
    };

    return (
        <React.Fragment>
            <Typography align='left' sx={{ fontWeight: 'bold', fontSize: "1.8vw", pt: 4 }}>Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</Typography>
            {cartItems.length > 0 ?
                <TableContainer component={Paper} sx={{ paddingRight: 10 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#595959' }}>
                                <TableCell sx={{ color: 'white' }}>Item</TableCell>
                                <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Quantity</TableCell>
                                <TableCell align="right" sx={{ color: 'white' }}>Total</TableCell>
                                <TableCell align="right" sx={{ color: 'white' }}><RemoveShoppingCartSharpIcon onClick={handleClearCart} sx={{ cursor: 'pointer' }} /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                // {item: product, option: selectedOption, count: count};
                                <TableRow key={item.product.id}>
                                    <TableCell>
                                        <Stack direction="row">
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 40, height: 40, borderRadius: 0.9 }}
                                                image={item.product.image}
                                                alt={item.product.title}
                                            /> <div style={{ paddingLeft: 10, alignContent: 'center' }}>
                                                {item.product.title} {item.option.title}
                                            </div>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">Rs. {ccyFormat(item.option.price)}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" alignItems="center" justifyContent="center">
                                            <IconButton onClick={() => handleDecrement(item.product.id)}
                                                disabled={item.count <= 1}
                                                sx={{ border: '1px solid', borderColor: 'grey.500', borderRadius: '8px', padding: '4px' }}>
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography sx={{ padding: 2 }}>{item.count}</Typography>
                                            <IconButton onClick={() => handleIncrement(item.product.id)} sx={{ border: '1px solid', borderColor: 'grey.500', borderRadius: '8px', padding: '4px' }}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">Rs. {ccyFormat(multiply(item.option.price, item.count))}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleDelete(item.product.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell rowSpan={4} />
                                <TableCell rowSpan={4} />
                                <TableCell >Subtotal</TableCell>
                                <TableCell align="right">Rs. {ccyFormat(cartSubtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Shipping</div>
                                        <FormControl sx={{ m: 0, minWidth: 180 }} size="small">
                                            <InputLabel id="demo-simple-select-standard-label">Select District</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={district}
                                                onChange={handleChange}
                                                label="Select District"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {districts.map((district) => (
                                                    <MenuItem key={district} value={district}>
                                                        {district}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {/* <div style={{cursor:"pointer" }}>{district}</div> */}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">Rs. {ccyFormat(shipping)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Box display="flex" justifyContent="space-between">
                                        <div>Discount</div>
                                        <TextField
                                            id="discount"
                                            label="Coupon Code"
                                            size='small'
                                            color="error"
                                            sx={{ m: 0, width: 180 }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="right" >Rs. {ccyFormat(0)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Rs. {ccyFormat(cartSubtotal + shipping)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                : <Typography align='left'><h4>Your cart is empty</h4></Typography>
            }
            {cartItems.length > 0 &&
                <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2, marginRight: 20 }}>
                    <Button variant="contained" startIcon={<LocalMallSharpIcon />} onClick={() => district !== "" ? setActiveStep(1) : handleError(setError)}>
                        Checkout
                    </Button>
                </Box>
            }
            {error && <Alert severity="error" sx={{ position: 'fixed', bottom: 16, right: 16 }}>Please select deleivery district</Alert>}
        </React.Fragment>
    );
}

export default Cart;