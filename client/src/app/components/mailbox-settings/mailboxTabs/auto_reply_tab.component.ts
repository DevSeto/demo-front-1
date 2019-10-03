import {Component, OnInit, Input, OnDestroy, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import {GlobalVariables} from '../../../services/extra/global.variables';
import {UsersModel} from '../../../models/components/users.model';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalServices as GS} from '../../../services/helpers/global.service';
import {Title} from '@angular/platform-browser';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {UsersService} from '../../../services/components/users.service';
import {TextEditor} from '../../../modules/editor';
import {FormBuilder, Validators} from '@angular/forms';
import {_} from '../../../services/helpers/helper.service';
import {ToastrService} from '../../../modules/toastr/toastr/toastr-service';
import {MailboxDtoInterface} from '../../../modules/dto/mailbox';
import {VariablesJson} from '../../../jsons/variables.json';

declare let $: any;

@Component({
    selector: 'auto_reply_tab',
    templateUrl: '../../../html/mailbox-settings/mailboxTabs/auto_reply_tab.component.html',
})

export class AutoReplyTabComponent implements OnInit, OnDestroy {

    public cloud: any = showed;
    public textEditor: TextEditor;

    public validHours: Array<string> = [];
    public subscribe: EventEmitter<string> = new EventEmitter<string>();

    public editorTyping: EventEmitter<string> = new EventEmitter<string>();

    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    public previousRoute: string;
    public previousTitle: string;

    @Input('mailboxdata')
    public mailboxdata: any;

    public mailboxId: number;

    public autoreplCheckbox: boolean = !!0;
    public autoreplOutside: boolean = !!0;

    /***
     * validaton party
     */

    public autoReplyForm: any;

    public _autoReplyFormErrors: any = {
        auto_reply_subject: {
            verify: !!0,
            text: _._,
        },
        auto_reply_body: {
            verify: !!0,
            text: _._,
        },
    };

    private autoReplyFormValidation: any = {
        auto_reply_subject: [
            this.mailboxService.mailbox.auto_reply_subject,
            [
                Validators.required,
                Validators.minLength(6),
            ],
        ],
        auto_reply_body: [
            this.mailboxService.mailbox.auto_reply_body,
            [
                Validators.required,
            ],
        ],
    };

    constructor(private usersModel: UsersModel,
                public variablesJson: VariablesJson,
                public mailboxService: MailBoxService,
                private mailboxModel: MailBoxModel,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private toastr: ToastrService,
                private userservice: UsersService,
                private title: Title,
                private cdRef: ChangeDetectorRef) {

        this.textEditor = new TextEditor(usersModel.getToken());
        this.autoReplyForm = this.formBuilder.group(this.autoReplyFormValidation);
        this.textEditor.initEditorConfigs();
        this.showReplyOn();
        this.beforeOnInit();
    }

    public ngOnInit(): void {
    }

    private beforeOnInit(): void {
        if (!this.init())
            this.router.navigate([this.previousRoute]);
    }

    public redirectTickets(): void {
        this.router.navigate(['/settings/mailbox']);
    }

    private init(): boolean {
        const routeParams: any = this.route.snapshot.params;
        this.previousRoute = GS.lastRoute.last;

        if (!this.previousRoute)
            this.previousRoute = '/tickets';

        if (routeParams.id) {
            this.mailboxId = routeParams.id;
            this.previousTitle = `Back <- ${this.title.getTitle()}`;

            return !!1;
        }
        return !!0;
    }

    public showReplyOn(): void {
        this.autoReplyForm = this.formBuilder.group(this.autoReplyFormValidation);
        // if (enable) {
        if (this.mailboxService.mailbox.auto_reply === 0){
            this.mailboxService.mailbox.auto_reply = 2;
        }
        this.textEditor = new TextEditor(this.usersModel.getToken());
        this.textEditor.initEditorConfigs();

        this.subscribe = this.textEditor.changeEditorText.subscribe((result: string|null) => {
            this.mailboxService.mailbox.auto_reply_body = this.textEditor.core.html.get();
            if (this.textEditor.core.html.get().length) {
                this._autoReplyFormErrors.auto_reply_body.verify = !!0;
                this.autoReplyForm.controls.auto_reply_body.setValue(this.textEditor.core.html.get());
            } else {
                this._autoReplyFormErrors.auto_reply_body.verify = !!1;
                this.autoReplyForm.controls.auto_reply_body.setValue('');
            }
            console.log('    this.mailboxService.mailbox.auto_reply_body',    this.mailboxService.mailbox.auto_reply_body)
        });

        // this.autoreplCheckbox = (this.mailboxService.mailbox.auto_reply !== 3);
        // this.autoreplOutside = (this.mailboxService.mailbox.auto_reply == 1);
        // } else {
        //     this.mailboxService.mailbox.auto_reply = 3;
        //     if (this.subscribe) {
        //         this.subscribe.unsubscribe();
        //         this.editorTyping.unsubscribe();
        //     }
        // }
    }

    public ngOnDestroy(): void {
        if (this.subscribe) {
            this.subscribe.unsubscribe();
            this.editorTyping.unsubscribe();
        }
    }

    public saveChanges(): void {
        this.mailboxService.mailbox.auto_reply_body = this.textEditor.core.html.get();
        if (this.textEditor.core.html.get().length) {
            this._autoReplyFormErrors.auto_reply_body.verify = !!0;
            this.autoReplyForm.controls.auto_reply_body.setValue(this.textEditor.core.html.get());
        } else {
            this._autoReplyFormErrors.auto_reply_body.verify = !!1;
            this.autoReplyForm.controls.auto_reply_body.setValue('');
        }
        this.cdRef.detectChanges();
        this.autoReplyForm.submitted = !!1;
        // if ( this.mailboxService.mailbox.auto_reply !== 3 && this.autoReplyForm.valid && !Object.keys(this.validHours).length) {
        console.log(this.autoReplyForm)
        if ((this.autoReplyForm.valid && !Object.keys(this.validHours).length && this.mailboxService.mailbox.auto_reply !== 3)){
            this.save({
                auto_reply_timeline: this.mailboxService.mailbox.auto_reply_timeline,
                auto_reply_body: this.mailboxService.mailbox.auto_reply_body,
                auto_reply_subject: this.mailboxService.mailbox.auto_reply_subject,
                auto_reply: this.mailboxService.mailbox.auto_reply,
            });
        }else if (this.mailboxService.mailbox.auto_reply === 3) {
            this.save({
                auto_reply: 3,
            });
        }
    }

    private save(data: MailboxDtoInterface|any){
        this.mailboxService.changeAutoreply(data, this.mailboxId)
            .then((dataRespons: any): void => {
                if (dataRespons.success) {
                    this.showSuccess();
                }
            });
    }

    public insertVariables(value: string, variable: string) {
        let text: any = this.mailboxService.mailbox[variable];
        let p: any = '';

        if (text !== '') {
            text = this.mailboxService.mailbox[variable].replace('</p>', ' ');
            p = '</p>';
        }
        this.mailboxService.mailbox[variable] = text + value + p;
    }

    public showSuccess() {
        this.toastr.success('successfully updated.', 'Success', this.defaultToastrParams);
    }
    public enableAutoReply(){

    }
}
