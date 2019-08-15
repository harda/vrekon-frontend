

export interface IResponseLog {
    status?: string;
    message? : string;
}

export class ResponseLog implements IResponseLog {
    constructor(
        public status?: string,
        public message? : string
    ) {}
}