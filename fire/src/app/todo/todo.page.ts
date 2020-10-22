import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
require('firebase/firestore');


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  
  tObj = {
    name: '',
    image: '',
   
  };
  constructor(private modalCtrlr: ModalController,private navCtlr: NavController,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }
  async addTodo() {
    const relaod = await this.loadingController.create({
      message: 'relaod',
    });
    //await reload.present();


    
    firebase.firestore().collection('todo1')
      .add(this.tObj)
      .then((res) => {
        console.log(res)
        console.log("Document successfully written!");
        this.modalCtrlr.dismiss();
        relaod.dismiss();
      })
      .catch((error) => {
        relaod.dismiss();
        console.error("Error writing document: ", error);
      });
  }

  // uploadImage(imageURI, randomId){
  //   return new Promise<any>((resolve, reject) => {
  //     let storageRef = firebase.storage().ref();
  //     let imageRef = storageRef.child('image').child(randomId);
  //     this.encodeImageUri(imageURI, function(image64){
  //       imageRef.putString(image64, 'data_url')
  //       .then(snapshot => {
  //         snapshot.ref.getDownloadURL()
  //         .then(res => resolve(res))
  //       }, err => {
  //         reject(err);
  //       })
  //     })
  //   })
 // }
 addPic(event:any){
   let reader = new FileReader();
   reader.onload = (event:any)=>{
   this.note.downloadurl = event.target.result;
   }
   reader.readAsDataURL(event.target.file[0]);
 }


}
