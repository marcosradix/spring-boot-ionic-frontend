
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorIteceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log("passou por inteceptor");
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
            return Observable.throw(errorObj);
        })as any;
    }
}

export const ErrorIteceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIteceptor,
    multi: true
}