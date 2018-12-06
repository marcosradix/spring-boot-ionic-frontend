import { StorageService } from './storage.service';
import { LocalUser } from './../model/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../model/credenciais.dto';
import { Injectable } from "@angular/core";


@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){

    }
    authenticate(creds: CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            observe:'response',
            responseType: 'text'
            
        });
    }

    successfulLogin(authorizationValue: string){
        let token = authorizationValue.substring(7);
        let user : LocalUser = {
            token: token
        };

        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}