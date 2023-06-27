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
      <div className="logout"><GoogleSignout /></div>
      <div className="upload"><button onClick={()=> setIsShow(!isShow)}>{ isShow ? "Back" : "Upload Image"}</button></div>
      {isShow ? <div className="center"><UploadFile setIsShow={setIsShow}/></div> :<Routes>
        <Route exact path="/" element={<div className="center"><GoogleSignin/></div>} />
        <Route exact path="/home" element={<div><ListImage/></div>} />
        <Route exact path="/home/:id" element={<div ><ShowThumbs/></div>} />
        <Route exact path="/thumb/:id" element={<div className="center"><DetailThumb/></div>} />
        <Route path="*" element={<h1 className="center">Not Found !! </h1>}/>
      </Routes>}
    </div>
  );
}

export default App;
