import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'

export default function ListImage() {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    async function callApi(){
      const resp = await fetch('http://127.0.0.1:8000/list_original_imgs')
      const resp_data = await resp.json()
      setData(resp_data)
    }
    callApi()
  },[])

  const deleteData=(id)=>{
    let confimation = window.confirm("Are you sure as it will delete from everywhere?")
   
    if (confimation){
      console.log(id);

      //call api here
    }
  }

  const viewData=(data)=>{
    console.log(data.id);
    navigate(`/home/${data.id}`)
    
  }

  return (
    <div >
      {data.length ? <table border={1} className='tcenter'>
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
      </table> : <h1 className="center">Not Found !! </h1>}
    </div>
  )
}
