
import { StorageService } from './storage.service';
import { LocalUser } from './../model/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../model/credenciais.dto';
import { Injectable } from "@angular/core";
import {JwtHelper} from 'angular2-jwt';
import { User } from '../model/User';


@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();
    userCredentials: User;
    constructor(public http: HttpClient, public storage: StorageService){
    }
    authenticate(creds: CredenciaisDTO){
        this.userCredentials = creds;
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
            observe:'response',
            responseType: 'text'
            
        });
    }

    successfulLogin(authorizationValue: string){
        let token = authorizationValue.substring(7);
        let user : LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };

        let userCredentials : User = {
            email: this.userCredentials.email,
            senha: this.userCredentials.senha
        };
        this.storage.setCredentialsUser(userCredentials);
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setCredentialsUser(null);
        this.storage.setLocalUser(null);
    }

    refreshToken(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {
            observe:'response',
            responseType: 'text'
            
        });
    }
}