const { response } = require("express")
const express=require("express")
const app=express()
const { NoteModel } = require("../models/note.model")
const noteRouter=express.Router()
app.use(express.json())


noteRouter.get("/",async(req,res)=>{
    try{
        const notes= await NoteModel.find()
        res.send(notes)
    }catch(e){
        console.log('err',e);
    }
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
        const new_note=new NoteModel(payload)
        await new_note.save()
    }catch(e){
        console.log('Err',e);
        res.send({"msg":"Something wrong"})
    }
    res.send("Create the note")
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const note=await NoteModel.findOne({_id:id})
    console.log(note)
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID
    try{
        if( userID_making_req!==userID_in_note){
            res.send({"msg":"Not Authorise"})
        } else {
            await NoteModel.findByIdAndUpdate({_id:id},payload)
            res.send("Updated the note")
        }
    }catch(e){
        console.log(e)
        res.send({msg:"Error"})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const note=await NoteModel.findOne({"_id":id})
    // console.log(note)
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID
    try{
        if( userID_making_req!==userID_in_note){
            res.send({"msg":"Not Authorise"})
        } else {
            await NoteModel.findByIdAndDelete({_id:id})
            res.send("Updated the note")
        }
    }catch(e){
        console.log(e)
        res.send({msg:"Error"})
    }
})

module.exports={noteRouter}