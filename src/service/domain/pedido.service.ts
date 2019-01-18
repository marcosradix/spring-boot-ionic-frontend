import { PedidoDTO } from './../../model/pedido.dto';

import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class PedidoService {

    constructor(public http: HttpClient) {

    }


insert(pedido: PedidoDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido, {
        observe: 'response',
        responseType: 'text'
    });
}
} 