import * as _request from 'superagent';

// @ts-ignore
import * as laval from '../json/laval_matiere_residuelle.json';

class ResidualMatterRepository {

    public async getLavalResidualMaterialsAccepted(): Promise<any> {
        return await laval;
    }

    public async getSherbrookeResidualMaterialsAccepted(): Promise<any> {
        const data: any = await _request.get('https://www.donneesquebec.ca/recherche/dataset/5ed944c5-c13e-4df9-a977-72f03578023e/resource/4ccd1a3c-1e80-4441-a3b4-31684632f3b0/download/matieres-residuelles.json')
        .catch( (err: Error) => {
            throw new Error('Sherbrooke residual material not found ' + err);
        });
        return data.body.MATIERES_RESIDUELLES.MATIERE_RESIDUELLE;
    }
}

export const residualMatterRepository: ResidualMatterRepository = new ResidualMatterRepository();