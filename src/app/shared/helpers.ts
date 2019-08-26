import { HttpErrorResponse } from '@angular/common/http';
import { IResponseLog } from './model/response-log.model';

export class VHelper {
    public static responseStatus(data : any): boolean { 
        if(data["log"][0]["status"] == "Success"){
            return true;
        }
        if(data["log"][0]["status"] == "success"){
            return true;
        }
        return false;
    }
    public static ShowLog(logs : IResponseLog[]): void { 
        const log = logs[0];
        alert("Response Error\nstatus : " + log.status + "\n" + "message :" + log.message)
    }
    public static ShowHttpError(resp : HttpErrorResponse){
        alert("HTTP Error\nstatus : " + resp.status + "\n" + "message : " +resp.message);
    }
}