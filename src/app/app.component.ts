import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
import * as data from './data.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService]
})
export class AppComponent  implements OnInit{
  title = 'space-ng-reactiveforms-with-expandable-sections-add-elements-dynamic';
  createForm: FormGroup;
  sectionOneButtonDisabled = false;
  sectionTwoButtonDisabled = false;
  sectionThreeButtonDisabled = false;
  msgs: Message[] =[];
  icon="pi pi-exclamation-triangle";
  message = "Are you sure that you want to proceed?"
  jobsList: FormArray;
  jobOptions: any;
  constructor(private fb: FormBuilder, private ConfirmationService: ConfirmationService, private location: Location) {

  }
  ngOnInit(){
    this.createForm = this.fb.group({
      clientId: ['', [Validators.required]],
      clientName: ['',[Validators.required]],
      mobile: ['', [Validators.required]],
      sectionOne:['',[Validators.required]],
      sectionTwo:['',[Validators.required]],
      jobsList: this.fb.array([])
    });
    this.jobOptions = data.jobOptions;

    this.jobsList = this.createForm.get('jobsList') as FormArray;
  }

  get jobsListGroup() {
    return this.createForm.get('jobsList') as FormArray;
  }

  createJobList(): FormGroup {
    return this.fb.group({
      jobName: ['']
    })
  }

  addJobList() {
    this.jobsList = this.createForm.get('jobsList') as FormArray;
    this.jobsList.push(this.createJobList())
  }

  deleteJobList(index) {
    this.jobsList.removeAt(index)
  }

  getJobListFormGroup(index): FormGroup {
    const formGroup = this.jobsList.controls[index] as FormGroup;
    return formGroup;
  }

  resetForm() {
    this.createForm.reset();
    location.reload();
  }

  submitForm() {
    const clientId = this.createForm.value.clientId;
    const clientName = this.createForm.value.clientName;
    const mobile = this.createForm.value.mobile;
    const jobsInfo = this.createForm.value.jobsList; 
    console.log(clientId);
  }

  //for edit form - FormArrya element need to add like below
  retrieveData(clientId) {
    //step1: retrieveData from backend;
    //Example: jobsInfoObjs contains data
    // for(const prop in jobsInfoObjs){
    //   if(jobsInfoObjs[prop] !== null) {
    //     this.createForm.get('clientId').setValue(this.jobsInfoObjs[prop].clientId);
    //     this.createForm.get('clientName').setValue(this.jobsInfoObjs[prop].clientName);
    //     const JobsListObj = this.jobsInfoObjs[prop].jobsListObj;
    //     this.JobsList = this.createForm.get('jobsList') as FormArray;
    //     for(const subprop in JobsListObj){
    //       if(JobsListObj[subprop] !== null) {
    //         this.addJobList();
    //         this.createForm.controls.jobsList.patchValue(JobsListObj);
    //       }
    //     }
        
    //   }
    // }
  }
  sectionAddRemove(section, optEnable){
    if(optEnable === true) {
      switch(section){
        case 'Section-1': {
          this.sectionOneButtonDisabled = !this.sectionOneButtonDisabled;
          break;
        }
        case 'Section-2': {
          this.sectionTwoButtonDisabled = !this.sectionTwoButtonDisabled;
          break;
        }
        case 'Section-3': {
          this.sectionThreeButtonDisabled = !this.sectionThreeButtonDisabled;
          break;
        }
        default: {
          break;
        }
      }
    } else {
      this.ConfirmationService.confirm({
        message: this.message,
        header:`Disable ${section} Section`,
        icon: this.icon,
        accept: () => {
          switch(section) {
            case 'Section-1': {
              this.sectionOneButtonDisabled = !this.sectionOneButtonDisabled;
              break;
            }
            case 'Section-2':{
              this.sectionTwoButtonDisabled = !this.sectionTwoButtonDisabled;
              break;
            }
            case 'Section-3': {
              this.sectionThreeButtonDisabled = !this.sectionThreeButtonDisabled;
              break;
            }
            default: {
              break;
            }
          }
        },
        reject:() => {
          this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have Rejected'}]
        }
      });
    }
  }
}
