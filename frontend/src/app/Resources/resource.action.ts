 export class ResourceAction{

    url: string;
    method: string;
    params: any;
    body: any;

    constructor( url: string, method = 'get', params?, body? ){
        this.url = url;
        this.method = method;
        this.params = params;
        this.body = body;
    }
 }