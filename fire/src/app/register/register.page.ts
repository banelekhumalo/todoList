import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import  { auth } from 'firebase/app'

import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string =""
  lname: string =""
  
  username: string =""
  password: string =""
  cpassword: string =""

  constructor(public afAuth: AngularFireAuth,
            public alert: AlertController,
            public router: Router) { }

  ngOnInit() {
  }

  async register()

  {
    const { name, lname, username, password, cpassword } = this
      if(password !== cpassword)
      {
        this.showAlert("Error!","Password do not match")
        return console.error("Passwords do not match")
      }

      try
      {
        const res = await this.afAuth.createUserWithEmailAndPassword(username + '@banele.com', password)
        console.log(res)
        this.showAlert("Sign up Successful!","Welcome home, there's no place like home")
        this.router.navigate(['/tabs'])
      }catch(error){
          console.dir(error)
          this.showAlert("Error",error.message)
      }
  }
  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons:["Ok"]
    })
    await alert.present()
  }
}
