import { Component,OnInit } from '@angular/core';
import { ChatbotService,Message } from '../../chatbot.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages:Message[]=[];
value:string ='';
dialogInfo:any;
constructor(public chatbotService:ChatbotService){}
ngOnInit(): void {
  this.chatbotService.conversation.subscribe((val)=>{
    this.messages=this.messages.concat(val);
  });
}
sendMessage(){
this.chatbotService.getBotAnswer(this.value);
this.value=''

}

}
