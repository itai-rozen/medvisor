   const googleSuccess = res => {
        console.log(res)
    }
    const googleFailure = () => {
        console.log('Sign in was unsuccessful. Try again later')
    }

             <GoogleLogin      
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => {
               return <button onClick={renderProps.onClick} disabled={renderProps.disabled} ><GoogleIcon />Login with google</button>
            }}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
        /> 