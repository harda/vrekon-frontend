import { IInstituteSrvc, InstituteSrvc } from "./instituteSrvc.model";

export interface IInstitute {
    id?: number;
    name?: string;
    institusiTable?: number;
    institusiService?: IInstituteSrvc;
}

export class Institute implements IInstitute {
    constructor(
        public id?: number,
        public name?: string,
        public institusiTable?: number,
        public institusiService?: IInstituteSrvc
    ) {}
}
