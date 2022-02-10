import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth.css'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import GoogleIcon from '@mui/icons-material/Google';
import { TextField, Input, FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Spinner from './../../components/Spinner/Spinner'

const Auth = ({ isSignup, setIsSignUp, setLoggedUser }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowRePassword, setIsShowRePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [is8Chars, setIs8Chars] = useState(false)
  const [is1Letter, setIs1Letter] = useState(false)


  const navigate = useNavigate()

  const signUser = async e => {
    setIsLoading(true)
    e.preventDefault()
    // TODO add password validation
    const isValidPassword = checkValidPassword()
    console.log(name, password, rePassword, email)
    try {
      const { data } = await axios.post('/api/auth', {
        name, password, rePassword, email, isSignup
      })
      console.log('current user: ', data)
      if (data.error) throw data.error
      if (data.result.email) {
        setIsLoading(false)
        setLoggedUser(data.result)
        localStorage.setItem('notAccessToken', JSON.stringify(data.token))
        navigate('/drugs')
      }
    } catch (err) {
      console.log(err)
      setError(err)
      setIsLoading(false)
    }

  }
  const updatePassword = value => {
    setPassword(value)
    setIs8Chars((value.length > 7))
    setIs1Letter(/[a-z]/i.test(value))
  }
  const checkValidPassword = () => {

  }

  return <div className="auth-form-container">
    <form className='auth-form' onChange={() => setError('')} onSubmit={signUser} >
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
        <div className="passwords-container">
          {
            isSignup && <div className="password-validations" >
              <p className={`eight-char validation ${is8Chars && "valid"}`}>הסיסמה צריכה להכיל לפחות 8 תווים</p>
              <p className={`one-letter validation ${is1Letter && "valid"}`}>הסיסמה צריכה להכיל לפחות אות אחת</p>
            </div>
          }
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">סיסמה</InputLabel>
            <Input
              id="standard-adornment-password" type={isShowPassword ? 'text' : 'password'}
              value={password} onChange={e => updatePassword(e.target.value)}
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
    {isLoading && <Spinner />}
  </div>
}

export default Auth