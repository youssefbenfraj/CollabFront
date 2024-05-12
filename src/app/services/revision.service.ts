import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revision } from '../../models/revision.model';
import { Pomodoro } from '../../models/pomodoro.model';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  private baseUrl = 'http://192.168.146.137:8087';  

  constructor(private http: HttpClient) { }
//avant sans useId
  addRevision1(revision: Revision): Observable<Revision> {
    return this.http.post<Revision>(`${this.baseUrl}/addRevision`, revision);
  }

  getRevisionById(id: number): Observable<Revision> {
    return this.http.get<Revision>(`${this.baseUrl}/getRevisionById/${id}`);
  }

  getAllRevisions(): Observable<Revision[]> {
    return this.http.get<Revision[]>(`${this.baseUrl}/getAllRV`);
  }
  getAllRevisions1(userId: number): Observable<Revision[]> {
    return this.http.get<Revision[]>(`${this.baseUrl}/getAllRV/${userId}`);
  }
  getRevisionsByUserId1(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
  //getrvbyuserid
  getRevisionsByUserId(userId: number): Observable<Revision[]> {
    const url = `${this.baseUrl}/userRv/${userId}`;
    return this.http.get<Revision[]>(url);
  }
  deleteRevision(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteRV/${id}`);
  }

  updateRevision(id: number, revision: Revision): Observable<Revision> {
    return this.http.put<Revision>(`${this.baseUrl}/updateRV/${id}`, revision);
  }
  addRevisionid(revisionData: { [key: string]: any }, idUser: number): Observable<any> {
    const formData: FormData = new FormData();
    
    Object.entries(revisionData).forEach(([key, value]) => {
     /* if (key === 'image') {
        formData.append('file', value, value.name); // Assuming 'image' is the key for the image file
      } else {
        formData.append(key, value); // Append other form data
      } */
      formData.append(key, value); // Append other form data
    });
    
    formData.append('idUser', idUser.toString()); // Corrected here
    
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWhtYSIsImlhdCI6MTcxNDk0MTAwNCwiZXhwIjoxNzE1ODA1MDA0fQ.jiHj5gnagNGRCuIySfipNTl8QaM5tZWrPaX_KAawjus'; // Replace 'your-auth-token' with the actual token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    //return this.http.post<any>(`${this.baseUrl}/addEvent`, formData, { headers: headers });
    return this.http.post<any>(`${this.baseUrl}/addRevision`, revisionData, { headers: headers });
  }
  getAllRevisionsForUser(userId: number): Observable<Revision[]> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWhtYSIsImlhdCI6MTcxNDk0MTAwNCwiZXhwIjoxNzE1ODA1MDA0fQ.jiHj5gnagNGRCuIySfipNTl8QaM5tZWrPaX_KAawjus'; // Replace 'your-auth-token' with the actual token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Revision[]>(`${this.baseUrl}?idUser=${userId}/userRV`, { headers: headers });
  }
    // Méthode pour récupérer toutes les révisions pour un utilisateur donné
    getAllRevisionsForUser2(userId: number): Observable<Revision[]> {
      const params = new HttpParams().set('userId', userId.toString());

      
      return this.http.get<Revision[]>(`${this.baseUrl}/userRV`, { params: params });
    }
    
  //rv avec userId
  addRevision(revisionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addRevision`, revisionData);
  }
  //pmomodoro
  createOrUpdatePomodoro1(pomodoro: Pomodoro): Observable<Pomodoro> {  
    return this.http.post<Pomodoro>(`${this.baseUrl}/api/pomodoro`, pomodoro);
}
createOrUpdatePomodoro(pomodoro: Pomodoro): Observable<Pomodoro> {
  return this.http.post<Pomodoro>(`${this.baseUrl}/saveOrUpdatePomodoro`, pomodoro);
}
//Tasks
getAllTasks(): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.baseUrl}/getTask`);
}
createTask(task: Task): Observable<Task> {
  return this.http.post<Task>(`${this.baseUrl}/addTask1`, task, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
updateTask(id: number, task: Task): Observable<Task> {
  return this.http.put<Task>(`${this.baseUrl}/updateTask1/${id}`, task);
}
 
getTasks(): Observable<Task[]> {
  const url = `${this.baseUrl}`;
  return this.http.get<Task[]>(url);
}

toggleFavorite(taskId: number   ): Observable<Task> {
  return this.http.put<Task>(`${this.baseUrl}/toggleFavorite/${taskId}`, {});
}
 
deleteT(id: number): Observable<void> {
  const url = `${this.baseUrl}/deleteT/${id}`;
  return this.http.delete<void>(url);
}
getTasksSortedByPriority(): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.baseUrl}/tasks/sortedByPriority`);
}


//videocall
register(user: User): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/api/v1/users`, user);
}

login(user: User): Observable<User> {
  return this.http.post<User>(`${this.baseUrl}/api/v1/users/login`, user);
}

logout(email: string): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/api/v1/users/logout`, { email });
}

findAll(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/api/v1/users`);
}

 
loadAndDisplayUsers(): Observable<User[]> {
  const connectedUser = localStorage.getItem('connectedUser');
   
  return this.http.get<User[]>(`${this.baseUrl}/api/v1/users`);
}

handleLogout(): Observable<void> {
  const connectedUser = localStorage.getItem('connectedUser');
   
  return this.http.post<void>(`${this.baseUrl}/api/v1/users/logout`, connectedUser);
}

handleNewMeeting(): void {
  const connectedUser = localStorage.getItem('connectedUser');
  if (connectedUser) {
    const user = JSON.parse(connectedUser);
    window.open(`videocall.html?username=${user.username}`, "_blank");
  } else {
    console.error('User is not connected');
  }
}

handleJoinMeeting(roomId: string): void {
  const connectedUser = localStorage.getItem('connectedUser');
  if (connectedUser) {
    const user = JSON.parse(connectedUser);
    const url = `videocall.html?roomID=${roomId}&username=${user.username}`;
    window.open(url, "_blank");
  } else {
    console.error('User is not connected');
  }
} }
