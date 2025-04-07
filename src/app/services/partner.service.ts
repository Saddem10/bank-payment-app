import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Partner {
  id?: number;
  alias: string;
  type: string;
  direction: string;
  application: string;
  processedFlowType: string;
  description: string;
}

export interface MessagePage {
  content: Partner[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // numéro de la page actuelle
}

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private apiUrl = 'http://localhost:8080/bank/partners';
  private createUrl = 'http://localhost:8080/bank/partner';

  constructor(private http: HttpClient) {}

  getPartners(page = 0, size = 10): Observable<MessagePage> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<MessagePage>(this.apiUrl, { params });
  }

  addPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(this.createUrl, partner);
  }

  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.createUrl}/${id}`);
  }
}