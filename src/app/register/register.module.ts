import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { RegisterService } from './register.service';
import { HttpDefault } from '../httpDefault';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RegisterPageRoutingModule],
  declarations: [RegisterPage],
  providers: [RegisterService],
})
export class RegisterPageModule {}
