import { Component, OnInit ,OnDestroy} from '@angular/core';
import{Subscription} from 'rxjs/Subscription'
import {TrainingService } from './training.service'
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit,OnDestroy {
ongoingTraining:boolean = false;
exerciseSubscription:Subscription;
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
  exercise=>{
    if(exercise){
      this.ongoingTraining= true;
      console.log(exercise);
    }else{
      this.ongoingTraining = false;
    }
  }
);
  }
  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}
