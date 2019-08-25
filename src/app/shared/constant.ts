

export class VConst {
    public static get DBTYPE(): any { 
        return {
            "mysql":"mysql",
            "oracle":"oracle",
            "text":"text",
            "excel":"excel"
        }; 
    }
    public static get SERVICE_STATUS(): any { 
        return {
            "Ready":"Ready",
            "Empty":"Empty",
        }; 
    }
}
