import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  id: number;
  content: string;
  sender: string;
  receivedAt: string;
}

export interface MessagePage {
  content: Message[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // numéro de la page actuelle
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/bank/messages';

  constructor(private http: HttpClient) {}

  getMessages(page: number = 0, size: number = 10): Observable<MessagePage> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<MessagePage>(this.apiUrl, { params });
  }

  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }

  sendMessage(message: { sender: string; content: string }): Observable<any> {
    return this.http.post('http://localhost:8080/bank/mq/send', message);
  }
}
