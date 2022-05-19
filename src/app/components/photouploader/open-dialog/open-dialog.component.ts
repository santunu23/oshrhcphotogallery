import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.css']
})
export class OpenDialogComponent implements OnInit {
  buttonname:string ="Save";
  headername:string="Add"
  photogalleryForm !: FormGroup;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  ref:any;
  task:any;
  randomId= Math.random().toString(36).substring(2);
 
  constructor(
    private formBuilder:FormBuilder,
    private firebaseservice:FirebaseService,
    private spinner:NgxSpinnerService,
    private dialogref:MatDialogRef<OpenDialogComponent>,
    private asstorage:AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public editData:any
    ) { }

  ngOnInit(): void {
    this.photogalleryForm=this.formBuilder.group({
      category : [' ',Validators.required],
      description: [' ',Validators.required],
      socialhubname: [' ',Validators.required],
    });
    if(this.editData){
      console.log(this.editData);
      this.buttonname="Update";
      this.headername="Edit"
      this.photogalleryForm.controls['category'].setValue(this.editData.category);
      this.photogalleryForm.controls['description'].setValue(this.editData.description);
      this.photogalleryForm.controls['socialhubname'].disable();
      
      }

  }
  addphoto(){
    if(!this.editData){
      this.spinner.show();
      this.firebaseservice.uploadData(this.randomId,this.photogalleryForm.value,URL).then(e=>{
         this.spinner.hide();
         this.photogalleryForm.reset();
         this.dialogref.close('Save');
         alert("Photo uploaded successfully.")
      });
    }else{
        this.updateData();
    }

  }
   
   upload(event:Event){
    this.spinner.show();
    this.ref = this.asstorage.ref(this.randomId);
    this.task = this.ref.put((event.target as HTMLInputElement).files[0]).then((res:any)=>{
      if(res){
      const downloadURL=this.ref.getDownloadURL().subscribe((url:any)=>{
        URL=url;
        console.log(URL);
        this.spinner.hide();
      })
      }
    }).catch((error:any)=>{
      console.log(error); 
   })
  }
  updateData(){
    this.spinner.show();
    let res={
        categorydata:this.photogalleryForm.controls['category'].value,
        descriptiondata:this.photogalleryForm.controls['description'].value,
        id:this.editData.photoId
    }
    this.firebaseservice.EditData(res).then(e=>{
      this.spinner.hide();
      this.photogalleryForm.reset();
      this.dialogref.close('update');
      alert("Successfull");
    })
  }
}
