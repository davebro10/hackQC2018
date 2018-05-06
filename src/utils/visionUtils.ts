import * as _request from 'superagent';
const fs = require('fs');

export class VisionUtils {

    public static async analysePicture(data: any): Promise<any> {
        
        const url: string = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

        const b64string = data;
        const buf = Buffer.from(b64string, 'base64');

        const result = await _request
        .post(url)
        .query('visualFeatures=Categories,Description,Color')
        .accept('application/json')
        .set('Ocp-Apim-Subscription-Key', 'a9d56c6fb7b04af6a54264b8041e0fa2')
        .attach('data', buf)
        .catch( (err:Error) => {
            throw new Error('Cannot find the picture');
        });

        return result.body.description.tags;
        
    }
}