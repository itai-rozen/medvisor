import React, { useState } from 'react'
import './auth.css'
import { GoogleLogin } from 'react-google-login'
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '../../components/Button/Button';


const Auth = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(true)

    const handleClickShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    };

    const googleSuccess = res    => {
        console.log(res)
    }
    const googleFailure = () => {
        console.log('Sign in was unsuccessful. Try again later')
    }

    const handleForm = e => {
        e.preventDefault()
        console.log(name, password, email)
    }

    return <div className="auth-form-container">
        <form className='auth-form' onSubmit={handleForm} >
            
            <TextField
                variant="standard"
                autoFocus
                value={name}
                name="name"
                onChange={e => setName(e.target.value)}
                label="שם מלא"
                required />
            <TextField
                variant="standard"
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                label="email"
                type="email"
                required />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={isShowPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={e => e.preventDefault()}
                >
                  {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </form>
        <GoogleLogin
        
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => {
               return <button onClick={renderProps.onClick} disabled={renderProps.disabled} ><GoogleIcon />Login with google</button>
            }}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
        />
    </div>
}

export default Auth