import { IInstituteSrvc } from './instituteSrvc.model';
import { IInstituteTranslate } from './InstituteTranslate.model';


export interface IDbSrvc {
    dbSetting?: IInstituteSrvc;
    dbTranslates?: IInstituteTranslate[];
    
}

export class DbSrvc implements IDbSrvc {
    constructor(
        public dbSetting?: IInstituteSrvc,
        public dbTranslates?: IInstituteTranslate[],
    ) {}
}