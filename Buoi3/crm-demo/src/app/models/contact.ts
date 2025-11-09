export type Status = 'Salaried' | 'Terminated' | 'Commission';

export interface Opportunity {
  id: number;
  title: string;
  amount?: number;
}

export interface Activity {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'task';
  summary: string;
  when: string; // ISO date
}

export interface Contact {
  id: number;
  name: string;
  title: string;
  company: string;
  status: Status;
  assignedTo: string;
  phone: string;
  email: string;
  address?: string;
  avatarUrl?: string;
  opportunities?: Opportunity[];
  activities?: Activity[];
}
