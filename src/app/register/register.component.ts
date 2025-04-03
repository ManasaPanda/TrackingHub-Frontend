import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import {  Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    Name: '',
    email: '',
    password: '',
    age: null,
    isAdmin: false // Default to false
  };
  successMessage:string = ''
  errorMessage:string = ''
  AdminreferralCode: any = '';
  message:string = ''
  referalcodeverified :boolean = false

  iferror:boolean=false
  constructor(private commonservice: CommonServiceService,private router:Router) { }

  ngOnInit(): void {
    this.message = ''
  }

  showModal(modalId: string) {
    let modalElement = document.getElementById(modalId);
    if (modalElement) {
      let modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
  hideModals(modalId:string){
    let modalref = bootstrap.Modal.getInstance(document.getElementById(modalId));
    if(modalref){
      modalref.hide();
    }
    else{
      console.error(modalref + "not found!!..");
    }
  }
  closeandredirecthome(){
    this.hideModals('successModal')
    setTimeout(() => {
      this.router.navigate(['']);
      this.user = {
        Name: '',
        email: '',
        password: '',
        age: null,
        isAdmin: false
      };
    }, 1000);
  }
  onSubmit() {
    // Send `user` object to backend
    this.commonservice.resister(this.user.email, this.user.password, this.user.Name, this.user.age, this.user.isAdmin).subscribe((res) => {
      console.log("register Successfully..", res.user.role);
      this.referalcodeverified = false
      if(res.user.role == 'user'){
        this.successMessage = "You're all set! ✅ Your account has been created. Click OK to go back to the home page and start exploring."
      }
      else{
        this.successMessage ="You're all set! ✅ Admin registration is complete. Click OK to return home and access your admin dashboard."
      }
      //let SuccessMessage = res.message
      this.showModal('successModal')
      //this.showSuccessmessage(successmessage)
    },
      (error) => {
        this.referalcodeverified = false
        console.log(error);
        this.errorMessage = error.error.message
        this.showModal('errorModal')
        // this.showerrormessage(errormessage)
        //alert(error.error.message)
      })
  }

  Openadminmodal() {
    if (this.user.isAdmin) {
      this.showModal('adminModal')
    }
  }
  CloseAdminModal() {
    this.hideModals('adminModal')
    this.user.isAdmin = false
  }
  ProceedWithAdmin() {
    this.commonservice.verifyAdminRef(this.AdminreferralCode).subscribe(
      (res) => {
        console.log(res);
        let SuccessMessage = res.message
        this.successMessage = SuccessMessage
        // this.showSuccessmessage(successMessage)
        this.referalcodeverified = true
        this.hideModals('adminModal')
        this.showModal('successModal')
        setTimeout(() => {
          // let adminModal = bootstrap.Modal.getInstance(document.getElementById('adminModal'));
          // adminModal.hide();
          this.hideModals('successModal')
          this.AdminreferralCode = ''
        }, 3000);
       },
      (error) => {
        this.referalcodeverified = true
        this.errorMessage = error.error.message
        this.CloseAdminModal()

        this.showModal('errorModal');
        setTimeout(() => {
          this.hideModals('errorModal')
          this.AdminreferralCode = ''
        }, 3000);
        // this.showerrormessage(errorMessage);
       })
  }
  // removemessage(){
  //   setTimeout(() => {
  //     this.message =''
  //   }, 3000);
  // }
  // showerrormessage(errormessage) {
  //   this.iferror = true
  //   this.message= errormessage
  //   this.removemessage()
  // }
  // showSuccessmessage(successmessage){
  //   this.iferror = false
  //   this.message = successmessage
  //   this.removemessage()
  // }
}
