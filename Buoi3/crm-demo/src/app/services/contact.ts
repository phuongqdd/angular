import { Injectable, computed, signal } from '@angular/core';
import type { Contact, Status } from '../models/contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts = signal<Contact[]>(SEED);

  private query = signal('');
  private status = signal<'ALL' | 'Salaried' | 'Terminated' | 'Commission'>('ALL');

  // Mặc định chưa chọn gì
  readonly selectedId = signal<number | null>(null);
  selectById(id: number | null) { 
    this.selectedId.set(id); 
  }

  // Danh sách đã lọc theo search + status
  readonly filtered = computed(() => {
    const q = this.query().toLowerCase();
    const st = this.status();
    return this.contacts().filter(c => {
      const blob = (c.name + c.title + c.company + c.assignedTo + c.phone).toLowerCase();
      const okQ = !q || blob.includes(q);
      const okS = st === 'ALL' || c.status === st;
      return okQ && okS;
    });
  });

  // Contact đang chọn (tìm trong danh sách hiện tại)
  readonly selectedContact = computed(() => {
    const id = this.selectedId();
    const list = this.filtered();
    return id == null ? null : (list.find(c => c.id === id) ?? null);
  });

  setQuery(v: string) { this.query.set(v); }
  setStatus(v: 'ALL' | 'Salaried' | 'Terminated' | 'Commission') { 
    this.status.set(v); 
  }
}


/* demo data */
const SEED: Contact[] = [
  { id:1, name:'Amelia Harper', title:'Network Admin', company:'ACME', status:'Salaried',  assignedTo:'John Heart',     phone:'+1(213)555-4276', email:'amelia@acme.com' },
  { id:2, name:'Antony Remmen', title:'Support Assistant', company:'Clicker', status:'Salaried', assignedTo:'Samantha Bright', phone:'+1(310)555-6625', email:'antony@clicker.com' },
  { id:3, name:'Arnie Schwartz', title:'Engineer', company:'Screen Shop', status:'Salaried', assignedTo:'John Heart', phone:'+1(714)555-8882', email:'arnie@screen.com' },
  {
    id: 4, name: 'Arthur Miller', title: 'CTO', company: 'Super Mart of the West',
    status: 'Salaried', assignedTo: 'Samantha Bright', phone: '+1(310)555-8583',
    email: 'arthurm@dx-email.com',
    avatarUrl: 'logofit.png',
    opportunities: [
      { id: 11, title: 'Black Friday Offer', amount: 1985 },
      { id: 12, title: 'First Sale Opportunity', amount: 1825 },
      { id: 13, title: 'Hospital Conference Room Set', amount: 760 },
      { id: 14, title: 'Incoming Request for Conference Room', amount: 2588 },
      { id: 15, title: 'POS Touch Screens', amount: 970 },
    ],
    activities: [
      { id: 21, type: 'call', summary: 'Intro call completed', when: '2025-10-22' },
      { id: 22, type: 'email', summary: 'Sent pricing deck', when: '2025-11-01' },
    ]
  },
  { id:5, name:'Brad Farkus', title:'Engineer', company:'Walters', status:'Terminated', assignedTo:'John Heart', phone:'+1(213)555-3626', email:'brad@walters.com' },
  { id:6, name:'Clark Morgan', title:'Retail Sales Manager', company:'Electronics Depot', status:'Commission', assignedTo:'John Heart', phone:'+1(925)555-2525', email:'clark@ed.com' },
  { id:7, name:'Billy Zimmer', title:'Engineer', company:'Braeburn', status:'Salaried', assignedTo:'Samantha Bright', phone:'+1(909)555-6939', email:'billy@braeburn.com' },
  { id:8, name:'Brett Wade', title:'IT Manager', company:'Tom’s Club', status:'Salaried', assignedTo:'John Heart', phone:'+1(626)555-0358', email:'brett@toms.com' },
  { id:9, name:'Dallas Lou', title:'Shipping Assistant', company:'Circuit Town', status:'Terminated', assignedTo:'John Heart', phone:'+1(213)555-8357', email:'dallas@ct.com' },
  { id:10, name:'Ed Holmes', title:'Sales Manager', company:'Walters', status:'Salaried', assignedTo:'Samantha Bright', phone:'+1(310)555-1288', email:'ed@walters.com' },
];
