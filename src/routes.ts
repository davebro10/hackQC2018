import { IRouteHandler } from "./interfaces/core/routeHandler";
import { HTTPMETHOD } from "./enums/core/httpMethod";
import { residualMatterController } from "./controllers/residualMatterController";


export const routesHandler: IRouteHandler[] = 

    [
        {
            method: HTTPMETHOD.GET,
            path: '/',
            controller: residualMatterController.getResidualMatter
        },
        {
            method: HTTPMETHOD.POST,
            path: '/ResidualMatter/:word',
            controller: residualMatterController.postResidualMatterWord
        },
        {
            method: HTTPMETHOD.POST,
            path: '/ResidualMatter',
            controller: residualMatterController.postResidualMatterPicture
        }
    ]
