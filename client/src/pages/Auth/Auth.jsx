import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth.css'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import GoogleIcon from '@mui/icons-material/Google';
import { TextField, Input, FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Auth = ({ isSignup, setIsSignUp, setLoggedUser }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowRePassword, setIsShowRePassword] = useState(false)

  const navigate = useNavigate()

  const handleForm = async e => {
    e.preventDefault()
    const isValidPassword = checkValidPassword()
    console.log(name, password, rePassword, email)
    try {
      const { data } = await axios.post('/api/auth', {
        name, password, rePassword, email, isSignup
      })
      console.log('current user: ', data)
      if (data.error) throw data.error
      if (data.result.email) {
        setLoggedUser(data.result)
        localStorage.setItem('notAccessToken', JSON.stringify(data.token))
        navigate('/drugs')
      }
    } catch (err) {
      console.log(err)
      setError(err)
    }

  }

  const checkValidPassword = () => {

  }

  return <div className="auth-form-container">
    <form className='auth-form' onChange={() => setError('')} onSubmit={handleForm} >
      {

        isSignup && <TextField
          variant="standard"
          autoFocus={isSignup}
          value={name}
          name="name"
          onChange={e => setName(e.target.value)}
          label="שם מלא"
          required />

      }
      <TextField
        variant="standard"
        value={email}
        autoFocus={!isSignup}
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
    <div className="message">{error}</div>
  </div>
}

export default Auth