import { FirebaseService } from './../../service/firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Gallery,GalleryComponent,GalleryRef} from 'ng-gallery';

@Component({
  selector: 'app-testpicture',
  templateUrl: './testpicture.component.html',
  styleUrls: ['./testpicture.component.css']
})
export class TestpictureComponent implements OnInit {
 galleryId="mixedExample";
 user$:any[]=[];
 imgURL:string;
 description:string;
@ViewChild(GalleryComponent) gallery:GalleryComponent
  constructor(
    private service:FirebaseService) { }

  ngOnInit(): void {
    
    this.service.getSelecteddata('dl').subscribe(res=>{
       this.user$=res.map((e:any)=>{
         return {
          description:e.payload.doc.data()['description'],
          imgURL:e.payload.doc.data()['imgURL']
         }
       });
        this.user$.forEach(e=>{
          console.log(e);
          this.gallery.addImage({src:e.imgURL,thumb:e.imgURL})
        })
    })
    // galleryRef.addImage({
    //   src: 'IMAGE_URL',
    //   thumb: '(OPTIONAL)IMAGE_THUMBNAIL_URL',
    //   title: 'Some title'
    // });
  }

}
