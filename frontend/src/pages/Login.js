import * as React from 'react';
import { 
  Box, Button, Checkbox, FormControlLabel, TextField, 
  Typography, Container, Paper, Avatar, Link, Grid 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true); // Toggle state
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const orangeGlowStyles = {
    '& label.Mui-focused': { color: '#ff6600' },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': { borderColor: '#ff6600' },
      '&.Mui-focused fieldset': {
        borderColor: '#ff6600',
        boxShadow: '0 0 12px rgba(255, 102, 0, 0.5)', 
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    setEmailError(!email);
    setPasswordError(!password);

    if (email && password) {
      // Determine which API to call based on the mode
      const endpoint = isLogin ? "/api/login" : "/api/register";
      
      try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
          if (isLogin) {
            localStorage.setItem("hallal_user", JSON.stringify(result.user));
            alert(`Welcome back! Role: ${result.user.role}`);
            window.location.href = result.user.role === 'admin' ? "/admin" : "/menu";
          } else {
            alert("Account created! You can now Sign In.");
            setIsLogin(true); // Switch back to login mode
          }
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert("Server connection failed!");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', pt: 12, pb: 5 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', 
          borderRadius: 4, width: '100%', backgroundColor: '#fff',
          border: '3px solid #ff6600', 
          boxShadow: '0 0 25px rgba(255, 102, 0, 0.6)', 
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#ff6600' }}><LockOutlinedIcon /></Avatar>
        
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal" required fullWidth name="email" label="Email Address"
            autoFocus error={emailError} sx={orangeGlowStyles} 
          />
          <TextField
            margin="normal" required fullWidth name="password" label="Password"
            type="password" error={passwordError} sx={orangeGlowStyles} 
          />
          
          {isLogin && (
            <FormControlLabel
              control={<Checkbox value="remember" sx={{ color: '#ff6600', '&.Mui-checked': { color: '#ff6600' } }} />}
              label="Remember me"
            />
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#ff6600', fontWeight: 'bold' }}>
            {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link 
                component="button"
                type="button"
                variant="body2" 
                onClick={() => setIsLogin(!isLogin)} // SWITCHES THE MODE
                sx={{ color: '#ff6600', fontWeight: 'bold', textDecoration: 'none' }}
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}