import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  userName : string = "";
  isNewUser: boolean = true;
  userId : string = "";
  showp5Balance : boolean = false;
  showRewardBalance : boolean = false;

  constructor(private apiCallService: ApiCallService, private router:Router, private route: ActivatedRoute)  {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNewUser = !this.route.snapshot.paramMap.get('id');

    if(id) {
      this.userId = id;
    }
    if (!this.isNewUser) {
      this.showp5Balance = true;
      this.showRewardBalance = true;

      this.apiCallService.getParticularUser(this.userId).subscribe({
        next:(data:any) => {
          this.userName = data.data.name;
        },
        error:(error)=>console.log("Error",error)
      })
    }
    else {
      this.showp5Balance = false;
      this.showRewardBalance = false;
    }
  }

  saveUser() {
    if(!this.userName) {
      alert("Please add a valid User Name");
    }

    if(this.isNewUser){
      this.apiCallService.createNewUser(this.userName).subscribe({
        next:(data:any) => {
          alert(`User - ${data.data.name} Created Successfully`);
        },
        error:(error)=>console.log("Error",error)
      })
    }
    else {
      this.apiCallService.updateUser(this.userId, this.userName).subscribe({
        next:(data:any) => {
          alert(`User - ${data.data.name} Updated Successfully`);
        },
        error:(error)=>console.log("Error",error)
      })
    }

    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
