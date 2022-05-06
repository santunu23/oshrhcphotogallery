import { NgxSpinnerService } from 'ngx-spinner';

import { MatDialog } from '@angular/material/dialog';
import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { FirebaseService } from 'src/app/service/firebase.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface UserData {
  id: string;
  description: string;
  category: string;
  randomId: string;
}

@Component({
  selector: 'app-photouploader',
  templateUrl: './photouploader.component.html',
  styleUrls: ['./photouploader.component.css']
})
export class PhotouploaderComponent implements OnInit {
  users$: any[] = [];
  displayedColumns: string[] = ['description', 'category','date','Action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private service:FirebaseService) { }

  ngOnInit(): void {
    this.getPhotodata();
  }
  openDialog(){
    this.dialog.open(OpenDialogComponent,{
      width:'30%',
    });
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getPhotodata(){
      this.service.getData().subscribe({
        next:(res)=>{
          this.users$=res.map((e:any)=>{
            console.log(e.payload.doc.data()['date'])
            return{
              photoId: e.payload.doc['id'],
              randomId:e.payload.doc.data()['randomId'],
              category:e.payload.doc.data()['category'],
              description:e.payload.doc.data()['description'],
              date:e.payload.doc.data()['createdate']
            }
          });
          
          this.dataSource=new MatTableDataSource(this.users$);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort
        },
        error:(error:any)=>{
          alert("Error,contact with your admin")
        }

      })
  }
  editProduct(row:any){
    console.log(row);
    this.dialog.open(OpenDialogComponent,{
      width:'30%',
      data:row
    })
  }
  deleteProduct(res:any){
    this.spinner.show();
    this.service.deleteData(res);
    this.spinner.hide();
  }
}
