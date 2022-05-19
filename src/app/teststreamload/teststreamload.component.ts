// import { FirebaseService } from 'src/app/service/firebase.service';
// import { Component, OnInit } from '@angular/core';
// import { GalleryItem,ImageItem } from 'ng-gallery';
// import { Observable,map } from 'rxjs';
// import { AngularFirestore} from '@angular/fire/firestore';
// @Component({
//   selector: 'app-teststreamload',
//   templateUrl: './teststreamload.component.html',
//   styleUrls: ['./teststreamload.component.css']
// })
// export class TeststreamloadComponent implements OnInit {
//   image$:Observable<GalleryItem[]>
//   constructor(private service:FirebaseService,
//     private db:AngularFirestore) { }

//   ngOnInit(): void {
//   //  this.image$=this.service.getSelecteddata('dl').subscribe(res=>res.map((e:any)=>{
//   //    src:e.payload.doc.data()['description']
//   //   }) );
//    this.image$=this.db.collection('oshrhcphotogallery',ref=>ref.where('category','==','db')).snapshotChanges();
//    this.image$.pipe(map(
//      res=> console.log(res)
//      //>new ImageItem({src:res.imgURL})
   
   
//    ))
//   console.log(this.image$);
//    //.pipe(map(res=> new ImageItem({ src:res.imgURL,thumb:res.imgURL})))
//   }

// }

import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';
import { GalleryItem, ImageItem,GalleryRef ,Gallery} from 'ng-gallery';
import { Observable,map, interval } from 'rxjs';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/firestore';
import { thumbnailsSettings } from 'lightgallery/plugins/thumbnail/lg-thumbnail-settings';
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
  selector: 'app-teststreamload',
  templateUrl: './teststreamload.component.html',
  styleUrls: ['./teststreamload.component.css']
})
export class TeststreamloadComponent implements OnInit {
users$: any[] = [];  
id:string;
category:string;
description:string;
imgURL:string;
previewImage=false;
showMask=false;
currentLightboxImage:record=this.users$[0]
galleryId="mixedExample";
constructor(
    private cookieservice:CookieService,
    private service:FirebaseService,
    private gallery:Gallery,
    private router:Router,
    private spinner:NgxSpinnerService) { }

    ngOnInit(): void {
        //let activityname=this.cookieservice.get('activityname');
        let activityname='dl';
        this.spinner.show();
        if(!this.cookieservice.get('activityname')){
          this.router.navigateByUrl('home');
        }else{
          const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
          this.service.getSelecteddata(activityname).subscribe(res=>{
          this.users$=res.map((e:any)=>{
           galleryRef.addImage({
              src: e.payload.doc.data()['imgURL'],
              thumb: e.imgURL,
              title: e.payload.doc.data()['description'],
            });
          //  return {
          //   description:e.payload.doc.data()['description'],
          //   imgURL:e.payload.doc.data()['imgURL']
          //  }
         });
          // this.users$.forEach(e=>{
          //   this.spinner.hide();
          //   galleryRef.addImage({
          //     src: e.imgURL,
          //     thumb: e.imgURL,
          //     title: e.description,
          //   });
          //   galleryRef.play(3000);
          // });
      })
        }
    }
    goback(){
      if(this.cookieservice.get('activityname')){
        this.cookieservice.delete('activityname');
      }
      this.router.navigateByUrl('home');
    }
}

