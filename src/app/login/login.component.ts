import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonservice:CommonServiceService,private router:Router) { }
  successMessage:string = ''
  errorMessage:string = ''
  user = {
    email :'',
    password:''
  }
  token = ''
  role:string = ''
  ngOnInit(): void {
  }

  showModal(modalId: string) {
    let modalElement = document.getElementById(modalId);
    if (modalElement) {
      let modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
  loginformsubmit(){
    this.commonservice.login(this.user.email,this.user.password).subscribe(
      (res)=>{
        this.token = res.token
        localStorage.setItem('token',this.token)
        this.decordtoken()
        if (this.role == "admin") {
          this.router.navigate(['admindashboard']);
        }
        else if(this.role == "user"){
          this.router.navigate(['userdashboard']);
        }
      },
      (error)=>{
        console.error(error);
        this.errorMessage = error.error.message;
        this.showModal('errorModal');
      }
    )
  }
  decordtoken(){
    if(this.token){
      try {
        const decord : any= jwtDecode(this.token)
        this.role = decord.role
      } catch (error) {
        console.error(error);
        
      }
    }
  }
}
