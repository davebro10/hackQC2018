import * as _express from 'express';
import * as _ from 'lodash';
import { routesHandler } from '../../routes';
import { HTTPMETHOD } from '../../enums/core/httpMethod';
import { IRouteHandler } from '../../interfaces/core/routeHandler';

class RoutesCore {

    /**
     * Map every route to the application
     * @param app - The express application
     */
    public initRoutes(app: _express.Express): void {
        routesHandler.forEach( (route: IRouteHandler) => {

            if (_.isNil(route.controller) || 
                _.values(HTTPMETHOD).indexOf(route.method) === -1 ||
                _.isNil(route.path)) {
                throw new Error(`The paths is invalid - method: ${route.method}, path: ${route.path}, controller: ${route.controller}`);  
            }

            app[route.method](route.path, route.controller);
        });
    }
}

export const routesCore: RoutesCore = new RoutesCore();