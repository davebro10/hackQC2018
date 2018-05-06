// @ts-ignore
import * as googleTranslate from 'google-translate-api'

export class TranslateUtils {

    public static async translate(words: string[], lang: string = 'fr'): Promise<string[]> {

        const results = [];

        for (let word of words) {
            const result = await googleTranslate(word, {to: lang});
            results.push(result.text);
        }
        return results;
    }

}