import { ProdutoDTO } from './../../model/produto.dto';
import { Cart } from './../../model/cart';
import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';


@Injectable()
export class CartService{

    constructor(public storage: StorageService){}

    createOrCleanCart(): Cart {
        let cart:Cart = {itens: []}
        this.storage.setLocalCart(cart);
        return cart;
    }

    getCart(): Cart{

        let cart: Cart = this.storage.getLocalCart();
        if(cart == null){
            cart = this.createOrCleanCart();
        }

        return cart;
    }

    addProdutoCart(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.itens.push({quantidade: 1, produto: produto});
        }else{
            cart.itens.map((item) =>{
                if(item.produto.id == produto.id){
                    item.quantidade = item.quantidade +1;
                }
            });
        }
        this.storage.setLocalCart(cart);
        return cart;
    }
}