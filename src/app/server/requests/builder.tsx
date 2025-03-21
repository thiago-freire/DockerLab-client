
export class RequestBuilder  {

    requestOptions: RequestInit;
    requestHeaders: Headers;

    constructor() {
        this.requestOptions = {
            method: 'GET', // Default method
            headers: undefined,
            body: undefined
        };
        this.requestHeaders = new Headers();
    }

    setMethod(method: 'GET'|'POST') {
        this.requestOptions.method = method;
        return this; // Permite encadeamento de métodos
    }

    setHeader(key: string, value: string) {
        this.requestHeaders.set(key, value);
        this.requestOptions.headers = this.requestHeaders;
        return this;
    }

    setAuthorization(token: string) {
        this.setHeader('Authorization', 'Bearer ' + token);
        return this;
    }

    setContentType(contentType: string) {
        this.setHeader('Content-Type', contentType);
        return this;
    }

    setBody(body: FormData | object) {
        if (body instanceof FormData){
            this.requestOptions.body = body
        }else {
            this.requestOptions.body = JSON.stringify(body);
        }
        return this;
    }

    build() {
        return this.requestOptions;
    }
}
