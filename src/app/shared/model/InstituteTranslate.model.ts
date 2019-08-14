
export interface IInstituteTranslate {
    id?: number;
    idService?: number;
    originTableName?: string;
    targetTableName?: string;
}

export class InstituteTranslate implements IInstituteTranslate {
    constructor(
        public id?: number,
        public idService?: number,
        public originTableName?: string,
        public targetTableName?: string
    ) {}
}
