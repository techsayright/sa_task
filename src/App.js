import { useEffect, useState } from "react";
import "./App.css";
import GoogleSignin from "./components/GoogleSignin";
import GoogleSignout from "./components/Googlesignout";
import { gapi } from "gapi-script";
import { Route, Routes } from "react-router-dom";
import ListImage from "./components/ListImage";
import ShowThumbs from "./components/ShowThumbs";
import UploadFile from "./components/UploadFile";
import DetailThumb from "./components/DetailThumb";



function App() {
  const [isShow, setIsShow] = useState(false);  
  const [access_token, setAccessToken] = useState(null);  

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "357815409161-njja0l7m2r889umkchdsuub8t2g3hvn0.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });




  return (
    <div>
      {!access_token || <><div className="logout"><GoogleSignout setAccessToken={setAccessToken}/></div>
      <div className="upload"><button onClick={()=> setIsShow(!isShow)}>{ isShow ? "Back" : "Upload Image"}</button></div></>}
      {isShow ? <div className="center"><UploadFile setIsShow={setIsShow} setAccessToken={setAccessToken}/></div> :<Routes>
        <Route exact path="/" element={<div className="center"><GoogleSignin setAccessToken={setAccessToken}/></div>} />
        <Route exact path="/home" element={<div><ListImage access_token={access_token}/></div>} />
        <Route exact path="/home/:id" element={<div ><ShowThumbs access_token={access_token}/></div>} />
        <Route exact path="/thumb/:id" element={<div className="center"><DetailThumb access_token={access_token}/></div>} />
        <Route path="*" element={<h1 className="center">Not Found !! </h1>}/>
      </Routes>}
    </div>
  );
}

export default App;
