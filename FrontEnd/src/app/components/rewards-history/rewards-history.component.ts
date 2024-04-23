import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCallService } from '../../services/api-call.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rewards-history',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './rewards-history.component.html',
  styleUrl: './rewards-history.component.css'
})

export class RewardsHistoryComponent {
  rewardsHistoryData : any[] = [];
  id : string = "";
  rewardsBalance : any;

  constructor(private apiCallService: ApiCallService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.id = id
    }
    this.rewardsHistory()
  }

  rewardsHistory() {
    forkJoin([
      this.apiCallService.getAllRewardsHistory(this.id),
      this.apiCallService.getParticularUser(this.id)
    ]).subscribe({
      next: (results: any[]) => {
        const rewardsHistoryResult = results[0];
        this.rewardsHistoryData = rewardsHistoryResult.data;
        
        const balance = results[1].data.RewardBalance;
        this. rewardsBalance = balance;
      },
      error: (error) => console.log("Error", error)
    });
  }
}
