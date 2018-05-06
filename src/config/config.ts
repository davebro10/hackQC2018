
process.env["NODE_CONFIG_DIR"] = __dirname;
import * as conf from 'config';


export const config = {
    port: conf.get('App.port') as number,
    baseUrl: conf.get('App.baseUrl') as string,
    mongoDB: {
        user: conf.get('Mongo.user') as string,
        password: conf.get('Mongo.password') as string
    }
}