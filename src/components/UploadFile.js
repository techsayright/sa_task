import React, { useState } from "react";

export default function UploadFile({setIsShow}) {
  const [detail, setDetail] = useState("")

  const submitFile = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target[0].files[0]);

    let formData = new FormData();
    formData.append("file", e.target[0].files[0]);

    let resp = await fetch("http://localhost:8000/upload_image", {
      method: "POST",
      body: formData,
    })
    let data = await resp.json()
    console.log(data);
    setDetail(data.detail)
  };
  return (
    <div>
      <form onSubmit={submitFile}>
        <input type="file" required></input> <br /> <br />
        <button type="submit">Store</button>
        { detail === "success" ? setIsShow(false) : <p style={{"color":"red"}}>{detail}</p>}
      </form>
    </div>
  );
}
