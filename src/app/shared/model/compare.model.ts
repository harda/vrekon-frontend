import { ICompareKey } from './compareKey.model'

export interface ICompareForm {
    idInstitusiFrom?: number;
    idServiceFrom?: number;
    idInstitusiTo?: number;
    idServiceTo?: number;
    rekonCompareKey? : ICompareKey[];
    
}

export class CompareForm implements ICompareForm {
    constructor(
        public idInstitusiFrom?: number,
        public idServiceFrom?: number,
        public idInstitusiTo?: number,
        public idServiceTo?: number,
        public rekonCompareKey? : ICompareKey[]
    ) {}
}