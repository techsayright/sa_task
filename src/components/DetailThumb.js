import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function DetailThumb({access_token}) {
  const params = useParams()
  const [thumb, setThumb] = useState("")
  const navigate = useNavigate()

  //authentication
  if(!access_token){
    navigate("/")
  }

  useEffect(()=>{
    async function getThumb(params){
      const resp = await fetch(`http://localhost:8000/thumb_details/${params}`, {headers:{"Authorization": `Bearer ${access_token}`}})
      const resp_data = await resp.json()
      setThumb(resp_data)
      // console.log(resp_data);
    }

    getThumb(+params.id)
  }, [params.id])

  return (
    <div>
    <h1>Thumb details:</h1>
     <table border={1} className='tcenter'>
        <tr>
          <th>id</th>
          <th>filename</th>
          <th>S3 Path</th>
          <th>thumb_size</th>
        </tr>
          <tr key={thumb.id}>
            <td>{thumb.id}</td>
            <td>{thumb.filename}</td>
            <td>{thumb.s3_path}</td>
            <td>{thumb.thumb_size}</td>
        </tr>
      </table> 
    </div>
  )
}
