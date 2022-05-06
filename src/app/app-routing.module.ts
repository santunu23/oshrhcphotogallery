import { TestpictureComponent } from './components/testpicture/testpicture.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotouploaderComponent } from './components/photouploader/photouploader.component';
import { HomeComponent } from './components/home/home.component';
import { HomedetailsComponent } from './components/homedetails/homedetails.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'homedetails',component:HomedetailsComponent},
  {path:'photouploader',component:PhotouploaderComponent},
  {path:'testpicture',component:TestpictureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
