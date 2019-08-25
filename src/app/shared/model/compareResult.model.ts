
export interface ICompareResult {
    downloadLink?: string;
    resultRekon?: any[];
    
    
}

export class CompareResult implements ICompareResult {
    constructor(
        public downloadLink?: string,
        public resultRekon?: any[]
    ) {}
}
