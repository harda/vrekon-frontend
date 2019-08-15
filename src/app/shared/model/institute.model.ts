import { IInstituteSrvc, InstituteSrvc } from "./instituteSrvc.model";

export interface IInstitute {
    id?: number;
    name?: string;
    institusiTabel?: number;
    institusiService?: IInstituteSrvc;
}

export class Institute implements IInstitute {
    constructor(
        public id?: number,
        public name?: string,
        public institusiTabel?: number,
        public institusiService?: IInstituteSrvc
    ) {}
}
