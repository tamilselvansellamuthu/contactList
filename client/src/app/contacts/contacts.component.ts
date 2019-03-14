import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;
  updateflag: boolean = false;

  constructor(private contactService: ContactService) { }

  // Update/Add Contact
  updateAddContact(val : any) {
    if (this.updateflag == true) {
      this.updateContact();
    } else {
      this.addContact();
    }
  }

  // Add contact
  addContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact)
      .subscribe(contact => {
        this.contacts.push(contact);
        this.first_name = "";
        this.last_name = "";
        this.phone = "";
        this.getAllContacts()
      });
  }

  loadUpdateForm(contact: any) {
    this.first_name = contact.first_name;
    this.last_name = contact.last_name;
    this.phone = contact.phone;
    this.updateflag = true;
  }
  
  // Update contact
  updateContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }

    this.contactService.updateContact(newContact)
      .subscribe(contact => {
        this.updateflag = false;
        this.first_name = "";
        this.last_name = "";
        this.phone = "";
        this.getAllContacts()
      });
  }

  // Delete contacts
  deleteContact(phone: any) {
    var contacts = this.contacts;
    this.contactService.deleteContact(phone)
      .subscribe(data => {
        console.log('deleteContacts')
        this.getAllContacts();
        // if (data.n == 1) {
        //   for (var i = 0; i < contacts.length; i++) {
        //     if (contacts[i].phone == phone) {
        //       contacts.splice(1, 1);
        //       this.getAllContacts();
        //     }
        //   }
        // }
      })
  }

  // Get All Contacts
  getAllContacts() {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  ngOnInit() {
    this.getAllContacts();
  }

}
