import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Contact } from './contact';
import { map } from "rxjs/operators";
// import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: Http) { }

  // Retriving All Contactss
  getContacts() {
    return this.http.get('http://localhost:3000/api/contact/all').pipe(map(res => res.json()));
  }

  // Retriving a Contact
  getContact(phone) {
    return this.http.get('http://localhost:3000/api/contact/'+phone).pipe(map(res => res.json()));
  }

  // Add Contact
  addContact(newContact) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/contact', newContact, { headers: headers }).pipe(map(res => res.json()));
  }

  // Update Contact
  updateContact(updateContact) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/contact', updateContact, { headers: headers }).pipe(map(res => res.json()));
  }

  // Delete Contact
  deleteContact(phone) {
    return this.http.delete('http://localhost:3000/api/contact/'+phone).pipe(map(res => res.json()));
  }
}
