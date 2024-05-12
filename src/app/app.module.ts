import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './frontoffice/register/register.component';
import { LoginComponent } from './frontoffice/login/login.component';
import { HomeComponent } from './frontoffice/home/home.component';
import { HeaderComponent } from './frontoffice/header/header.component';
import { FooterComponent } from './frontoffice/footer/footer.component';
import { ProfileComponent } from './frontoffice/profile/profile.component';
import { DocumentCategoriesComponent } from './frontoffice/document-categories/document-categories.component';
import { EventsComponent } from './frontoffice/events/events.component';
import { EventDetailsComponent } from './backoffice/event-details/event-details.component';
import { BooksComponent } from './frontoffice/books/books.component';
import { BookDetailsComponent } from './frontoffice/book-details/book-details.component';
import { ComplaintComponent } from './frontoffice/complaint/complaint.component';
import { DashboardComponent } from './backoffice/dashboard/dashboard.component';
import { SideBarComponent } from './backoffice/side-bar/side-bar.component';
import { TopBarComponent } from './backoffice/top-bar/top-bar.component';
import { UserListComponent } from './backoffice/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { UserAddComponent } from './backoffice/user-add/user-add.component';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { UserDetailsComponent } from './backoffice/user-details/user-details.component';
import { UserEditComponent } from './backoffice/user-edit/user-edit.component';
import { SocialLoginModule, SocialAuthServiceConfig , GoogleLoginProvider, FacebookLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { MatPaginatorModule } from '@angular/material/paginator';

import { ForgetPasswordComponent } from './frontoffice/forget-password/forget-password.component';
import { EditProfileComponent } from './frontoffice/edit-profile/edit-profile.component';
import { ProfileSideBarComponent } from './frontoffice/profile-side-bar/profile-side-bar.component';
import { DeleteProfileComponent } from './frontoffice/delete-profile/delete-profile.component';
import { EventEditComponent } from './backoffice/event-edit/event-edit.component';
import { EventListComponent } from './backoffice/event-list/event-list.component';
import { EventAddComponent } from './backoffice/event-add/event-add.component';
import { ProfileEventListComponent } from './frontoffice/profile-event-list/profile-event-list.component';
import { ProfileEventEditComponent } from './frontoffice/profile-event-edit/profile-event-edit.component';
import { EventinfoComponent } from './frontoffice/eventinfo/eventinfo.component';
import { ResetPasswordComponent } from './frontoffice/reset-password/reset-password.component';
import { StarRatingModule } from 'angular-star-rating';
import { IgcFormsModule } from 'igniteui-angular';
import { RecaptchaModule } from 'ng-recaptcha';
import { DeactivateComponent } from './backoffice/deactivate/deactivate.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventCalendarComponent } from './frontoffice/event-calendar/event-calendar.component';
import {provideAnimationsAsync} from'@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GetAllBooksComponent } from './frontoffice/get-all-books/get-all-books.component';
import { UpdateBookDialogComponent } from './update-book-dialog/update-book-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ExchangeFormComponent } from './frontoffice/exchange-form/exchange-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CompAddComponent } from './frontoffice/comp-add/comp-add.component';
import { CompEditComponent } from './frontoffice/comp-edit/comp-edit.component';
import { CompListComponent } from './frontoffice/comp-list/comp-list.component';
import { ChatbotComponent } from './frontoffice/chatbot/chatbot.component';
import { ModuleListComponent } from './frontoffice/modules/module-list/module-list.component';
import { ConfirmationDialogComponent } from './frontoffice/modules/confirmation-dialog/confirmation-dialog.component';
import { AddModuleDialogComponentComponent } from './frontoffice/modules/add-module-dialog-component/add-module-dialog-component.component';
import { QuestionComponent } from './frontoffice/question/question.component';
import { WelcomeComponent } from './frontoffice/welcome/welcome.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { ChangeBgDirective } from './frontoffice/change-bg.directive';
import { MatIconModule } from '@angular/material/icon';
import { LeaderboardComponent } from './frontoffice/leaderboard/leaderboard.component';
import { NotFoundComponent } from './frontoffice/not-found/not-found.component';
import { PopupComponent } from './frontoffice/popup/popup.component';
import { VideocallComponent } from './videocall/videocall.component';
import { TaskListComponent } from './frontoffice/task-list/task-list.component';
import { GetAlllRevisionComponent } from './frontoffice/get-all-revision/get-alll-revision.component';
import { PomodoroTimerComponent } from './frontoffice/pomodor-timer/pomodoro-timer.component';
import { RevisionComponent } from './frontoffice/revision copy/revision.component';


import { DocumentComponent } from './frontoffice/docments/document/document.component';
import { AddDocumentDialogComponent } from './frontoffice/docments/add-document-dialog/add-document-dialog.component';
import { GetDocumentByIdDialogComponent } from './frontoffice/docments/get-document-by-id-dialog/get-document-by-id-dialog.component';
import { ConfirmDialogComponent } from './frontoffice/docments/confirm-dialog/confirm-dialog.component';
import { EditDocumentDialogComponent } from './frontoffice/docments/edit-document-dialog/edit-document-dialog.component';
import { FileUploadComponent } from './frontoffice/docments/file-upload/file-upload.component';
import { PaymentComponent } from './frontoffice/docments/payment/payment.component';
import { CartDialogComponent } from './frontoffice/docments/cart-dialog/cart-dialog.component';
import {MatListModule} from '@angular/material/list';
import { AddbuyComponent } from './frontoffice/docments/addbuy/addbuy.component';
import { GetmybuysComponent } from './frontoffice/docments/getmybuys/getmybuys.component';
import { MydocumentsComponent } from './frontoffice/docments/mydocuments/mydocuments.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    DocumentCategoriesComponent,
    EventsComponent,
    EventDetailsComponent,
    BooksComponent,
    BookDetailsComponent,
    ComplaintComponent,
    DashboardComponent,
    SideBarComponent,
    TopBarComponent,
    UserListComponent,
    UserAddComponent,
    UserDetailsComponent,
    UserEditComponent,
    ForgetPasswordComponent,
    EditProfileComponent,
    ProfileSideBarComponent,
    DeleteProfileComponent,
    EventEditComponent,
    EventListComponent,
    EventAddComponent,
    EventDetailsComponent,
    ProfileEventListComponent,
    ProfileEventEditComponent,
    EventinfoComponent,
    ResetPasswordComponent,
    DeactivateComponent,
    GetAllBooksComponent,
    UpdateBookDialogComponent,
    EventCalendarComponent,
    ExchangeFormComponent,
    CompAddComponent,
    CompEditComponent,
    CompListComponent,
    ChatbotComponent,
    ModuleListComponent,
    ConfirmationDialogComponent,
    AddModuleDialogComponentComponent,
    QuestionComponent,
    WelcomeComponent,
    StatisticsComponent,
    ChangeBgDirective,
    LeaderboardComponent,
    NotFoundComponent,
    PopupComponent,
    RevisionComponent,
    GetAlllRevisionComponent,
    VideocallComponent,
    PomodoroTimerComponent,
    TaskListComponent,
    DocumentComponent,
    AddDocumentDialogComponent,
    GetDocumentByIdDialogComponent,
    ConfirmDialogComponent,
    EditDocumentDialogComponent,
    FileUploadComponent,
    PaymentComponent,
    CartDialogComponent,
    AddbuyComponent,
    GetmybuysComponent,
    MydocumentsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    StarRatingModule.forRoot(),
    IgcFormsModule,
    RecaptchaModule,
    LeafletModule,
    MatPaginatorModule,
    FullCalendarModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QRCodeModule,  
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatIconModule ,
    MatListModule

    ],
    
  
  providers: [DatePipe,httpInterceptorProviders, provideAnimationsAsync(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '88232353192-lea6fpg1c708kglk86d0mjpr08omf3c6.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('391140843744729')
          }
          
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  
  
  
  
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
