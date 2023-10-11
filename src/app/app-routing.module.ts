import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirsttaskComponent } from './firsttask/firsttask.component';
import { SecondtaskComponent } from './secondtask/secondtask.component';

const routes: Routes = [
  {
    path: 'firsttask',
    component: FirsttaskComponent,
  },
  {
    path: 'secondtask',
    component: SecondtaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
