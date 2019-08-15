import { ResponseLog } from './response-log.model';

export interface IApiResponse {
    response?: any;
    log? : ResponseLog;
}

export class ApiResponse implements IApiResponse {
    constructor(
        public response?: any,
        public log?: ResponseLog,
    ) {}
}