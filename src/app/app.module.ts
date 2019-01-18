import { CartService } from './../service/domain/cart.service';
import { ClienteService } from './../service/domain/cliente.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../service/domain/categoria.service';
import { ErrorIteceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { AuthInterceptorProvider } from '../interceptors/auth-inerceptor';
import { ProdutoService } from '../service/domain/produto.service';
import { ImageUtilsBlobService } from '../service/image-utils-blob';




@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ""
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    ErrorIteceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    ImageUtilsBlobService
  ]
})
export class AppModule {}
