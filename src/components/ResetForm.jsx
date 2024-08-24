import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React from 'react';
import { ScreenMode } from '../pages/Signup';

const ResetForm = ({ onSwitchMode }) => {
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        color: colors.grey[800],
        width: "100%",
        maxWidth: "700px", // Match the width from SigninForm
        paddingTop: '2rem', // Aligns with the SigninForm
      }}
    >
      {/* Logo Section */}
      <Stack 
        direction="row" 
        alignItems="center" 
        sx={{ marginBottom: '1rem', width: '100%' }}
        justifyContent="flex-start" // Ensure the logo is left-aligned
      >
        <img 
          src='./BranDo.png'
          alt="logo"
          className="w-20 h-20 object-contain"  
        />
        <img 
          src='./BranDoTitle.png'  
          alt="logo title"
          className="w-32 h-20 object-contain ml-2" // Adjust width and add margin to position next to the logo
        />
      </Stack>

      <Stack spacing={3} sx={{ width: "100%" }}>
        <Stack>
          <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
            Reset Your Password
          </Typography>
          <Typography color={colors.grey[600]}>
            In case you have forgotten your password or want to update it.
          </Typography>
        </Stack>

        <Stack spacing={3}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Email</Typography>
              <TextField 
                placeholder="Enter your email" // Add placeholder
                fullWidth 
              />
            </Stack>
          </Stack>
          <Button
            variant='contained'
            size='large'
            fullWidth
            sx={{
              bgcolor: colors.grey[800],
              "&:hover": {
                bgcolor: colors.grey[600]
              }
            }}
          >
            Send Reset Link
          </Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography>Log in to your account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            Go to Sign In
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ResetForm;
