import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.css'],
})
export class SessionModalComponent implements AfterViewInit {
  private subscription!: Subscription;
  private bsModal!: Modal;

  @ViewChild('sessionModal') modal!: ElementRef; // get reference to the modal element
  event: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    this.bsModal = new Modal(this.modal.nativeElement); // instantiate the Modal

    this.subscription = this.authService.tokenExpired.subscribe((expired) => {
      if (expired) {
        this.bsModal.show(); // show the modal if the token has expired
      }
    });
  }

  ngOnDestroy() {
    // To prevent memory leak, unsubscribe on component destroy.
    this.subscription.unsubscribe();
  }

  onClick() {
    if (window.location.href === 'http://localhost:4200/') {
      window.location.reload();
    }
    this.router.navigate(['']);
  }
}
