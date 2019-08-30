import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VrekonService } from './vrekon.service'
@Component({
  selector: 'jpt-delete-confirm-dialog',
  templateUrl: './delete.confirmation.dialog.html'
})
export class  deleteConfirmationDialog{
    @Input() type
    @Input() content;
    @Input() id;
    constructor(
      public modal: NgbActiveModal,
      private service: VrekonService,
      ) {}


    deleteContent(){
        switch(this.type){
          case "service":{
            this.deleteService(this.id);
          }
          case "institusi":{
            this.deleteInstitute(this.id);
          }
        }
    }

    deleteInstitute(id: number){
      this.service.deleteInstitute(id).subscribe(response => {
        this.modal.close("berhasil");
      });
    }
    deleteService(id: number){
      this.service.deleteDbService(id).subscribe(response => {
        this.modal.close("berhasil");
      });
    }
}