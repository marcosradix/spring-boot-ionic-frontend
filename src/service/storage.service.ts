import { LocalUser } from './../model/local_user';
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Cart } from '../model/cart';
import { User } from '../model/User';

@Injectable()
export class StorageService {

     getLocalUser():LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null){
            return null;
        }else{
            return JSON.parse(usr);
        }
     }

     setLocalUser(obj: LocalUser){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }

     }

     getCredentialsUser():User{
        let usr = localStorage.getItem(STORAGE_KEYS.user);
        if(usr == null){
            return null;
        }else{
            return JSON.parse(usr);
        }
     }

     setCredentialsUser(obj: User){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.user);
        }else{
            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(obj));
        }

     }

     getLocalCart():Cart{
        let cart = localStorage.getItem(STORAGE_KEYS.cart);
        if(cart == null){
            return null;
        }else{
            return JSON.parse(cart);
        }
     }

     setLocalCart(obj: Cart){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.cart);
        }else{
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }

     }

}