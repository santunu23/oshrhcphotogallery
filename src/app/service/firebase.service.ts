import { Injectable } from '@angular/core';
import { AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor( public db: AngularFirestore, 
    private asstorage:AngularFireStorage,) { }
  getData(){
    return this.db.collection('oshrhcphotogallery').snapshotChanges();
  }
  getSelecteddata(activityname:string){
    return this.db.collection('oshrhcphotogallery',ref=>ref.where('category','==',activityname)).snapshotChanges();
  }
  EditData(data:any){
    return this.db.collection("oshrhcphotogallery").doc(data.id).update({
      "description":data.descriptiondata,
      "category":data.categorydata
  });
  }
  uploadData(randomID:any,data:any,imgurl:any){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let newdate = day + "/" + month + "/" + year;
     function formatAMPM(date:any) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
       return [newdate,strTime]
    }
    return this.db.collection('/oshrhcphotogallery').add({
     description:data.description,
     category:data.category,
     imgURL:imgurl,
     randomId:randomID,
     createdate:formatAMPM(new Date)[0],
     createtime:formatAMPM(new Date)[1],
   })
  }

  deleteData(res:any){
    this.db.doc('oshrhcphotogallery/'+res.photoId).delete().then(e=>{
      this.asstorage.ref(res.randomId).delete().subscribe(e=>{
        return e;
      })
    })
    
  }
}
