import React, { useState } from 'react'
import './auth.css'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Auth = ({ isSignup, setIsSignUp }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowRePassword, setIsShowRePassword] = useState(false)


  const handleForm = async e => {
    e.preventDefault()
    const isValidPassword = checkValidPassword()
    console.log(name, password, rePassword, email)
    await axios.post('/auth', {
      name, password, rePassword, email, isSignup
    })
  }

  const checkValidPassword = () => {

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
      <div className="password-wrapper">
        <div className="password-validations"></div>
        <div className="passwords-container">

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">סיסמה</InputLabel>
          <Input
            id="standard-adornment-password" type={isShowPassword ? 'text' : 'password'}
            value={password} onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={() => setIsShowPassword(!isShowPassword)}
                  onMouseDown={e => e.preventDefault()}
                >
                  {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {
          isSignup && <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-repassword">הקש סיסמה שנית</InputLabel>
            <Input id="standard-adornment-repassword" type={isShowRePassword ? 'text' : 'password'}
              value={rePassword} onChange={e => setRePassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsShowRePassword(!isShowRePassword)}
                    onMouseDown={e => e.preventDefault()}
                  >
                    {isShowRePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        }
        </div>
      </div>
      <input type="submit" value={isSignup ? 'הירשם' : 'התחבר'} />
    </form>
  </div>
}

export default Auth