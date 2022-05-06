import { AngularFireStorage } from '@angular/fire/storage';
import { Observable,map } from 'rxjs';
import { FirebaseService } from './../../service/firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Gallery, GalleryComponent, GalleryRef, GalleryItem,ImageItem } from 'ng-gallery';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/firestore';
 
@Component({
  selector: 'app-testpicture',
  templateUrl: './testpicture.component.html',
  styleUrls: ['./testpicture.component.css'],

  
})
export class TestpictureComponent implements OnInit {
 galleryId="mixedExample";
 user$:any[]=[];
 imgURL:string;
 description:string;
  constructor(
    private db:AngularFirestore,
    private gallery:Gallery,
    private service:FirebaseService) { }

  ngOnInit(): void {
    //Working code

    // this.service.getSelecteddata('dl').subscribe(res=>{
    //    this.user$=res.map((e:any)=>{
    //      return {
    //       description:e.payload.doc.data()['description'],
    //       imgURL:e.payload.doc.data()['imgURL']
    //      }
    //    });
    //     this.user$.forEach(e=>{
    //       console.log(e);
    //       this.gallery.addImage({src:e.imgURL,thumb:e.imgURL})
    //     });
    // })
    // galleryRef.addImage({
    //   src: 'IMAGE_URL',
    //   thumb: '(OPTIONAL)IMAGE_THUMBNAIL_URL',
    //   title: 'Some title'
    // });
    
    //Ending of working code.
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
        this.service.getSelecteddata('dl').subscribe(res=>{
       this.user$=res.map((e:any)=>{
         return {
          description:e.payload.doc.data()['description'],
          imgURL:e.payload.doc.data()['imgURL']
         }
       });
        this.user$.forEach(e=>{
          console.log(e);
          galleryRef.addImage({
            src: e.imgURL,
            thumb: e.imgURL,
            title: e.description
          });
        });
    })




    
  }

}
