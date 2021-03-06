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
  selector: 'app-homedetails',
  templateUrl: './homedetails.component.html',
  template:`<app-home [messageEvent]="receiveMessage[$event]"></app-home>`,
  styleUrls: ['./homedetails.component.css']
})
export class HomedetailsComponent implements OnInit {
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
        let activityname=this.cookieservice.get('activityname');
        this.spinner.show();
        if(!this.cookieservice.get('activityname')){
          this.router.navigateByUrl('home');
        }else{
          const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
          this.service.getSelecteddata(activityname).subscribe(res=>{
          res.map((e:any)=>{  
            console.log(e.payload.doc.data());
            // this.spinner.hide();
            //  galleryRef.addImage({
            //   src: e.payload.doc.data()['imgURL'],
            //   thumb: e.payload.doc.data()['imgURL'],
            //   title: e.payload.doc.data()['description'],
            // });

          //  return {
          //   description:e.payload.doc.data()['description'],
          //   imgURL:e.payload.doc.data()['imgURL']
          //  }
         }
         );
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
