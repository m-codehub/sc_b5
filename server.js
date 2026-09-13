const express=require("express")
const mongoose=require("mongoose")
const app=express()
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/csec_students")
.then(()=>{
    console.log("mongodb is connected")
})
.catch((e)=>{
    console.log(`error is ${e}`)
})
const studentSchema=mongoose.Schema({
    name:"String",
    age:"Number",
    gender:"String",
    course:"String",
    year:"String",
    marks:"Number",
    city:"String",
    email:"String"
})
const student=mongoose.model("students",studentSchema)

app.post("/create_student",async(req,res)=>{
    const s= await student.insertOne(req.body)
    await res.send(s)
})
app.post("/create_students",async(req,res)=>{
    const s=await student.insertMany(req.body)
    await res.send(s)
})

app.get("/students",async(req,res)=>{
    const s=await student.find()
    await res.send(s)
    await console.log(s)
})

app.get("/student",async(req,res)=>{
    const s=await student.find(req.body)
    await res.send(s)
})

app.get("/student/:id",async(req,res)=>{
    const s=await student.find({_id:req.params.id})
    await res.send(s)
})

app.put("/updateo",async(req,res)=>{
    const s=await student.updateOne({name:req.body.name},
                                    {$set:{city:req.body.c}}) 
                                    
    await res.send(s)
})

app.put("/updatem",async(req,res)=>{
    const s=await student.updateMany({city:req.body.co},req.body
                                   
    )
    await res.send(s)
})
app.put("/update/:id",async(req,res)=>{
    const s=await student.updateOne({_id:req.params.id},
                                    {$set:{course:req.body.c}}
    )
    await res.send(s)
})

app.delete("/delete",async(req,res)=>{
    const s=await student.deleteOne({name:req.body.name}) 
    await res.send(s)
})

app.delete("/delete/:id",async(req,res)=>{
    const s=await student.deleteOne({_id:req.params.id})
          await res.send(s)                          
})

const port=1234
app.listen(port,()=>{
console.log(`server is running at http://localhost:${port}`)
})
