import React,{useState,useEffect,useContext} from 'react'




const Home = ()=>{ 
    let user=JSON.parse(localStorage.getItem("user"))
    const [data,setData] = useState([])
   
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
     },[])
    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>
        {

           const newData=data.map(item=>
            {
                if(item._id==result._id){
                    return result
                }else
                {
                    return item
                }
            })
            setData(newData)
        })
    }
    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>
        {
            const newData=data.map(item=>
            {
                if(item._id==result._id){
                    return result
                }else
                {
                    return item
                }
            })
            setData(newData)
        })
    }
    const makecomment=(text,postId)=>
    {
        fetch('/comment',
        {
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify(
            {
                postId,
                text
            })
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            const newData=data.map(item=>
            {
                if(item._id==result._id){
                    return result
                }else
                {
                    return item
                }

            })
        setData(newData) })
        
    }
    return(
<div>
<div style={{display:"flex",margin:"40px"}}></div>
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img src={item.photo}/>
        
                        </div>
                        <div className="card-content">
                        {item.likes.includes(user._id)?
                            <div>
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                           <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                       </div>
                           : 
                           <div>
                           <i className="material-icons" style={{color:"red"}}>favorite_border</i>
                           <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                           </div>
                        }
                        
                        
                       
                        
                            <h6>{item.likes.length} Likes</h6>
                            <h6>{item.title}</h6>
                            <p> {item.body} </p>
                          {
                            item.comments.map(record=>{
                                return(

                                  <h6 key={record._id}><b>{record.postedBy.name}</b> {record.text}</h6>
                                    )
                            })
                          }
                            <form onSubmit={(e)=>
                                {
                                    e.preventDefault()
                                     makecomment(e.target[0].value,item._id)
                                 
                                }}>
                            <input type="text" placeholder="add a comment"/>
                            </form>
                        </div>
                    </div>
                    )
                })
            }
            
           
</div>

        </div>

    )
}

export default Home