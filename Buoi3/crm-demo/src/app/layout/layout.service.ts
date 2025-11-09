import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  // desktop: mở mặc định
  sidebarOpen = signal(true);

  toggleSidebar() { this.sidebarOpen.update(v => !v); }
  openSidebar()   { this.sidebarOpen.set(true); }
  closeSidebar()  { this.sidebarOpen.set(false); }
}
