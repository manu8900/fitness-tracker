import { Component, OnInit,OnDestroy, Output,EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/Subscription'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
@Output() sidenavClose = new EventEmitter<void>();
isAuth=false;
authSubscription:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.authChange.subscribe( authStatus =>{
      this.isAuth = authStatus;
    });
  }
  onClose(){
    this.sidenavClose.emit();
  }
  onLogout(){
    this.authService.logout();
    this.onClose();
  }
ngOnDestroy(){
          this.authSubscription.unsubscribe();//Destroys subscription memory.
        }
}
