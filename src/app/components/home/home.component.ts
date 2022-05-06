import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private router:Router,
    private cookieservice:CookieService) { }
  message:string="Hello World";
  @Output() messageEvent=new EventEmitter<string>();
  ngOnInit(): void {
  }
  details(itemname:string){
    if(this.cookieservice.get('activityname')){
      this.cookieservice.delete('activityname');
    }
    this.cookieservice.set('activityname',itemname);
    this.router.navigateByUrl('homedetails');

  }
}
