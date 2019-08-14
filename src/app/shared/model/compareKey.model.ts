

export interface ICompareKey {
    KeyName?: string;
}

export class CompareKey implements ICompareKey {
    constructor(
        public KeyName?: string,
    ) {}
}