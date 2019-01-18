import { ProdutoDTO } from './../../model/produto.dto';
import { Observable } from 'rxjs/Rx';

import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ProdutoService{


    constructor(public http:HttpClient){

    }

    findById(produto_id: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoriaId: string, page: number =0, linesPerPage: number = 24){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaId}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.baseUrlBucket}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType : "blob"});
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.baseUrlBucket}/prod${id}.jpg`;
        return this.http.get(url, {responseType : "blob"});
    }

}