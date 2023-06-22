import React from 'react'
import {GoogleLogin} from 'react-google-login';

export default function GoogleSignin() {
    const successResponseGoogle = (r) =>{
        console.log(r);
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
