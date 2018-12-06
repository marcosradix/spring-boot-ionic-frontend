import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClienteDTO } from '../../model/cliente.dto';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ClienteService{
    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email:string): Observable<ClienteDTO> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({
            "Authorization" : "Bearer" + token
        });
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`,
        {"headers": authHeader});
    }
}