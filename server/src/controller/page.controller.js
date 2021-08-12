const { sequelize, Page } = require('../../models')
const Joi = require('joi');



const getPageList = async (req,res,next) => {
    try{
        let data = await Page.findAll();
        res.send({ status:true ,  data })
    }
    catch(e){
        console.log(e)
        res.send({ status:false , message: 'something went wrong' })
    }
}

const addEditPage = async (req,res,next) => {
    try{
        let { pageName, pageLink, hide, menuText, menuTootltip, menuOrder, pageTitle, pageText, actionType, id } = req.body;

        let schema;
        let error = null;

        if( actionType === 'edit' ){
            schema = Joi.object({
                pageName: Joi.string().required(),
                pageLink: Joi.string().required(),
                hide: Joi.boolean().required(),
                menuText: Joi.string().required(),
                menuTootltip: Joi.string().required(),
                menuOrder: Joi.string().required(),
                pageTitle: Joi.string().required(),
                pageText: Joi.string().required(),
                id: Joi.number().required(),
            })
            const val = schema.validate({ pageName, pageLink, hide, menuText, menuTootltip, menuOrder, pageTitle, pageText, id });
            error = val.error
        }
        else{
            schema = Joi.object({
                pageName: Joi.string().required(),
                pageLink: Joi.string().required(),
                hide: Joi.boolean().required(),
                menuText: Joi.string().required(),
                menuTootltip: Joi.string().required(),
                menuOrder: Joi.string().required(),
                pageTitle: Joi.string().required(),
                pageText: Joi.string().required(),
            })
            const val = schema.validate({ pageName, pageLink, hide, menuText, menuTootltip, menuOrder, pageTitle, pageText });
            error = val.error
        }

        if( error ){
            let message = [];
            error.details.forEach(ele=>{
                message.push( ele.message )
            })
            message =  message.join(', ')
            return res.send({ message , status:false })
        }

        if( actionType === 'edit' ){
            const page = await Page.findOne({ where: { id } })
            if( page ){
                page.pageName = pageName;
                page.pageLink = pageLink;
                page.hide = hide;
                page.menuText = menuText;
                page.menuTootltip = menuTootltip;
                page.menuOrder = menuOrder;
                page.pageTitle = pageTitle;
                page.pageText = pageText;
                await page.save()
                res.send({ status:true , message:'Page updated sucessfully'})
            }
            else{
                res.send({ status:false , message:"Page doesn't exists."})
            }
        }
        else{
            let data = await Page.create({ pageName, pageLink, hide, menuText, menuTootltip, menuOrder, pageTitle, pageText })
            res.send({ data, status:true , message:'Page inserted sucessfully'})
        }
    }
    catch(e){
        console.log(e)
        res.send({status: false , message: 'something went wrong' })
    }
}

const deletePage = async (req,res,next) => {
    try{
        let { id } = req.body

        if( id ){
            const data = await Page.findOne({ where: { id } })
            if( data ){
                await data.destroy()
                res.send({ status:true , message:'Page deleted sucessfully'})
            }
            else{
                res.send({ status:false , message:"Page doesn't exists."})
            }
        }
        else{
            res.send({ status:false , message:"Page id is required.."})
        }
    }
    catch(e){
        console.log(e)
        res.send({ message: 'something went wrong' })
    }
}

module.exports = {
    getPageList,
    addEditPage,
    deletePage,
}