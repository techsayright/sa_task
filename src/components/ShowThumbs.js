import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

export default function ShowThumbs({access_token}) {
  const params = useParams()
  const [s3path, setS3path] = useState("")
  const [thumbpath, setThumbpath] = useState([])
  const navigate = useNavigate()

  // console.log(params);

  //authentication
  if(!access_token){
    navigate("/")
  }

  useEffect(()=>{
    async function callApi4original(params){
      const resp = await fetch(`http://localhost:8000/list_original_imgs/${params}`,{headers:{"Authorization": `Bearer ${access_token}`}})
      const resp_data = await resp.json()
      setS3path(resp_data.s3_path)
      // console.log(resp_data);
    }

    async function callApi4thumbs(params){
      const resp = await fetch(`http://localhost:8000/get_thumbnails/${params}`,{headers:{"Authorization": `Bearer ${access_token}`}})
      const resp_data = await resp.json()
      setThumbpath(resp_data)
      // console.log(resp_data);
    }

    callApi4original(+params.id)
    callApi4thumbs(+params.id)
  }, [params.id])

  const getThumbDetail = (id)=>{
    // console.log(id);
    navigate(`/thumb/${id}`)
  }

  return (
    <div className='text_center'>
      <h1>Original Image:</h1>
      <img src={s3path} alt='original_image'/>
      <br/>
      <br/>
      <h1>Its Thumbnails:</h1>
      {
        thumbpath.map((v, i)=>
          <><img src={v.s3_path} alt='thumb' onClick={()=>getThumbDetail(v.id)}/><br/></>
        )
      }

    </div>
  )
}
