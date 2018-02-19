import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[];
  userCopy:User[];
  statusCode:number;
  createUser:Object = {};

  //Create form
   userForm = new FormGroup({
    "user-name": new FormControl('', Validators.required),
    "user-emailid": new FormControl('', Validators.required),
    "user-phone-number": new FormControl('', Validators.required),
    "user-company-name": new FormControl('', Validators.required),
    "user-address": new FormControl('', Validators.required)  
   });

   userIdToUpdate = null;

  constructor(private userService:UserService) {

   }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  updateUser(user){
    this.userCopy = user;
    this.userIdToUpdate = user.id;
    this.userForm.setValue({ "user-name": user.name, "user-emailid": user.email, "user-phone-number":user.phone, "user-company-name":user.company.name, "user-address":user.address.street});
  }

  onUserFormSubmit(){
    //capture the form data
    let userFormDetails:User = this.userForm.value;

    let userName = userFormDetails['user-name'],
        userEmailID = userFormDetails['user-emailid'],
        userPhoneNumber = userFormDetails['user-phone-number'],
        userCompanyName = userFormDetails['user-company-name'],
        userAddress = userFormDetails['user-address'];
    if(this.userIdToUpdate === null){
      //Handle create 
      this.createUser['id'] = this.users.length + 1;
      this.createUser['name'] = userName;
      this.createUser['email'] = userEmailID;
      this.createUser['phone'] = userPhoneNumber;
      this.createUser['company'] = {"name":userCompanyName};
      this.createUser['address'] = {"street":userAddress};

      //Add User Details in UserModal
      this.users.push(this.createUser); 
      
    }else{
      //Handle update
      this.userService.getUserByID(this.userIdToUpdate).subscribe(user => {
        
        user.name = userName;
        user.email = userEmailID;
        user.phone = userPhoneNumber;
        user.company.name = userCompanyName;
        user.address.street = userAddress;

        let self = this;
        this.users.forEach(function (value, index) {
          if((self.userIdToUpdate-1) === index){
            //Update the users Model
            self.users[index] = user;
          }
        });

        /*this.userService.updateUser(user).subscribe(successCode => {
          this.statusCode = successCode;
          console.log(this.statusCode);
          this.loadAllUsers();
          },
         errorCode => this.statusCode = errorCode);
          */
      });
    }

  }
  // delete User from the user modal
  deleteUser(userID){
    let deleteUserIndex = userID - 1,
        self = this;
    this.users.forEach(function (user, index) {
      user.id = index + 1;
      if(index === deleteUserIndex){
        self.users.splice(index, 1);
      }
  });

}

interface User{
  id:number,
  name:string,
  phone:number,
  username:string,
  website:string,
  company:Company,
  address:Address

}

interface Company{
  bs:string,
  catchPhrase:string,
  name:string
}

interface Address{
  city:string,
  geo:any,
  street:string,
  suite:string,
  zipcode:number
}
