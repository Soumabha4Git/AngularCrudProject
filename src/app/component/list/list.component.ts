import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from '../../shared/course.service';
import { Course } from '../../course';
import { DataService } from '../../shared/data.service';


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})

export class ListComponent implements OnInit {

  public courses : Course[];
  public rowData: string;
  public dataRow: string;

  constructor( 
    private courseService : CourseService , 
    private course : Course , 
    private dataService: DataService, 
    private router: Router ) { }
   
  ngOnInit() {
    
    this.courseService.readAllCourse().subscribe(
      (data: any[])=>{  
        let finaldata = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));      
        this.courses = finaldata;
      }
    )

    this.dataService.currentMessage.subscribe(message => this.rowData = message);
    this.dataService.messageCurrent.subscribe(message => this.dataRow = message);
    console.log('rowData is ' + this.rowData);
    console.log('dataRow is ' + this.dataRow);
  }

  


  updateForm(course : Course) : void {
    this.courseService.setCourse(course);    
    console.log('ID for course ' + course + 'that to be updated  is ' + course.id);
    let jsonString = `{"id":"${course.id}","courseName":"${course.courseName}","rating":"${course.rating}","price":"${course.price}","trainerName":"${course.trainerName}","numberOfDays":"${course.numberOfDays}"}`;
    console.log('JSON String for course ' + jsonString); 
    this.dataService.changeMessage(jsonString);
    let stringJson = '{"headerValue":"Form to confirm courses before editing it","paragraphValue":"Confirm the Courses that is going to be edited"}'
    console.log(JSON.parse(JSON.stringify(stringJson)));
    this.dataService.messageChange(stringJson);
    this.router.navigate(['/editCourses']);
  }


  deleteForm(course) : void {
    console.log('ID for course ' + course + ' that to be deleted is ' + course.id);
    let jsonString = `{"id":"${course.id}","courseName":"${course.courseName}","rating":"${course.rating}","price":"${course.price}","trainerName":"${course.trainerName}","numberOfDays":"${course.numberOfDays}"}`;
    console.log('JSON String for course ' + jsonString); 
    this.dataService.changeMessage(jsonString);
    let stringJson = '{"headerValue":"Form to confirm courses before deleting it","paragraphValue":"Confirm the Courses that is going to be deleted"}'
    console.log(JSON.parse(JSON.stringify(stringJson)));
    this.dataService.messageChange(stringJson);
    this.router.navigate(['/removeCourses']);
  }

}
