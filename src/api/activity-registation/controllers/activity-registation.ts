/**
 * activity-registation controller
 */

import { factories } from '@strapi/strapi'
import {parseMultipartData} from '@strapi/utils'

export default factories.createCoreController('api::activity-registation.activity-registation' ,({strapi}) =>({async update(ctx) {
    const entityId = ctx.params.id;
    let entity;
    
    const actre = await strapi.entityService.findOne('api::activity-registation.activity-registation',entityId,{
        populate: {Register:true},
    });
    
    if (!actre){
        return ctx.notFound(`Not Found`);
    }
    if(actre.Register?.id!==ctx.state.user.id){
        return ctx.unauthorized(`You can't update this entry`);
    }
    
    if(ctx.is(`multipart`)){
                             
        const {data,files} = parseMultipartData(ctx);
        entity = await strapi.entityService.update('api::activity-registation.activity-registation',entityId,{data},{files});
    } 
    else{
        entity = await strapi.entityService.update('api::activity-registation.activity-registation',entityId,ctx.request.body);
    }
    const sanitizedEntity = await this.sanitizeOutput(entity,ctx);
    return this.transformResponse(sanitizedEntity);
},
}));