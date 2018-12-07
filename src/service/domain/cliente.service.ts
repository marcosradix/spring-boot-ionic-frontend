import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClienteDTO } from '../../model/cliente.dto';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ClienteService{
    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email:string): Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.baseUrlBucket}/cp${id}.jpg`;
        return this.http.get(url, {responseType : "blob"});
    }
}