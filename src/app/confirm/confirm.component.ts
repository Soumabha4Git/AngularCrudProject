import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';

import { Course } from '../course';
import { DataService } from '../shared/data.service';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})


export class ConfirmComponent implements OnInit {

  headerValue: string = '';
  paragraphValue: string = '';


  formdata: string;
  dataForm: string;

  id: string;
  courseName: string;
  rating: string;
  price: string;
  trainerName: string;
  numberOfDays: string;

  private course: Course;

  constructor(private dataService: DataService , private courseService: CourseService , private router: Router) {}

  ngOnInit(): void {

      this.course = this.courseService.getCourse();

      this.dataService.currentMessage.subscribe(message => {
          this.id = JSON.parse(message).id;
          this.courseName = JSON.parse(message).courseName;
          this.rating = JSON.parse(message).rating;
          this.price = JSON.parse(message).price;
          this.trainerName = JSON.parse(message).trainerName;
          this.numberOfDays = JSON.parse(message).numberOfDays;
          this.formdata = JSON.stringify(JSON.parse(message));
          console.log('formdata from Confirm Page is '+this.formdata);
      });

      this.dataService.messageCurrent.subscribe(message => {
        this.headerValue = JSON.parse(message).headerValue;
        this.paragraphValue = JSON.parse(message).paragraphValue;        
        this.dataForm = JSON.stringify(JSON.parse(message));
        console.log('dataForm from Confirm Page is '+ this.dataForm);
    });

  }

  submitForm(confirmCourseForm: NgForm): void {
    console.log('confirmCourseForm for ID '+confirmCourseForm.value.id);

  if (this.headerValue == 'Form to confirm courses before adding it' && this.paragraphValue == 'Confirm the Courses that is going to be added') {
      console.log('Inside Add Form Confirm Page');
      
      this.courseService.createCourseJSON(this.formdata).subscribe(
          data=>{console.log(data)},
          error=>{console.log(error)}
        ) 
          
  }

  if (this.headerValue == 'Form to confirm courses before editing it' && this.paragraphValue == 'Confirm the Courses that is going to be edited') {
    console.log('Inside Edit Form Confirm Page');
    
    this.courseService.updateCourse(this.course.id,this.course).subscribe(
        data=>{console.log(data)},
        error=>{console.log(error)}
      ) 
         
}


if (this.headerValue == 'Form to confirm courses before deleting it' && this.paragraphValue == 'Confirm the Courses that is going to be deleted') {
  console.log('Inside Delete Form Confirm Page');
  
  this.courseService.deleteCourse(this.course.id).subscribe(
      data=>{console.log(data)},
      error=>{console.log(error)}
    ) 
     
}
  

    this.router.navigate(['/viewAllCourses']);
}


}