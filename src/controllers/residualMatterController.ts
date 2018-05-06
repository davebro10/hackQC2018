import { residualMatterRepository } from "../repository/residualMatterRepository";
import { TranslateUtils } from "../utils/translateUtils";
import { VisionUtils } from "../utils/visionUtils";
import { WASTETYPE } from "../enums/wasteType";

class ResidualMatterController {

    public async getResidualMatter(express: any): Promise<void> {
        const lavalResidual = await residualMatterRepository.getLavalResidualMaterialsAccepted();
        express.res.status(200).send(lavalResidual);
    }

    public async postResidualMatterWord(express: any): Promise<any> {
        let wasteType: WASTETYPE;
        const word = express.params.word;

        if (express.body.city === "Sherbrooke") {

            const SherbookeResidual = await residualMatterRepository.getSherbrookeResidualMaterialsAccepted()
                .catch(err => {
                    console.log('error' + err);
                });


            for (let i = 0; i < SherbookeResidual.length; i++) {

                if (SherbookeResidual[i]['MAT_NOM'] === null) { return };
                if (SherbookeResidual[i]['MAT_NOM'].toLowerCase().includes(word.toLowerCase())) {
                    if (SherbookeResidual[i]["TYPE_COL"].includes('O')) {
                        wasteType = WASTETYPE.ECOCENTER;
                    }
                    else if (SherbookeResidual[i]["TYPE_COL"].includes('C')) {
                        wasteType = WASTETYPE.ORGANIC;
                    }
                    else if (SherbookeResidual[i]["TYPE_COL"].includes('R')) {
                        wasteType = WASTETYPE.RECYCLE;
                    }
                    else {
                        wasteType = WASTETYPE.WASTE;
                    }
                }

            }
        } else {

            const lavalResidual = await residualMatterRepository.getLavalResidualMaterialsAccepted()
                .catch(err => {
                    console.log('error' + err);
                });


            for (let i = 0; i < lavalResidual.length; i++) {

                    if (lavalResidual[i].description === null) { 
                        return; 
                    };

                    if (lavalResidual[i].description.toLowerCase().includes(word.toLowerCase())) {
                        if (lavalResidual[i]["nom-collecte"].includes('matériaux') ||
                            lavalResidual[i]["nom-collecte"].includes('domestiques') ||
                            lavalResidual[i]["nom-collecte"].includes('autres matières')) {
                            wasteType = WASTETYPE.ECOCENTER;
                        }
                        else if (lavalResidual[i]["nom-collecte"].includes('organiques')) {
                            wasteType = WASTETYPE.ORGANIC;
                        }
                        else if (lavalResidual[i]["nom-collecte"].includes('recyclables')) {
                            wasteType = WASTETYPE.RECYCLE;
                        }
                        else {
                            wasteType = WASTETYPE.WASTE;
                        }
                    }

            }

            if (!wasteType) {
                express.res.status(200).send("not found");
            }
        }

        express.res.status(200).send(wasteType);
    }

    public async postResidualMatterPicture(express: any): Promise<void> {

        let englishWords: string[] = await VisionUtils.analysePicture(express.body.name);
        englishWords = englishWords.slice(0, 6);
        const frenchWords = await TranslateUtils.translate(englishWords);

        let wasteType: WASTETYPE;


        if (express.body.city === "Sherbrooke") {

            const SherbookeResidual = await residualMatterRepository.getSherbrookeResidualMaterialsAccepted()
                .catch(err => {
                    console.log('error' + err);
                });

            let found = false;

            for (let i = 0; i < SherbookeResidual.length; i++) {

                if (found) {
                    break;
                }

                frenchWords.forEach((word: string) => {
                    if (SherbookeResidual[i]['MAT_NOM'] === null) { return };
                    if (SherbookeResidual[i]['MAT_NOM'].toLowerCase().includes(word.toLowerCase())) {
                        if (SherbookeResidual[i]["TYPE_COL"].includes('O')) {
                            wasteType = WASTETYPE.ECOCENTER;
                            found = true;
                        }
                        else if (SherbookeResidual[i]["TYPE_COL"].includes('C')) {
                            wasteType = WASTETYPE.ORGANIC;
                            found = true;
                        }
                        else if (SherbookeResidual[i]["TYPE_COL"].includes('R')) {
                            wasteType = WASTETYPE.RECYCLE;
                            found = true;
                        }
                        else {
                            wasteType = WASTETYPE.WASTE;
                            found = true;
                        }
                    }
                });

            }
        } else {

            const lavalResidual = await residualMatterRepository.getLavalResidualMaterialsAccepted()
                .catch(err => {
                    console.log('error' + err);
                });

            let found = false;

            for (let i = 0; i < lavalResidual.length; i++) {

                if (found) {
                    break;
                }

                frenchWords.forEach((word: string) => {
                    if (lavalResidual[i].description === null) { return };
                    if (lavalResidual[i].description.toLowerCase().includes(word.toLowerCase())) {
                        if (lavalResidual[i]["nom-collecte"].includes('matériaux') ||
                            lavalResidual[i]["nom-collecte"].includes('domestiques') ||
                            lavalResidual[i]["nom-collecte"].includes('autres matières')) {
                            wasteType = WASTETYPE.ECOCENTER;
                            found = true;
                        }
                        else if (lavalResidual[i]["nom-collecte"].includes('organiques')) {
                            wasteType = WASTETYPE.ORGANIC;
                            found = true;
                        }
                        else if (lavalResidual[i]["nom-collecte"].includes('recyclables')) {
                            wasteType = WASTETYPE.RECYCLE;
                            found = true;
                        }
                        else {
                            wasteType = WASTETYPE.WASTE;
                            found = true;
                        }
                    }
                });

            }
        }

        express.res.status(200).send(wasteType);
    }


}

export let residualMatterController: ResidualMatterController = new ResidualMatterController();