import { StorageService } from './../service/storage.service';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorIteceptor implements HttpInterceptor{

    constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error
            if(errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor: ",errorObj)
            switch(errorObj.status){
                case 403:
                this.handle403();
                break;
            }


            return Observable.throw(errorObj);
        })as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorIteceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIteceptor,
    multi: true
}