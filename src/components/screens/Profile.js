import React,{useEffect,useState} from 'react'

const Profile  = ()=>{
   let user=JSON.parse(localStorage.getItem("user"))
    const [mypics,setPics] = useState([])
    //const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])

    
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{display:"flex",margin:"80px"}}></div>
            <div style={{display:"flex",
                  justifyContent:"space-around",
                  margin:"18px 0px",
                  borderBottom:"1px solid black"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://media.istockphoto.com/photos/young-man-using-smart-phone-at-home-picture-id1278009593?b=1&k=20&m=1278009593&s=170667a&w=0&h=uCTPNkqE--LHcrjm14dtmg_NeOjLqi3_9hQfeM9xrVg="/>
                </div>
                <div>
                    <h4>{user.name}</h4>
                    <h6>{user.email}</h6>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        
                        </div>
                    

                </div>
            </div>
            <div className="gallery">{
            mypics.map(item=>{
                       return(
                        <img   key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
                }
                    
                    

            </div>

        </div>


    )
}

export default Profile