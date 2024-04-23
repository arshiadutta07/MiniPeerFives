import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userDetails : any[] = []

  constructor(private apiCallService: ApiCallService) { }

  ngOnInit() {
    this.getAllUserDetails()
  }

  getAllUserDetails() {
    this.apiCallService.getAllUsers().subscribe({
      next:(data:any) => {
        this.userDetails = data.data;
      },
      error:(error)=>console.log("Error",error)
    })
  }
}
