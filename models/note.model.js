const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    userID:String
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={NoteModel}

// 63c13b92c7b162b9ca134c67