import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  baseUrl = window.location.origin;

  constructor(private http: HttpClient, private messageService: MessageService, private _FileSaverService: FileSaverService) { }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].style.backgroundColor = "#131313";
    if (this.baseUrl.split(":").length > 2) {
      this.baseUrl = this.baseUrl.substring(0, this.baseUrl.lastIndexOf(":"))
    }
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
    const n = this.getRandomNumber();
    this.http.get(this.baseUrl + ":5000/takePic/" + n, { responseType: "blob" }).toPromise().then((resp: any) => {
      this._FileSaverService.save(resp, "pic.png");
    }).catch(resp => {
      console.error("Errore: ", resp);
      this.showErrorMessage();
    });
  }

  registraVideo() {
    const n = this.getRandomNumber();
    this.http.get(this.baseUrl + ":5000/takeVideo/" + n, { responseType: "blob" }).toPromise().then((resp: any) => {
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

  getRandomNumber() {
    return Math.floor((Math.random() * 100) + 1);
  }

}
