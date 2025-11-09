import { Component, EventEmitter, Output } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  constructor(public layout: LayoutService) {}
  toggleSidebar() { 
    this.layout.toggleSidebar(); 
  }
}
