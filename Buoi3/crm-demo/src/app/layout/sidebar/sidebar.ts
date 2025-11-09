import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {

   year = new Date().getFullYear();

  // trạng thái mở nhóm
  open = {
    crm: true,
    planning: true,
    analytics: true
  };

  toggle(key: keyof typeof this.open) {
    this.open[key] = !this.open[key];
  }
}
