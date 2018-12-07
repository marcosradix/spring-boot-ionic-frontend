import { StorageService } from './../service/storage.service';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorIteceptor implements HttpInterceptor{

    constructor(public storage: StorageService,
                public alert:AlertController){}

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
                case 401:
                this.handle401(errorObj);
                break;
                default:
                this.handleDefaultError(errorObj);
                break;

            }


            return Observable.throw(errorObj);
        })as any;
    }
    handleDefaultError(errorObj) {
        let alertCtrl = this.alert.create({
            title: `Erro ${errorObj.status} : ${errorObj.error}`,
            message:`${errorObj.message}`,
            enableBackdropDismiss:false,
            buttons: [
                {text: "OK"}
            ]
        });
        alertCtrl.present();
    }
    handle401(errorObj: any): any {
        let alertCtrl = this.alert.create({
            title: `${errorObj.error} erro ${errorObj.status}`,
            message:`${errorObj.message}`,
            enableBackdropDismiss:false,
            buttons: [
                {text: "OK"}
            ]
        });
        alertCtrl.present();
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