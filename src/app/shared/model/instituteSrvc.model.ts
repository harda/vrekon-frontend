import { IInstituteTranslate, InstituteTranslate } from "./InstituteTranslate.model";

export interface IInstituteSrvc {
    id?: number;
    idInstitusi?: number;
    dbType?: string;
    dbHost?: string;
    dbName?: string;
    dbUsername?: string;
    dbPassword?: string;
    dbTableName?: string;
    status?: string;
    dbTranslates?: IInstituteTranslate[];
}

export class InstituteSrvc implements IInstituteSrvc {
    constructor(
        public id?: number,
        public idInstitusi?: number,
        public dbType?: string,
        public dbHost?: string,
        public dbName?: string,
        public dbUsername?: string,
        public dbPassword?: string,
        public dbTableName?: string,
        public status?: string,
        public dbTranslates?: IInstituteTranslate[]
    ) {}
}
