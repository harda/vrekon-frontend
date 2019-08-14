
export interface ICompareResult {
    id1?: number;
    idInstitusi1?: number;
    name1?: string;
    // acquirer1?: string;
    // localDate1?: string;
    // localTime1?: string;
    
    id2?: number;
    idInstitusi2?: number;
    name2?: string;
    // acquirer2?: string;
    // localDate2?: string;
    // localTime2?: string;
    status?: string;
    
}

export class CompareResult implements ICompareResult {
    constructor(
        public id1?: number,
        public idInstitusi1?: number,
        public name1?: string,
        // public acquirer1?: string,
        // public localDate1?: string,
        // public localTime1?: string,
        
        public id2?: number,
        public idInstitusi2?: number,
        public name2?: string,
        // public acquirer2?: string,
        // public localDate2?: string,
        // public localTime2?: string,
        public status?: string,
    ) {}
}
