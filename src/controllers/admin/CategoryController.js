const { Category } = require("../../models");
const asyncHandler=require('../../utils/AsyncHandler')
// const {}=require


const createCategory=asyncHandler(async(req,res,next)=>{
    const category=await Category.findOne({})
})