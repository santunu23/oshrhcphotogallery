

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PhotouploaderComponent} from './components/photouploader/photouploader.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { OpenDialogComponent } from './components/photouploader/open-dialog/open-dialog.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './components/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { HomedetailsComponent } from './components/homedetails/homedetails.component';
import { GalleryModule } from  'ng-gallery';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightgalleryModule } from 'lightgallery/angular';
import { HeaderComponent } from './components/header/header.component';
import { TeststreamloadComponent } from './teststreamload/teststreamload.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotouploaderComponent,
    OpenDialogComponent,
    HomeComponent,
    HomedetailsComponent,
    HeaderComponent,
    TeststreamloadComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GalleryModule,
    LightgalleryModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule
  ],
  providers: [CookieService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
