import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TicketsChildsComponent } from '../tickets/tickets-childs.component';
import { MailBoxService } from '../../services/components/mailbox.service';
import { ToastrService } from '../../modules/toastr';

@Component({
  selector: 'demo-mailbox-steps',
  templateUrl: '../../html/demo-mailbox-steps/demo-mailbox-steps.component.html',
})

export class DemoMailboxStepsComponent implements OnInit {

    public isDemo : boolean = !!0;
    private defaultToastrParams: any = {
      progressBar: true,
      positionClass: 'toast-bottom-right',
    } as any;
    public confirmationKey:Array<any> = [];
    constructor(
      public mailboxeService : MailBoxService,
      private toastr: ToastrService,

    ){
      mailboxeService.getMailboxById(1).then((data: any ) : void=>{
        this.mailboxeService.defaultMailbox = data.data;
        if(this.mailboxeService.newReg && this.mailboxeService.defaultMailbox.default){
        // if( this.mailboxeService.defaultMailbox.default){
             this.isDemo = !!1;
             this.mailboxeService.defaultMailbox.default = 2;
        }
      })

    }

    public ngOnInit(): void {
    }
    public sendConfirmCode(e:any): any {
        console.log(e)
        console.log(e.value)
        console.log(this.confirmationKey)


        let confirmKey: string = this.confirmationKey.join('');
        if(!confirmKey){
          this.toastr.error('Wrong confirmation Code!', 'Error!', this.defaultToastrParams);
        }else{
          this.mailboxeService.checkEmailConfirmation(confirmKey)
            .then((data: any): void => {
              if (data.data.result) {
                this.mailboxeService.defaultMailbox.dns_verified = 1;

                this.toastr.success('Your email successfully verified!', 'Success', this.defaultToastrParams);
              }
              else {
                this.toastr.error('Wrong confirmation Code!', 'Error!', this.defaultToastrParams);

              }
            });
        }

    }
    public sendNewCode(): void {
      this.mailboxeService.drnfNewCode(this.mailboxeService.defaultMailbox.id)
        .then((data: any): void => {
            if (data.success) {
              this.toastr.success(data.message, 'Success', this.defaultToastrParams);
            }
        });
    }
    public copyTextToClipboard(name: string) {
      const copyTextarea = document.querySelector('.' + name);
      (copyTextarea as any).select();

      try {
          const dummy = document.createElement('input');
          document.body.appendChild(dummy);
          // @ts-ignore
          dummy.setAttribute('value', copyTextarea.value);
          dummy.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(dummy);

          setTimeout(() => {
            (copyTextarea as any).blur();
          }, 3000);

          this.toastr.success('Forwarding code has been successfully copied.', 'Success', this.defaultToastrParams);
      } catch (err) {
         console.log('asdasdwww',err)

      }
    }
    public createRange(number :  number): Array<number>{
        return new Array(number);
    }

    public changeCursorPosition(event: any , currentBoxNumber: number): boolean {
        let textboxes: any = document.getElementsByClassName('verify-email__input');
        var patt1 = /[0-9]/g;
        var result = (event.target.value.match(patt1));
        if(result && textboxes[currentBoxNumber + 1] != null){
          let nextBox :any = textboxes[currentBoxNumber + 1];
          nextBox.focus();
          nextBox.select();
          event.preventDefault();
          return false;
        }else if( textboxes[currentBoxNumber + 1] != null){
          event.target.value = '';
          return true;
        }
    }

    public checkForward(): void {

      this.mailboxeService.checkForwarding(this.mailboxeService.defaultMailbox.id)
        .then((data: any): void => {
          if (data.success) {
            this.toastr.info('The request is in pending status it will take you a while.', 'Info', this.defaultToastrParams);

            // this.getAgentsById()
          }
        });
    }
}