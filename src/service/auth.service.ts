import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../model/credenciais.dto';
import { Injectable } from "@angular/core";


@Injectable()
export class AuthService{

    constructor(public http: HttpClient){

    }
    authenticate(creds: CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            observe:'response',
            responseType: 'text'
            
        });
    }

}