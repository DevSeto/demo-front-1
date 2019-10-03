import {Component, OnInit, OnDestroy, HostListener, Input} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CannedrepliesService} from '../../../services/components/cannedreplies.service';
import {UsersModel} from '../../../models/components/users.model';
import {TextEditor} from '../../editor/editor';
import {Categorys} from '../../dto/canned-raply/dto/categorys.dto';
import {CannedRepliesModel} from '../../dto/canned-raply/models/canned-replies.model';
import {MailBoxModel} from '../../../models/components/mailbox.model';
import {SocketService} from '../../../services/components/socket.service';
import {MailBoxService} from '../../../services/components/mailbox.service';
import {ToastrService} from '../../toastr';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/helpers/validation.service';
import {_} from '../../../services/helpers/helper.service';
import {VariablesJson} from '../../../jsons/variables.json';
import {CannedReplies, DtoCategoryModel} from '../../dto/canned-raply';
import {UsersJson} from '../../../jsons/users.json';

declare let $: any;

@Component({
    selector: 'create-canned-replies',
    templateUrl: '../html/create-canned-replies.html',
    providers: [CannedRepliesModel],
})

export class CreateCannedReplies implements OnInit, OnDestroy {

    public textEditor: any;
    public editReplySubscribe: any;
    public test: any = '2232';
    public status: string = 'create';
    public bodyValid: boolean = !!0;
    public oneclick: boolean = !!0;
    public disable: boolean = !!0;
    public oneclickCategory: boolean = !!0;
    public cloud: any = showed;
    public category: string = '';
    public createCategory: boolean = !!0;
    public selectedDropdown: any = {
        variable: 'Variable',
        category: 'Category',
    };
    //
    @HostListener('document:keyup', ['$event'])
    public isPressedToEscape(event: any): void {
    }
    @Input()
    public cannedRepliesForm: any;
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;
    public _cannedRepliesFormErrors: any = {
        name: {
            verify: !!0,
            text: _._,
        },
        body: {
            verify: !!0,
            text: _._,
        },
        category_id: {
            verify: !!0,
            text: _._,
        },
    };
    public get cannedRepliesFormErrors(): any {
        return this._cannedRepliesFormErrors;
    }
    @Input()
    public create(): void {
        this.cannedRepliesService.currentCannedReplies.body = this.textEditor.core.html.get();
        this.cannedRepliesForm.controls.body.setValue(this.cannedRepliesService.currentCannedReplies.body);
        this.cannedRepliesForm.submitted = !!1;
        if (this.cannedRepliesForm.valid && !this.oneclick) {
            this.bodyValid = !!1;
            this.createCannedReplies();

            // if (this.cannedRepliesService.currentCannedReplies.body.trim().length || this.cannedRepliesForm.attachments.length)
            // else
            //     this.toastr.error('You cannot send an empty replay.', 'Error', this.defaultToastrParams);
        }
    }
    @Input()
    public classError: any = (param: string): boolean => {

        if (param === 'body' && this.textEditor.core.html.get() && this.cannedRepliesForm.submitted) {
            this._cannedRepliesFormErrors[param].verify = !!1;
            if (!this.cannedRepliesForm.controls.body.value) {
                this.cannedRepliesForm.controls.body.setValue(this.textEditor.core.html.get());
            }

            return !!0;
        } else if (param === 'body' && !this.textEditor.core.html.get() && this.cannedRepliesForm.submitted) {
            this._cannedRepliesFormErrors[param].verify = !!0;
            if (this.cannedRepliesForm.controls.body.value) {
                this.cannedRepliesForm.controls.body.setValue('');
            }

            return !!1;
        }

        if ((!this.cannedRepliesForm.controls[param].valid && this.cannedRepliesForm.controls[param].touched && this.cannedRepliesForm.submitted) ||
            (!this.cannedRepliesForm.controls[param].valid && this.cannedRepliesForm.submitted)) {
            return !!1;
        } else if (this.cannedRepliesFormErrors[param].verify && this.cannedRepliesForm.submitted) {
            return !!1;
        } else {
            return !!0;
        }
    }

    @Input()
    public classSuccess: any = (param: string): boolean => {
        return this.cannedRepliesForm.controls[param].valid && this.cannedRepliesForm.controls[param].touched;
    }
    public cannedRepliesValidation: any = {
        name: [
            this.cannedRepliesService.currentCannedReplies.name,
            [
                Validators.required,
                ValidationService.dbValidator,
                Validators.minLength(3),
                Validators.maxLength(40),

            ],
        ],
        body: [
            this.cannedRepliesService.currentCannedReplies.body ,
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(250),

            ],
        ],
        category_id: [
            this.cannedRepliesService.currentCannedReplies.category_id,
            [
            ],
        ],
    };
    constructor(private title: Title,
                private usersModel: UsersModel,
                public variablesJson: VariablesJson,
                public cannedRepliesService: CannedrepliesService,
                public socketServices: SocketService,
                public toastr: ToastrService,
                private mailboxModel: MailBoxModel,
                private usersJson: UsersJson,
                private formBuilder: FormBuilder,
                public mailboxService: MailBoxService) {
        if (!this.cannedRepliesService.currentCannedReplies.category_id && this.cannedRepliesService.categorys.length){
            this.cannedRepliesService.currentCannedReplies.category_id = this.cannedRepliesService.categorys[0].id;
        }
        this.textEditor = new TextEditor(usersModel.getToken());
        if (this.cannedRepliesService.currentCannedReplies.id){
            for (const key in this.cannedRepliesService.categorys){
                if (this.cannedRepliesService.categorys[key].id === this.cannedRepliesService.currentCannedReplies.category_id){
                    this.selectedDropdown.category = this.cannedRepliesService.categorys[key].name;
                    break;
                }
            }
            this.status = 'edith';
        }
        this.cannedRepliesForm = this.formBuilder.group(this.cannedRepliesValidation);
    }

    public ngOnInit() {
        this.subsc();

        this.textEditor.initEditorConfigs();

    }
    private subsc(): void{
        this.editReplySubscribe = this.textEditor.changeEditorText.subscribe((repliesData: any): void => {
            // this.cannedRepliesForm.controls.body.setValue(this.textEditor.core.html.get());
            // this.cannedRepliesService.currentCannedReplies.body = this.textEditor.core.html.get();
            // this.classSuccess('body');
            // this.classError('body');
            if (this.textEditor.core.html.get().trim()){
                this.bodyValid = !!1;
            }else{
                this.bodyValid = !!0;
            }
        });
    }
    public close(){
        if (this.cloud.effect.viewReplies){
           this.cloud.effect = 'viewReplies';
        }
        this.cloud.effect = 'createCannedReplies';
    }

    public ngOnDestroy() {
        this.editReplySubscribe.unsubscribe();
        this.status = 'create';
        // if (this.cloud.effect.viewReplies){
        //    this.cloud.effect = 'viewReplies';
        // }

        this.cannedRepliesService.currentCannedReplies.name = null;
        this.cannedRepliesService.currentCannedReplies.body = null;
        this.cannedRepliesService.currentCannedReplies.id = null;
    }

    public createCannedReplies(): void {
        this.oneclick = !!1;
        this.cannedRepliesService.currentCannedReplies.body = this.textEditor.core.html.get();
        this.cannedRepliesService.currentCannedReplies.mailbox_id = this.mailboxModel.getMailboxCurrentId();
        if (this.cannedRepliesService.currentCannedReplies.id){
            this.cannedRepliesService.editCannedReply(this.cannedRepliesService.currentCannedReplies)
                .then((data: any) => {
                    if (data.success) {
                        // this.cannedRepliesService.cannedReplies.unshift(data.data);
                        for (const index in  this.cannedRepliesService.cannedReplies){
                            if (this.cannedRepliesService.cannedReplies[index].id ===  this.cannedRepliesService.currentCannedReplies.id){
                                this.cannedRepliesService.cannedReplies[index] =  (Object as any).assign({}, this.cannedRepliesService.currentCannedReplies);
                                break;
                            }
                        }
                        for (const index in  this.cannedRepliesService.repliesList){
                            if (this.cannedRepliesService.repliesList[index].id ===  this.cannedRepliesService.currentCannedReplies.id){
                                this.cannedRepliesService.repliesList[index] =  (Object as any).assign({}, this.cannedRepliesService.currentCannedReplies);
                                break;
                            }
                        }
                        this.socketServices.changeCannedReplies(this.cannedRepliesService.cannedReplies, this.cannedRepliesService.categorys, this.mailboxService.mailbox.id);
                        this.toastr.success('Canned reokues successfully added.', 'Success', this.defaultToastrParams);
                        this.cloud.effect = 'createCannedReplies';
                    }
                    this.oneclick = !!0;

                });
        }else{
            this.cannedRepliesService.createCannedReplies( this.cannedRepliesService.currentCannedReplies)
                .then((data: any) => {
                    if (data.success) {
                        if (!this.cannedRepliesService.cannedReplies){
                            this.cannedRepliesService.cannedReplies  = new CannedReplies();
                        }
                        this.cannedRepliesService.cannedReplies.unshift(data.data);
                        for (const index in  this.cannedRepliesService.categorys){
                            if (this.cannedRepliesService.categorys[index].id ===  this.cannedRepliesService.currentCannedReplies.category_id){
                                this.cannedRepliesService.categorys[index].canned_replies_count++;
                            }
                        }
                        this.socketServices.changeCannedReplies(this.cannedRepliesService.cannedReplies, this.cannedRepliesService.categorys, this.mailboxService.mailbox.id);
                        this.toastr.success('Canned reokues successfully added.', 'Success', this.defaultToastrParams);
                        this.cloud.effect = 'createCannedReplies';
                    }
                    this.oneclick = !!0;

                });
        }

    }

    public addCategory(): void {
        this.oneclickCategory = !!1;
        if (this.category.trim()){
            this.disable = !!1;
            this.cannedRepliesService.setNewCategory(this.category.trim())
                .then((data: any) => {
                    if (data.success) {
                        this.disable = !!0;
                        this.cloud.effect = 'createCannedRepliesCategory';
                        data.data.canned_replies_count = 0;
                        this.cannedRepliesService.categorys.unshift(data.data);
                        this.toastr.success('Category successfully added.', 'Success', this.defaultToastrParams);
                        // this.newCategoryData.newCategory = '';
                        // this.createCategory = !!0;
                        // this.cannedRepliesService.categorys.push(data.data);
                        this.socketServices.changeCannedReplies(this.cannedRepliesService.cannedReplies, this.cannedRepliesService.categorys, this.mailboxService.mailbox.id);
                        // this.selectCategory(data.data.id, data.data.name);
                    }
                });
        }
    }

    public insertVariables(value: string, variable: any) {
        if (variable === 'signature') {
            this.textEditor.core.selection.restore();
            this.textEditor.core.html.insert(value, false);
            this.cannedRepliesService.currentCannedReplies[variable] = this.textEditor.core.html.get();
        } else
            this.cannedRepliesService.currentCannedReplies[variable] = (document.getElementById(variable) as any).value + ' ' + value;
    }
}
