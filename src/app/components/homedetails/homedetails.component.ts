import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Observable } from 'rxjs';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/firestore';
// interface Item{
//   imageSrc:string,
//   imageAlt:string
// }
  interface record{
    category:string,
    description:string,
    imgURL:string,
  }
@Component({
  selector: 'app-homedetails',
  templateUrl: './homedetails.component.html',
  template:`<app-home [messageEvent]="receiveMessage[$event]"></app-home>`,
  styleUrls: ['./homedetails.component.css']
})
export class HomedetailsComponent implements OnInit {
//  datas:Item=[
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     imageAlt: '1'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1642670310920-6f4e3a3adee3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
//     imageAlt: '2'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1642570517818-99c0fd6f0349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//     imageAlt: '3'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     imageAlt: '4'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1642618215095-3523a9a36893?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
//     imageAlt: '5'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1642628658566-1db49cadf78c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
//     imageAlt: '6'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     imageAlt: '7'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=975&q=80',
//     imageAlt: '8'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
//     imageAlt: '9'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     imageAlt: '10'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     imageAlt: '11'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     imageAlt: '12'
//   },
//   {
//     imageSrc: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
//     imageAlt: '13'
//   }
// ];
// previewImage=false;
// showMask=false;
// currentLightboxImage:Item=this.datas[0];
// currentIndex=0;
// controls=true;
// showCount=false;
// totalImageCount=0;
users$: any[] = [];  
id:string;
category:string;
description:string;
imgURL:string;
previewImage=false;
showMask=false;
currentLightboxImage:record=this.users$[0]
currentIndex=0;
controls=true;
showCount=false;
totalImageCount=0;
images: GalleryItem[];
constructor(
    private cookieservice:CookieService,
    private service:FirebaseService,
    public db: AngularFirestore,
    private router:Router) { }

  ngOnInit(): void {
    if(!this.cookieservice.get('activityname')){
        this.router.navigateByUrl('home');
    }else{
        let activityname=this.cookieservice.get('activityname');
        // this.service.getSelecteddata(activityname).subscribe({
        //  next:(res)=>{
        //        this.users$=res.map((e:any)=>{
        //          console.log(e.payload.doc.data()['category']);
        //         //  return{
        //         //   category:e.payload.doc.data()['category'],
        //         //   description:e.payload.doc.data()['description'],
        //         //   imgURL:e.payload.doc.data()['imgURL'],
        //         //   console.log(this.category)
        //         // }
        //      })  
        //   },
        //   error:()=>{
        //     console.log("Error while fetching data")
        //   }
        // });
       this.db.collection('oshrhcphotogallery',ref=>ref.where('category','==',activityname)).snapshotChanges()













        // this.service.getSelecteddata(activityname).subscribe({
          
        //   next:(res)=>{
              
        //        this.users$=res.map((e:any)=>{
        //          return{
        //           category:e.payload.doc.data()['category'],
        //           description:e.payload.doc.data()['description'],
        //           imgURL:e.payload.doc.data()['imgURL'],
        //          }
        //      })  
        //   },
        //   error:()=>{
        //     console.log("Error while fetching data")
        //   }
        // })
    }
  }
  onPreviewImage(index: number): void{
    //show image
    this.showMask=true;
    this.previewImage=true;
    this.currentIndex=index;
    this.currentLightboxImage=this.users$[index];
  }
}
