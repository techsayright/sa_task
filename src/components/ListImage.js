import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'

export default function ListImage({access_token}) {
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  //authentication
  if(!access_token){
    navigate("/")
  }

  async function callApi(){
    setLoader(true)
    const resp = await fetch('http://127.0.0.1:8000/list_original_imgs', {headers:{"Authorization": `Bearer ${access_token}`}})
    const resp_data = await resp.json()
    setData(resp_data)
    setLoader(false)
  }
  useEffect(()=>{
    callApi()
  },[])

  const deleteData=async (id)=>{
    let confimation = window.confirm("Are you sure as it will delete from everywhere?")
   
    if (confimation){
      console.log(id, typeof(id));

      setLoader(true)
      const resp = await fetch(`http://127.0.0.1:8000/delete_image/${id}`,{headers:{"Authorization": `Bearer ${access_token}`}})
      const resp_data = await resp.json()
      // console.log(resp_data)

      if (resp_data.detail === 'success'){
        callApi() 
        setLoader(false)
      }
    }
  }

  const viewData=(data)=>{
    console.log(data.id);
    navigate(`/home/${data.id}`)
    
  }

  let showing_data = (data.length ? <table border={1} className='tcenter'>
  <tr>
    <th>id</th>
    <th>stored_filename</th>
    <th>S3 Path</th>
    <th>file_Size</th>
    <th>file_format</th>
    <th>action</th>
  </tr>
  {data.map((v, i)=>
    <tr key={v.id}>
      <td onClick={()=>viewData(v)}>{v.id}</td>
      <td onClick={()=>viewData(v)}>{v.stored_filename}</td>
      <td onClick={()=>viewData(v)}>{v.s3_path}</td>
      <td onClick={()=>viewData(v)}>{v.file_size}</td>
      <td onClick={()=>viewData(v)}>{v.file_format}</td>
      <td><button onClick={()=>deleteData(v.id)}>Delete</button></td>
  </tr>)}
</table> : <h1 className="center">No Data to List !! </h1>)

  return (
    <div >
      {loader ? <h1 className="center">Please Wait...</h1> : showing_data}
    </div>
  )
}
