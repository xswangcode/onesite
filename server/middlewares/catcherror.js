// middlewares/catcherror.js
const catchError = async (ctx,next)=>{
        try{
            await next()
        } catch(error){
            console.log(error);
            
            ctx.status = 500
            return ctx.body = error.message 
        }
    }
module.exports = catchError

