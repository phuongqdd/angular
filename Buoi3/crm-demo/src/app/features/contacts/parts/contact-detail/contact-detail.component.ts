import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Contact } from '../../../../models/contact';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetail {
  @Input({ required: true }) contact!: Contact;
  @Output() close = new EventEmitter<void>();

  oppOpen = true;
  actOpen = false;

  toggleOpp() {
    this.oppOpen = !this.oppOpen;
  }
  toggleAct() {
    this.actOpen = !this.actOpen;
  }

  statusClass(s: string) {
    return { 
      green: s === 'Salaried', 
      red: s === 'Terminated', 
      blue: s === 'Commission' 
    };
  }
}
