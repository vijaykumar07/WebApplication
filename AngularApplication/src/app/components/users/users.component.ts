import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  userCopy: User[];
  statusCode: number;
  userObj: any = {};
  isUserCreate: boolean;
  isUserUpdate: boolean;

  //Create form
  userForm = new FormGroup({
    'user-name': new FormControl('', Validators.required),
    'user-emailid': new FormControl('', Validators.required),
    'user-phone-number': new FormControl('', Validators.required),
    'user-company-name': new FormControl('', Validators.required),
    'user-address': new FormControl('', Validators.required)
  });

  userIdToUpdate = null;

  constructor(private userService: UserService) {
    console.log("User component has started!")
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  createUser() {
      this.isUserCreate = true;
      this.isUserUpdate = false;

  }

  updateUser(user) {
    this.isUserCreate = false;
    this.isUserUpdate = true;
    this.userCopy = user;
    this.userIdToUpdate = user.id;
    this.userForm.setValue({ 'user-name': user.name, 'user-emailid': user.email, 'user-phone-number': user.phone, 'user-company-name': user.company.name, 'user-address': user.address.street });
  }

  onUserFormSubmit() {
    //capture the form data
    let userFormDetails: User = this.userForm.value;

    let userName = userFormDetails['user-name'],
      userEmailID = userFormDetails['user-emailid'],
      userPhoneNumber = userFormDetails['user-phone-number'],
      userCompanyName = userFormDetails['user-company-name'],
      userAddress = userFormDetails['user-address'];
    if (this.userIdToUpdate === null) {
      //Handle create 
      this.userObj['id'] = this.users.length + 1;
      this.userObj['name'] = userName;
      this.userObj['email'] = userEmailID;
      this.userObj['phone'] = userPhoneNumber;
      this.userObj['company'] = { 'name': userCompanyName };
      this.userObj['address'] = { 'street': userAddress };

      //Add User Details in UserModal
      this.users.unshift(this.userObj);

    } else {
      //Handle update
      this.userService.getUserByID(this.userIdToUpdate).subscribe(user => {

        user.name = userName;
        user.email = userEmailID;
        user.phone = userPhoneNumber;
        user.company.name = userCompanyName;
        user.address.street = userAddress;

        let self = this;
        this.users.forEach((value, index) => {
          if ((self.userIdToUpdate - 1) === index) {
            //Update the users Model
            self.users[index] = user;
          }
        });

      });
    }

  }
  // delete User from the user modal
  deleteUser(index) {
    let deleteUserIndex = index,
      self = this;
    this.users.forEach((user, index) => {
      if (index === deleteUserIndex) {
        self.users.splice(index, 1);
      }
    });
  }
}

interface User {
  id: number,
  name: string,
  phone: number,
  username: string,
  website: string,
  company: Company,
  address: Address
}

interface Company {
  bs: string,
  catchPhrase: string,
  name: string
}

interface Address {
  city: string,
  geo: any,
  street: string,
  suite: string,
  zipcode: number
}
