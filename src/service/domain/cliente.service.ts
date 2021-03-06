import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClienteDTO } from '../../model/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { ImageUtilsBlobService } from '../image-utils-blob';


@Injectable()
export class ClienteService {


    constructor(public http: HttpClient,
        public storage: StorageService,
        public imageBlobConvert: ImageUtilsBlobService) {

    }

    insert(obj: ClienteDTO): any {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, { observe: "response", responseType: "text" });
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.baseUrlBucket}/cp${id}.jpg`;
        return this.http.get(url, { responseType: "blob" });
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageBlobConvert.dataURItoBlob(picture);
        let formData : FormData = new FormData();
        formData.set("file",pictureBlob, "file.png");
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/foto`, formData,
         {
              observe: "response",
                responseType: "text"
             });
    }
}