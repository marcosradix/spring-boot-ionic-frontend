import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CidadeDTO } from '../../model/cidade.dto';
import { Observable } from 'rxjs';

@Injectable()
export class CidadeService{

constructor(public http: HttpClient){}

  findAll(estado_id: string): Observable<CidadeDTO[]> {
   return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`); 
  }

}