import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  accendiLuce() {
    this.http.get("http://localhost:5000/turnOn").toPromise().then((resp: any) => {
      this.showMessageByResponseMessage(resp);
    });
  }

  spegniLuce() {
    this.http.get("http://localhost:5000/turnOff").toPromise().then((resp: any) => {
      this.showMessageByResponseMessage(resp);
    });
  }

  scattaFoto() {
    this.http.get("http://localhost:5000/takePic").toPromise().then((resp: any) => {
      console.log("Dal server: ", resp);
      //this.showMessageByResponseMessage(resp);
    });
  }

  registraVideo() {
    this.http.get("http://localhost:5000/takeVideo").toPromise().then((resp: any) => {
      console.log("Dal server: ", resp);
      //this.showMessageByResponseMessage(resp);
    });
  }

  showMessageByResponseMessage(resp: any) {
    if (resp.status == 200) {
      this.messageService.add({ severity: 'success', summary: '', detail: resp.message });
    } else {
      this.messageService.add({ severity: 'error', summary: '', detail: resp.message });
    }
  }

}
