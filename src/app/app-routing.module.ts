import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './frontoffice/footer/footer.component';
import { HeaderComponent } from './frontoffice/header/header.component';
import { LoginComponent } from './frontoffice/login/login.component';
import { RegisterComponent } from './frontoffice/register/register.component';
import { HomeComponent } from './frontoffice/home/home.component';
import { ProfileComponent } from './frontoffice/profile/profile.component';
import { DocumentCategoriesComponent } from './frontoffice/document-categories/document-categories.component';
import { EventsComponent } from './frontoffice/events/events.component';
import { BooksComponent } from './frontoffice/books/books.component';
import { BookDetailsComponent } from './frontoffice/book-details/book-details.component';
import { DashboardComponent } from './backoffice/dashboard/dashboard.component';
import { ComplaintComponent } from './frontoffice/complaint/complaint.component';
import { UserListComponent } from './backoffice/user-list/user-list.component';
import { UserAddComponent } from './backoffice/user-add/user-add.component';
import { UserDetailsComponent } from './backoffice/user-details/user-details.component';
import { UserEditComponent } from './backoffice/user-edit/user-edit.component';
import { EditProfileComponent } from './frontoffice/edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './frontoffice/delete-profile/delete-profile.component';
import { EventListComponent } from './backoffice/event-list/event-list.component';
import { EventDetailsComponent } from './backoffice/event-details/event-details.component';
import { EventEditComponent } from './backoffice/event-edit/event-edit.component';
import { EventAddComponent } from './backoffice/event-add/event-add.component';
import { ProfileEventListComponent } from './frontoffice/profile-event-list/profile-event-list.component';
import { EventinfoComponent } from './frontoffice/eventinfo/eventinfo.component';
import { ForgetPasswordComponent } from './frontoffice/forget-password/forget-password.component';
import { ResetPasswordComponent } from './frontoffice/reset-password/reset-password.component';
import { DeactivateComponent } from './backoffice/deactivate/deactivate.component';
import { EventCalendarComponent } from './frontoffice/event-calendar/event-calendar.component';
import { GetAllBooksComponent } from './frontoffice/get-all-books/get-all-books.component';
import { ExchangeFormComponent } from './frontoffice/exchange-form/exchange-form.component';
import { CompAddComponent } from './frontoffice/comp-add/comp-add.component';
import { CompEditComponent } from './frontoffice/comp-edit/comp-edit.component';
import { CompListComponent } from './frontoffice/comp-list/comp-list.component';
import { ModuleListComponent } from './frontoffice/modules/module-list/module-list.component';
import { ChatbotComponent } from './frontoffice/chatbot/chatbot.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { QuestionComponent } from './frontoffice/question/question.component';
import { WelcomeComponent } from './frontoffice/welcome/welcome.component';
import { LeaderboardComponent } from './frontoffice/leaderboard/leaderboard.component';
import { NotFoundComponent } from './frontoffice/not-found/not-found.component';
import { VideocallComponent } from './videocall/videocall.component';
import { GetAlllRevisionComponent } from './frontoffice/get-all-revision/get-alll-revision.component';
import { PomodoroTimerComponent } from './frontoffice/pomodor-timer/pomodoro-timer.component';
import { TaskListComponent } from './frontoffice/task-list/task-list.component';
import { RevisionComponent } from './frontoffice/revision copy/revision.component';
import { DocumentComponent } from './frontoffice/docments/document/document.component';
import { AddbuyComponent } from './frontoffice/docments/addbuy/addbuy.component';
import { MydocumentsComponent } from './frontoffice/docments/mydocuments/mydocuments.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent,},
  { path: 'documentCategories', component: DocumentCategoriesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'bookDetails', component: BookDetailsComponent },
  { path: 'complaint', component: ComplaintComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'addUser', component:UserAddComponent},
  { path: 'user-details/:userId', component:UserDetailsComponent},
  { path: 'editUser/:userId', component: UserEditComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'deleteprofile', component: DeleteProfileComponent },
  { path: 'editUser/:userId', component: UserEditComponent },
  { path: 'login/oauth2/code/facebook', component: LoginComponent },
  { path: 'ForgetPassword', component:ForgetPasswordComponent},
  { path: 'resetPassword', component:ResetPasswordComponent},
  { path: 'desactivate', component:DeactivateComponent},
  { path: 'Leaderboard', component:LeaderboardComponent},

  
  /////
  { path: 'eventList', component: EventListComponent },
  { path: 'listevent', component: EventListComponent },
  { path: 'event-details/:eventId', component: EventDetailsComponent },
  { path: 'editEvent/:eventId', component: EventEditComponent },
  { path: 'addEvent', component:EventAddComponent},
  { path: 'EventListUser', component:ProfileEventListComponent},
  { path: 'eventinfo/:eventId', component: EventinfoComponent },
  
  { path: 'calendar', component: EventCalendarComponent },
  
  { path: 'getallbooks', component: GetAllBooksComponent },
  { path: 'exchange-form/:id', component: ExchangeFormComponent }, 
  ////
  { path: 'addc', component: CompAddComponent },
  { path: 'editc/:id', component: CompEditComponent },
  { path: 'listc', component: CompListComponent },
  {path: 'modules', component:ModuleListComponent},
  {path: 'chatbot', component:ChatbotComponent},
  {path: 'stat', component:StatisticsComponent},
  {path: 'question', component:QuestionComponent},
  {path: 'welcome', component:WelcomeComponent},

////

{ path: 'video', component:VideocallComponent},
{path : 'getAllRevision', component:GetAlllRevisionComponent},
{ path: 'pomodoro', component: PomodoroTimerComponent },
  { path: 'taskList', component: TaskListComponent },
  { path: 'revision', component: RevisionComponent },


  /////
  { path: 'documents', component: DocumentComponent },
  {path: 'addb', component:AddbuyComponent},
  {path: 'mydocs', component:MydocumentsComponent},

  { path: '**', component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }