import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) {}
  getAllUsers() {
    return this.http.get("http://localhost:4000/api/getAllUsers");
  }

  createNewUser(userName : string) {
    return this.http.post("http://localhost:4000/api/newUser", { name : userName });
  }

  getParticularUser(id: string) {
    return this.http.get(`http://localhost:4000/api/getUser/${id}`);
  }

  updateUser(id: string, userName : string) {
      return this.http.put(`http://localhost:4000/api/editUser/${id}`, { name : userName });
  }

  getAllp5History(id: string) {
    return this.http.get(`http://localhost:4000/api/getP5History/${id}`);
  }

  getAllRewardsHistory(id: string) {
    return this.http.get(`http://localhost:4000/api/getRewardsHistory/${id}`);
  }

  createNewrewards(obj : any) {
    return this.http.post("http://localhost:4000/api/createRewards", obj);
  }

  deleteRewards(id : string) {
    return this.http.delete(`http://localhost:4000/api/deleteP5History/${id}`);
  }
}
