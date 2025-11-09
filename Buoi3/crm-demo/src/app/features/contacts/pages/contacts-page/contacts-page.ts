import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../../../services/contact';
import { Contact } from '../../../../models/contact';
import { ContactDetail } from '../../parts/contact-detail/contact-detail.component';

type SortKey = 'name'|'company'|'status'|'assignedTo'|'phone';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactDetail],
  templateUrl: './contacts-page.html',
  styleUrls: ['./contacts-page.css']
})
export class ContactsPage {
  // dropdown lọc trạng thái
  showStatusMenu = signal(false);

  // sort
  sortKey = signal<SortKey>('name');
  sortDir = signal<'asc'|'desc'>('asc');

  constructor(public svc: ContactService) {}

  readonly rows = computed<Contact[]>(() => {
    const arr = [...this.svc.filtered()];
    const k = this.sortKey(), d = this.sortDir();
    arr.sort((a:any,b:any)=>{
      const aa=(a[k]??'').toString().toLowerCase();
      const bb=(b[k]??'').toString().toLowerCase();
      return aa<bb?(d==='asc'?-1:1):aa>bb?(d==='asc'?1:-1):0;
    });
    return arr;
  });

  // events
  toggleStatusMenu(){ 
    this.showStatusMenu.update(v=>!v); 
  }
  pickStatus(v:any){ 
    this.svc.setStatus(v); 
    this.showStatusMenu.set(false); 
  }
  setQuery(v:string){ 
    this.svc.setQuery(v); 
  }

  sortBy(k: SortKey){
    if(this.sortKey()===k) {
      this.sortDir.set(this.sortDir()==='asc'?'desc':'asc');
    }
    else { 
      this.sortKey.set(k); this.sortDir.set('asc'); 
    }
  }

  selectRow(id:number){ 
    this.svc.selectById(id); 
  }          // chọn dòng
  isSelected(id:number){ 
    return this.svc.selectedId()===id; 
  } // tô màu

  // để không đổi chọn khi click vào checkbox/nút …
  stop(e: MouseEvent){ 
    e.stopPropagation(); 
  }

  trackById = (_:number, item:Contact)=>item.id;

  statusClass(s:string){
    return { 
      green:s==='Salaried', 
      red:s==='Terminated', 
      blue:s==='Commission' 
    };
  }
}
