import { ICompareKey } from './compareKey.model'

export interface ICompareForm {
    idInstitusiFrom?: number;
    idInstitusiTo?: number;
    rekonCompareKey? : ICompareKey[];
    
}

export class CompareForm implements ICompareForm {
    constructor(
        public idInstitusiFrom?: number,
        public idInstitusiTo?: number,
        public rekonCompareKey? : ICompareKey[]
    ) {}
}