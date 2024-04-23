import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCallService } from '../../services/api-call.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-p5-history',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './p5-history.component.html',
  styleUrl: './p5-history.component.css'
})


export class P5HistoryComponent {

  p5HistoryData : any[] = [];
  id : string = "";
  p5Balance : any;

  constructor(private apiCallService: ApiCallService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.id = id
    }
    this.p5History()
  }

  p5History() {
    forkJoin([
      this.apiCallService.getAllp5History(this.id),
      this.apiCallService.getParticularUser(this.id)
    ]).subscribe({
      next: (results: any[]) => {
        const p5HistoryResult = results[0];
        this.p5HistoryData = p5HistoryResult.data;
        
        const balance = results[1].data.P5Balance;
        this.p5Balance = balance;
      },
      error: (error) => console.log("Error", error)
    });
  }

  delete(p5Id : string) {
    this.apiCallService.deleteRewards(p5Id).subscribe({
      next:(data:any) => {
        alert("Reward Deleted Successfully");
        this.router.navigate(['/']);
      },
      error:(error)=>console.log("Error",error)
    })
  }
}
