const register= (req,res)=>{
    let data = req.body
    console.log(data)
    if(data){
        res.render('regis',{succmsg:"Registerd successfully",errmsg:""})
    }
   else{

       res.render('regis',{errmsg:"ENter all the data",succmsg:""})
   }
    
}
const login=(req,res)=>{
    let email=req.body.email
    let pass=req.body.pass
    
    if(email=='' || pass==''){
        res.render('login',{errmsg:"ENter all the data",succmsg:""})
    }
    else{
        req.session.user
       res.render('login',{succmsg:"login successfully",errmsg:""})

   }
    
}

module.exports={register,login}