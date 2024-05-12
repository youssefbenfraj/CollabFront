import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'body', template: '<router-outlet></router-outlet>',

})
export class AppComponent {
  title = 'espritcollabfront';
  user: any;
  loggedIn: any;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
}
