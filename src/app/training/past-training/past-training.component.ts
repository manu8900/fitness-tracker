import { Component, OnInit,ViewChild,AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PastTrainingComponent implements OnInit,AfterViewInit,OnDestroy {
  displayedColumns=['date','name','duration','calories','state'];
  dataSource=new MatTableDataSource<Exercise>();
   private exchangedSubscription:Subscription
  @ViewChild(MatSort,{static:true}) sort:MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.exchangedSubscription=this.trainingService.finishedExercisesChanged.subscribe((exercise:Exercise[])=>{
      this.dataSource.data= exercise;
    })
  }
  ngAfterViewInit(){
    this.dataSource.sort =this.sort;
    this.dataSource.paginator=this.paginator;
}
doFilter(filterValue:string){
  this.dataSource.filter=filterValue.trim().toLowerCase();
}
ngOnDestroy(){
  this.exchangedSubscription.unsubscribe();
}
}
