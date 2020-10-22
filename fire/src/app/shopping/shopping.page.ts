import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { storage, initializeApp } from 'firebase'
import { FirebaseApp } from '@angular/fire';
import { HttpClient, HttpClientModule, HttpEventType} from '@angular/common/http'
import { DepFlags } from '@angular/compiler/src/core';
import { CartModalPage } from '../pages/cart-modal/cart-modal.page';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'shopping.page.html',
  styleUrls: ['shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
   cart = [];
   products = [];
  cartItemCount: BehaviorSubject<number>;
   selectedFile :File= null;
  @ViewChild('cart',{static: false, read: ElementRef}) fab: ElementRef;
  constructor(private cartService: CartService, private modalCtrl:ModalController, private http: HttpClient) {}

  ngOnInit(){
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

    addToCart(product)
    {
      this.animatedCSS('tada');
      this.cartService.addProduct(product);
    }

        async openCart(){ 
          this.animatedCSS('bounceOutLeft', true);
        let modal = await this.modalCtrl.create({
          component: CartModalPage,
          cssClass: 'cart-modal'
        });
        modal.onWillDismiss().then(() =>{
          this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
          this.animatedCSS('bounceInLeft')
        });
        modal.present();
    }
    animatedCSS(animationName, keepAnimated = false)
    {
      const node = this.fab.nativeElement;
      node.classList.add('animated', animationName)
       
      //http://github.com/daneden/animated
      function handleAnimationEnd(){
        if(!keepAnimated)
        {
          node.classList.remove('animated', animationName);
        }
        node.removeEventListener('animationend',handleAnimationEnd)
      }
      node.addEventListener('animationend',handleAnimationEnd)
    
    }

  //----------------------------------------------------------------------------------------
    onFileSelected(event){
     this.selectedFile = <File>event.target.files[0];
    }
    onUpload()
    {
      const fd = new FormData();
      fd.append('image',this.selectedFile, this.selectedFile.name)
      this.http.post('https://console.firebase.google.com/project/firewhat-d0dc5/storage/firewhat-d0dc5.appspot.com/files',fd, {
        reportProgress: true,
        observe:'events'

      }).subscribe
      (event =>{
        if(event.type === HttpEventType.UploadProgress)
      {
        console.log('Upload Progress: ', + Math.round(event.loaded /event.total * 100)  + '%');
      } else if (event.type === HttpEventType.Response)
      {
        console.log(event);
      }
      
      })
    }
  
}
