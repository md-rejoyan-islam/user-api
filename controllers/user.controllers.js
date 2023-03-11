const {readFileSync,writeFileSync}=require('fs');
const path = require('path');
let users = JSON.parse(
  readFileSync(path.join(__dirname, "../config/db.json"))
);



/**
 * all user
 */

const allUser=(req,res)=>{
    const {limit=users.length,page=1}=req.query;
    const sliceUser = users.slice(
      Number(limit * page-limit),
      Number(limit * page) 
    );
    console.log(sliceUser); 
res.status(200).json(sliceUser)  
} 
 
/**
 * random user find
 */

const randomUser = (req, res) => {
    const randomId=Math.ceil(Math.random()*6)
   const randomUser= users.find(user=>user.id==randomId)
  res.status(200).json(randomUser);
};

/**
 * add new user
 */
const addUser=(req,res)=>{
    const {id,name,gender,contact,address,photoUrl}=req.body
    if(!id || !name || !gender || !contact || !address || !photoUrl){
        res.status(200).send('all field are require!')
        return;
    }else{
        
       
        users.push(req.body)
        writeFileSync(
          path.join(__dirname, "../config/db.json"),
          JSON.stringify(users)
        );
        res.status(200).send(users);
    }
}

/**
 * update a new user
 */
const updateUser=(req,res)=>{
    const {id}=req.params
     const { name, gender, contact, address, photoUrl } = req.body;
    const data= users.find(user=>user.id==Number(id))
    if(data){
users[users.indexOf(data)] = {
  ...data,
  name,
  gender,
  contact,
  address,
  photoUrl,
};

writeFileSync(path.join(__dirname, "../config/db.json"), JSON.stringify(users));
res.status(200).send(users);
    }
    else{
 res.send('user not found');
    }
    
}

/**
 * delete a user
 */
const deleteUser=(req,res)=>{
    const {id}=req.params
    const dataCheck = users.find((user) => user.id == Number(id));
   
   if(dataCheck){
    const newData = users.filter((user) => user.id != Number(id));
    writeFileSync(
      path.join(__dirname, "../config/db.json"),
      JSON.stringify(newData)
    );
    res.status(200).json({
      message: "deleted successfully",
    });
   }else{
    res.send("user not found");
   }
    
}



// controllers export
module.exports={ 
    allUser,
    addUser,
    randomUser,
    updateUser,
    deleteUser
}