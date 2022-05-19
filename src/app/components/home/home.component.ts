import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner:NgxSpinnerService,
    private cookieservice:CookieService) { }
  message:string="Hello World";
  @Output() messageEvent=new EventEmitter<string>();
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000);
  }
  details(itemname:string){
    if(this.cookieservice.get('activityname')){
      this.cookieservice.delete('activityname');
    }
    this.cookieservice.set('activityname',itemname,{expires:2,sameSite: 'Lax'});
    this.router.navigateByUrl('homedetails');

  }
}
