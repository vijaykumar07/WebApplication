import { Injectable } from '@angular/core';

import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class UserService {

  constructor(public http: Http) {
    console.log("data service connected");
   }

   getAllUsers(){
    return this.http.get("https://jsonplaceholder.typicode.com/users").map(Response => Response.json())
   }

   getUserByID(userID){
    return this.http.get("https://jsonplaceholder.typicode.com/users/"+userID).map(Response => Response.json())
   }

   updateUser(user){
    let ctHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: ctHeaders });

    return this.http.put("https://jsonplaceholder.typicode.com/users/"+user.id, user, options).map(Response => Response.status)

   }

}
