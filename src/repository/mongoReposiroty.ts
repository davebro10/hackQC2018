import { config } from "../config/config";
import * as mongo from "mongodb";
const vision = require('@google-cloud/vision');


class MongoRepository{

    private user: string = config.mongoDB.user;
    private password: string = config.mongoDB.password;

    private url: string = `mongodb://${this.user}:${this.password}@ds211440.mlab.com:11440/hackqc`;

    public async test() {
        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Performs label detection on the image file
        client
        .labelDetection('./les-bananes.jpg')
        .then( (results: any) => {
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach( (label: any) => console.log(label.description));
        })
        .catch( (err: Error) => {
        console.error('ERROR:', err);
        });        
    }


    public async post(): Promise<void> {

        const user = {
            fisrtName: 'tom',
            lastName: 'McMurry'
        }

        const database: any = await mongo.connect(this.url);

        if (!database) {
            throw new Error('cannot connect to the database');
        }
 
        const db = database.db('hackqc');

        const result: any = await db.collection('Users').insertOne(user);
        console.log(result);

    }

}

export const mongoRepository: MongoRepository = new MongoRepository();