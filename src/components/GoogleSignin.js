import React from 'react'
import {GoogleLogin} from 'react-google-login';
import { useNavigate } from 'react-router-dom';

export default function GoogleSignin({setAccessToken}) {
    const navigate = useNavigate()
    const successResponseGoogle = (r) =>{
        console.log(r.accessToken);
        setAccessToken(r.accessToken)
        navigate('/home')
    }

    const failureResponseGoogle = (r) =>{
        console.log(r);
    }

  return (
    <div>
        <GoogleLogin
            clientId="357815409161-njja0l7m2r889umkchdsuub8t2g3hvn0.apps.googleusercontent.com"
            buttonText="Sign In via Google"
            onSuccess={successResponseGoogle}
            onFailure={failureResponseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>
  )
}
