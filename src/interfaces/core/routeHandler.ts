import { RequestHandler } from 'express-serve-static-core';
import { HTTPMETHOD } from '../../enums/core/httpMethod';

export interface IRouteHandler {
    method: HTTPMETHOD,
    path: string,
    controller: RequestHandler
}