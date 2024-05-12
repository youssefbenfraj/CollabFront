import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len:number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1]; //Cela permet de séparer la partie de l'URL contenant les paramètres de requête.
//  La partie après le point d'interrogation contient les paramètres de requête de l'URL.
  return new URLSearchParams(urlStr);
}
 @Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.b.html',
  styleUrl: './videocall.component.css'
})
export class VideocallComponent implements OnInit,AfterViewInit {
@ViewChild('root')
root!:ElementRef;

  title = '';
  audioContext: AudioContext | undefined;
  userData: any; // 
  currentUser: { id: number } | null = null;   

  constructor(private authService: AuthService) {}
  
  ngAfterViewInit(): void {
console.log("afterviewinitshouldexecuteafterinit");

    const roomID = getUrlParams().get('roomID') || randomID(5);
    const appID = 1438132389; //todo
    const serverSecret = "de1c20d6a70f5f13de7ed94167f5995b";
    debugger
    const userName = this.userData.username;
    const idUser = this.userData.idUser;
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomID,  
      idUser.toString(),
      userName);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
      // Start a call.
      zp.joinRoom({
        container: this.root.nativeElement,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
   }


   ngOnInit(): void {
      this.getCurrentUser()
   }

getCurrentUser(): void {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('current user:', this.userData);
      
      if ('idUser' in this.userData) {
          const userId = this.userData.idUser; // Extracting idUser from userData
          console.log('User ID:', userId);
          // Assigning idUser to currentUser.id
          this.currentUser = { id: userId }; // assuming currentUser is of type User
      } else {
          console.log('No user ID found in userData');
      }
  } else {
      console.log('No user data found in localStorage');
  }
}
  
}