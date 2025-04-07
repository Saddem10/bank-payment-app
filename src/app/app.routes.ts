import { Routes } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { PartnersComponent } from './components/partners/partners.component';

export const routes: Routes = [
    { path: '', redirectTo: 'messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'partners', component: PartnersComponent }
  ];