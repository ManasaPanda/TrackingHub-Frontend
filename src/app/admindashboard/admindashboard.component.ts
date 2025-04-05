import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }
  token = ''
  admin={
    id: '',
    email : ''
  }
  ngOnInit(): void {
    this.token = localStorage.getItem("token")

    if(this.token){
      try {
        const decord:any = jwtDecode(this.token)
        this.admin.id = decord.id
        this.admin.email = decord.email
      } catch (error) {
        console.error(error);    
      }
    }
    else{
      console.error("token not found.");
      
    }
  }

}
