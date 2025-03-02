import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Cart from './Cart';
import UserDetails from './UserDetails';

const steps = ['Checkout', 'Create an ad group'];

export default function HorizontalLinearStepper({activeStep, setActiveStep, cartItems, setCartItems, district,
    setDistrict, error, setError}) {

    return (
        <Box sx={{ width: '100%' }}>
            {cartItems.length > 0 && (
                <Stepper activeStep={activeStep} sx={{ pl: 30, pr: 30 }}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps} onClick={() => setActiveStep(index)} sx={{ cursor: 'pointer' }}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            )}
            {activeStep === 0 ? (
                Cart(cartItems, setCartItems, district, setDistrict, setActiveStep, error, setError)
            ) : (
                <UserDetails setActiveStep={setActiveStep} cartItems={cartItems} district={district}/>
            )}
        </Box>
    );
}