const mongoose = require("mongoose");
const initData = require("./data.js");
// const Listing = require("/models/listing.js");
const Listing = require("../models/listing.js");

const mongo_URL ='mongodb://127.0.0.1:27017/wonderlast';

main().then(()=>{
    console.log("Connected to Database")
})
.catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(mongo_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data =initData.data.map((obj)=>({...obj,owner:"65789d272a4fae219dbbeeef"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();