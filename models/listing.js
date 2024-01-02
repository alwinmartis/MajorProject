const mongoose = require("mongoose");
const Review = require("./review.js");
const schema = mongoose.Schema;

const listingSchema = schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
       url:String,
       filename:String
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    // category:{
    //     type:String,
    //     enum:["mountain","arctic","farms","deserts"]
    // }
});
// middleware which deletes review id's which is relarted to listing
listingSchema.post("findOneAndDelete", async()=>{
    if (Listing){
     await Review.deleteMany({_id:{$in:listingSchema.reviews}})
    }
})

const Listing = mongoose.model('Listing',listingSchema);
module.exports = Listing;