import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AuthService } from '../services/auth.service';
 @Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrl: './videocall.component.css'
})
export class VideocallComponent implements OnInit {
  title = '';
  audioContext: AudioContext | undefined;
  userData: any;
  currentUser: { id: number } | null = null;   

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.init();
    this.getCurrentUser();
    await this.checkAndRequestPermissions();  // Ensure permissions are granted

  }

 
  async checkAndRequestPermissions(): Promise<void> {
    try {
        const constraints = { video: true, audio: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('Permissions granted and devices found');
        stream.getTracks().forEach(track => track.stop());
    } catch (error: unknown) {
        if (error instanceof Error && error.name === "NotFoundError") {
            alert('No media devices found. Please ensure your camera and microphone are properly connected.');
        } else {
            alert('Error accessing your devices. Please check your device settings and allow access.');
        }
    }
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

  
  randomID(len: number): string {
    let result = '';
    if (result) return result;
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  getUrlParams(url: string): { [key: string]: string } {
    const urlStr = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(urlStr);
    const result: { [key: string]: string } = {};
    urlSearchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  

 
  async init(): Promise<void> {
    console.log('init works');
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      console.error('No user data available');
      return;
    }
  debugger
    const userData = JSON.parse(userDataString);
    const roomID = this.getUrlParams(window.location.href)['roomID'] || this.randomID(5);
    const userID = userData.idUser;  // Using 'idUser' directly
    const userName = userData.userName;  // Using 'userName' directly
  
    const zp = (ZegoUIKitPrebuilt.create as any)({
      appID: 1484647939,
      userID: userID.toString(),
      userName: userName,
      roomID: roomID
    });
    

    zp.joinRoom({
      container: document.getElementById('app'),
      maxUsers: 4,
      branding: {
        logoURL: 'https://www.zegocloud.com/_nuxt/img/zegocloud_logo_white.ddbab9f.png',
      },
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      }
    });
  }


  startCall() {
    debugger
    // User interaction has occurred, now create or resume AudioContext
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    // Check if state is suspended (this happens with autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        console.log('Playback resumed successfully');
      });
    }

    this.initCall();
  }

  initCall() {
    // Initialize your call setup here
    console.log('Call initialized');
    //are you missing some code here?
    // or that's it ? gimme a sec ama do something on my laptop 
    // Assuming ZegoUIKitPrebuilt or similar is setup here
  }
  
}