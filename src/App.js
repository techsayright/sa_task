import { useEffect } from 'react';
import './App.css';
import GoogleSignin from './components/GoogleSignin';
import GoogleSignout from './components/Googlesignout';
import { gapi } from 'gapi-script';

function App() {
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId : '357815409161-njja0l7m2r889umkchdsuub8t2g3hvn0.apps.googleusercontent.com',
        scope : ''
      })
    }

    gapi.load('client:auth2', start)
  })

  // var access_token = gapi.auth.getToken().access_token
  // console.log(access_token);

  return (
    <div className="App">
      <GoogleSignin/> <br/>
      <GoogleSignout/>
    </div>
  );
}

export default App;
