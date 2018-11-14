import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AllRequestsComponent } from './all-requests/all-requests.component';
import { SendRequestComponent } from './send-request/send-request.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import {
  MDBBootstrapModule,
  ButtonsModule,
  CarouselModule,
  ChartsModule,
  CollapseModule,
  DropdownModule,
  InputsModule,
  ModalModule,
  WavesModule,
  PopoverModule,
  NavbarModule,
  CardsFreeModule,
  TooltipModule
} from 'angular-bootstrap-md';
import { DataService } from './services/data.service';
import { SampleService } from './services/sample.service';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from 'src/app/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AllRequestsComponent,
    SendRequestComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // firebase
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),

    NotifierModule.withConfig({
      // Custom options in here
    }),

    // MDB modules free
    ButtonsModule,
    CarouselModule.forRoot(),
    ChartsModule,
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),
    InputsModule.forRoot(),
    ModalModule.forRoot(),
    NavbarModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    WavesModule.forRoot(),
    CardsFreeModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [DataService, SampleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
