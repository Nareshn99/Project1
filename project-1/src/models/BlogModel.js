const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    title: {
        type:String,
        require:true
    },
    body: {
        type:String,
        require:true
    }, 
    authorId: {
        type: ObjectId,
        ref: "Author",
        require:true, 
    }, 
    tags: {
        type:[String]
    }, 
    category: {
        type:String,
        require:true //examples: [technology, entertainment, life style, food, fashion]
    }, 
    subcategory: {
        type:[String] // examples[technology-[web development, mobile development, AI, ML etc]] 
    }, 
    // createdAt, 
    // updatedAt, 
    // deletedAt: {when the document is deleted}, 
    isDeleted: {
        type:boolean, 
        default: false
    }, 
    publishedAt: String,//{when the blog is published}, 
    isPublished: {
        type:boolean, 
        default: false
    },
    author_id: {
        type: ObjectId,
        ref: "Author"
    }
},{ timestamps: true });


module.exports = mongoose.model('LibraryBook', bookSchema)