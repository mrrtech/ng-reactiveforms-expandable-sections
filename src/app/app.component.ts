import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService]
})
export class AppComponent  implements OnInit{
  title = 'space-ng-reactiveforms-with-expandable-sections';
  createForm: FormGroup;
  sectionOneButtonDisabled = false;
  sectionTwoButtonDisabled = false;
  msgs: Message[] =[];
  icon="pi pi-exclamation-triangle";
  message = "Are you sure that you want to proceed?"
  constructor(private fb: FormBuilder, private ConfirmationService: ConfirmationService) {

  }
  ngOnInit(){
    this.createForm = this.fb.group({
      clientId: ['', [Validators.required]],
      clientName: ['',[Validators.required]],
      mobile: ['', [Validators.required]]
    })
  }

  resetForm() {
    this.createForm.reset();
  }
  submitForm() {
    const clientId = this.createForm.value.clientId;
    const clientName = this.createForm.value.clientName;
    const mobile = this.createForm.value.mobile;
    console.log(clientId);
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
