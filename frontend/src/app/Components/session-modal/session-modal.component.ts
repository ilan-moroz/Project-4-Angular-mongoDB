import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.css'],
})
export class SessionModalComponent {
  showModal() {
    $('#sessionModal').modal('show');
  }
}
