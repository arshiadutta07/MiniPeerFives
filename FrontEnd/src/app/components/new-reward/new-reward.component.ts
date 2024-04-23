import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

interface newReward {
  points : number,
  givenBy : string,
  givenTo : string
}

@Component({
  selector: 'app-new-reward',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './new-reward.component.html',
  styleUrl: './new-reward.component.css'
})


export class NewRewardComponent {
  users : any[] = [];
  id : string = "";
  rewardsBalance : any;
  currentUserP5Balance : any;
  selectedRecipient: string = '';
  amount : any;

  constructor(private apiCallService: ApiCallService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.id = id
    }
    this.getAllData();
  }

  getAllData() {
    forkJoin([
      this.apiCallService.getAllUsers(),
      this.apiCallService.getParticularUser(this.id)
    ]).subscribe({
      next: (results: any[]) => {
        const users = results[0].data.filter((user : any) => user._id !== this.id);
        this.users = users;
        
        const balance = results[1].data.P5Balance;
        this.currentUserP5Balance = balance;
      },
      error: (error) => console.log("Error", error)
    });
  }

  submitForm() {
    const reward : newReward = {
      points: this.amount,
      givenBy : this.id,
      givenTo : this.selectedRecipient
    };

    this.apiCallService.createNewrewards(reward).subscribe({
      next:(data:any) => {
        alert("Reward Created Successfully");
        this.router.navigate(['/']);
      },
      error:(error)=>console.log("Error",error)
    })
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
