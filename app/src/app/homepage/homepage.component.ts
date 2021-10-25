import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  baseUrl = window.location.origin;

  constructor(private http: HttpClient, private messageService: MessageService, private _FileSaverService: FileSaverService, private router: Router) { }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].style.backgroundColor = "#131313";
    if (this.baseUrl.split(":").length > 2) {
      this.baseUrl = this.baseUrl.substring(0, this.baseUrl.lastIndexOf(":"))
    }
    console.log("Base ", this.baseUrl);
  }

  accendiLuce() {
    this.http.get(this.baseUrl + ":5000/turnOn").toPromise().then((resp: any) => {
      this.showMessageByResponseMessage(resp);
    }).catch(resp => {
      console.error("Errore: ", resp);
      this.showErrorMessage();
    });
  }

  spegniLuce() {
    this.http.get(this.baseUrl + ":5000/turnOff").toPromise().then((resp: any) => {
      this.showMessageByResponseMessage(resp);
    }).catch(resp => {
      console.error("Errore: ", resp);
      this.showErrorMessage();
    });
  }

  scattaFoto() {
    this.http.get(this.baseUrl + ":5000/takePic", { responseType: "blob" }).toPromise().then((resp: any) => {
      this._FileSaverService.save(resp, "pic.png");
    }).catch(resp => {
      console.error("Errore: ", resp);
      this.showErrorMessage();
    });
  }

  registraVideo() {
    this.http.get(this.baseUrl + ":5000/takeVideo", { responseType: "blob" }).toPromise().then((resp: any) => {
      this._FileSaverService.save(resp, "video.mp4");
    }).catch(resp => {
      console.error("Errore: ", resp);
      this.showErrorMessage();
    });
  }

  showMessageByResponseMessage(resp: any) {
    this.messageService.add({ severity: 'success', summary: '', detail: resp.message });
  }

  showErrorMessage() {
    this.messageService.add({ severity: 'error', summary: '', detail: "Impossibile effettuare l'azione desiderata" });
  }

}
