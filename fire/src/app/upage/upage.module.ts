import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpagePageRoutingModule } from './upage-routing.module';

import { UpagePage } from './upage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpagePageRoutingModule
  ],
  declarations: [UpagePage]
})
export class UpagePageModule {}
