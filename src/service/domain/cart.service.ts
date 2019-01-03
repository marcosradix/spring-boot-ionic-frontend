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
            cart.itens[position].quantidade++;
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    removeProdutoCart(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.itens.splice(position, 1);
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    increaseProdutoCartQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.itens[position].quantidade++;
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    decreaseProdutoCartQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.itens[position].quantidade--;
            if(cart.itens[position].quantidade < 1){
                cart = this.removeProdutoCart(produto);
            }
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    totalCarrinho() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i = 0; i < cart.itens.length; i++) {
            sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;
            
        }
        return sum;
    }
}