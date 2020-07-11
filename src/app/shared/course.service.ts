import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';


import { Course } from '../course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private course : Course ;
  private baseUri : string = 'http://localhost:8082/SpringBootRestApiOracleJBOSS';
  private headers = new HttpHeaders().set('Access-Control-Allow-Methods','application/json')
  constructor(private httpClient:HttpClient) { }

  createCourse(course : Course) {
    return this.httpClient.post(this.baseUri + '/post',course)
  }

  createCourseJSON(jsonString : string) {
    return this.httpClient.post(this.baseUri + '/post',jsonString,{headers : this.headers})
  }

  readAllCourse() {
    return this.httpClient.get(this.baseUri + '/get/all',{headers : this.headers})
  }

  updateCourse(id : String , course : Course) {
    return this.httpClient.put(this.baseUri + '/put/'+id,course,{headers : this.headers})
  }

  deleteCourse(id : String) {
    return this.httpClient.delete(this.baseUri + '/delete/'+id ,{headers : this.headers})
  }

  setCourse(course : Course) {
    this.course = course;
  }

  getCourse() {
    return this.course;
  }

  

}
