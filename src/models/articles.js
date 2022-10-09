const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title must be provided'],
  },
  content: {
    type: String,
    required: [true, 'article content must be provided'],
  },
  author: {
    type: String,
    required: [true, 'author must be provided'],
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]

  
},
{ timestamps: true }

)

// articleSchema.virtual('url').get(function(){
//     return '/article/' + this._id
//  })

module.exports = mongoose.model('Article', articleSchema)