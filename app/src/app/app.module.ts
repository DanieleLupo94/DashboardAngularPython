import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FileSaverModule } from 'ngx-filesaver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ToastModule,
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
