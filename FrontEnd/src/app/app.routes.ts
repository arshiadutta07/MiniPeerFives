import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { P5HistoryComponent } from './components/p5-history/p5-history.component';
import { RewardsHistoryComponent } from './components/rewards-history/rewards-history.component';
import { NewRewardComponent } from './components/new-reward/new-reward.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'new', component: NewUserComponent },
    { path: ':id', component: NewUserComponent },
    { path: ':id/p5', component: P5HistoryComponent },
    { path: ':id/rewards', component: RewardsHistoryComponent },
    { path: ':id/rewards/new', component: NewRewardComponent }
];



