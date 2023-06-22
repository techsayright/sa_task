import React from 'react'
import {GoogleLogout} from 'react-google-login';

export default function GoogleSignout() {
    const successResponseGoogle = () =>{
        console.log("logout success");
    }

  return (  
    <div>
        <GoogleLogout
            clientId="357815409161-njja0l7m2r889umkchdsuub8t2g3hvn0.apps.googleusercontent.com"
            buttonText="logout"
            onLogoutSuccess={successResponseGoogle}
        />
    </div>
  )
}
