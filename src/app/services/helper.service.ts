import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl: string = 'https://localhost:44384/api/helper/';

  sendContactEmail(contact: Contact) {
    let url = `${this.apiUrl}SendContactEmail`;
    return this.httpClient.post(url, contact);
  }
}
