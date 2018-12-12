import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()
export class EstadoService{

  constructor(public http: HttpClient){}
    
  findAll(): any {
    this.http.get(`${API_CONFIG.baseUrl}/`);
  }

}