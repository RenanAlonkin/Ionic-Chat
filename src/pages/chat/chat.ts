import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = "";
  message: string = "";
  subsciption;
  messages: object[] = [];

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public navParams: NavParams) {
    this.username = this.navParams.get('username');
    this.db.list("/chat").valueChanges().subscribe( data => {
      this.messages = data;
    });
  }

  sendMessage(){
    this.db.list("/chat").push({
      username: this.username,
      message: this.message
    }).then( () => {
      //Mensagem Enviada Com Sucesso
    }).catch( () => {
      //Houve erro ao enviar a mensagem
    })
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ChatPage');
  }

}
