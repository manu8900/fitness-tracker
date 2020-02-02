import { Component, OnInit, ViewEncapsulation,OnDestroy} from '@angular/core';
import { Exercise } from '../exercise.model'

import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NewTrainingComponent implements OnInit,OnDestroy{
  // exercises:Exercise[]=[];
  exercises: Exercise[];
  exerciseSubscription:Subscription;

  // @Output() trainingStart = new EventEmitter<void>();
  constructor(
    private trainingService: TrainingService, 
   
    ) { }

  ngOnInit() {
    //  this.exercises= this.trainingService.getAvailableExercises();
    this.trainingService.getAvailableExercises()
   this.exerciseSubscription= this.trainingService
   .exercisesChanged.subscribe(exercises =>( this.exercises = exercises))
  }
    onStartTraining(form: NgForm) {
    this.trainingService.starExercise(form.value.exercise);
  }
  ngOnDestroy(){
   this.exerciseSubscription.unsubscribe();
  }
}
