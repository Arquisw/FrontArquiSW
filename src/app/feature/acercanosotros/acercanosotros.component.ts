import { Component } from '@angular/core';
import Modal from "bootstrap/js/dist/modal"

@Component({
  selector: 'app-acercanosotros',
  templateUrl: './acercanosotros.component.html',
  styleUrls: ['./acercanosotros.component.scss']
})
export class AcercanosotrosComponent {
  loginModal: Modal| undefined;

  constructor() { }

  open(): void
  {
    this.loginModal = new Modal(document.getElementById('loginModal')!, {
      keyboard: false
    })
    this.loginModal?.show();
  }


}
