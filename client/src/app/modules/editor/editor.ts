import {GlobalVariables} from '../../services/extra/global.variables';
import {EventEmitter} from '@angular/core';
declare let $: any;

export class TextEditor {

    public isValidSubscription: EventEmitter<boolean> = new EventEmitter<boolean>();
    public changeEditorText: EventEmitter<string> = new EventEmitter<string>();
    public currentFile: any;
    public setFile: EventEmitter<any> = new EventEmitter<any>();
    public editorTyping: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(userToken: string = '', service: any = null, editorType: string = '', public toastr: any = null, noneEmoji: boolean = !!0) {
        if (noneEmoji) {
            this.editorParams.pluginsEnabled.splice(4, 1);
            this.editorParams.pluginsEnabled.splice(1, 1);
        }

        this.editorParams.requestUrl = GlobalVariables.TICKETS_FILES_UPLOAD_URL;
        this.editorParams.editorRequestsHeaders.Authorization = userToken;
        this.service = service;
        this.editorType = editorType;
    }

    public attachFile: boolean = !!0;
    public core: any;
    public body: string|null = null;
    private isOpenedFontsBlock: boolean = !!0;
    private service: any;
    private editorType: string;
    private defaultToastrParams: any = {
        progressBar: true,
        positionClass: 'toast-bottom-right',
    } as any;

    private editorParams: any = {
        requestType: 'POST',
        requestUrl: GlobalVariables.BACKEND_DOMAIN + '/api/tickets/upload_file',
        editorRequestsHeaders: {
            Authorization: '',
        },
        pluginsEnabled: [
            'url',
            'file',
            'link',
            'lists',
            'emoticons',
            'codeView',
            'image',
        ],
        defaultToolbarOptions: [
            'customFont',
            'bold',
            'italic',
            'underline',
            'formatUL',
            'insertFile',
            'insertImage',
            'insertLink',
            'html',
            'emoticons',
            'createCannedReply',
        ],
        uploads: {
            images: {
                allowedTypes: [
                    'jpeg',
                    'jpg',
                    'png',
                ],
                size: (5 * 1024 * 1024),
            },
            files: {
                allowedTypes: ['*'],
                size: (20 * 1024 * 1024),
            },
        },
    };

    public editorOptions: any = {
        charCounterCount: !!0,
        fileUseSelectedText: true,
        // enter: $.Editor.ENTER_BR,
        pastePlain: true,
        pluginsEnabled: this.editorParams.pluginsEnabled,
        linkInsertButtons: [],
        linkEditButtons: [],
        placeholderText: '',
        fileUploadMethod: this.editorParams.requestType,
        imageUploadMethod: this.editorParams.requestType,
        fileMaxSize: this.editorParams.uploads.files.size,
        imageMaxSize: this.editorParams.uploads.images.size,
        fileUploadURL: this.editorParams.requestUrl,
        imageUploadURL: this.editorParams.requestUrl,
        requestHeaders: this.editorParams.editorRequestsHeaders,
        imageAllowedTypes: this.editorParams.uploads.images.allowedTypes,
        fileAllowedTypes: this.editorParams.uploads.files.allowedTypes,
        toolbarButtons: this.editorParams.defaultToolbarOptions,
        toolbarButtonsXS: this.editorParams.defaultToolbarOptions,
        toolbarButtonsSM: this.editorParams.defaultToolbarOptions,
        toolbarButtonsMD: this.editorParams.defaultToolbarOptions,
        height: 140,
        inlineMode: false,
        events: this.events,
    };

    private get events(): any {
        return {
            'froalaEditor.link.beforeInsert': (e: any, editor: any, link: any) => {
                if (link.match(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)) {
                    return null;
                } else if (!link.trim().length) {
                    this.toastr.info('Please, fill in the URL.', 'Info', this.defaultToastrParams);

                    return false;
                } else {
                    this.toastr.error('Please, enter a valid URL.', 'Error', this.defaultToastrParams);

                    return false;
                }
            },

            'froalaEditor.focus': (e: any, editor: any): any => {
                this.body = null;
                this.editorTyping.emit(!!1);
            },
            'froalaEditor.keydown': (e: any, editor: any) => editor.selection.save(),
            'froalaEditor.click': (e: any, editor: any) => {
                editor.selection.save();
            },
            'froalaEditor.blur': (e: any, editor: any): any => {
                this.editorTyping.emit(!!0);
                if (((editor.$el[0]).outerText as any).trim().length) {
                    // this.isValidSubscription.emit(!!1);
                    this.body = null;
                }
                this.changeEditorText.emit(this.body);
            },
            'froalaEditor.file.beforeUpload': (e: any, editor: any, file: any) => {

                this.currentFile = file[0];
            },
            'froalaEditor.file.unlink': (e: any, editor: any, file: any) => {
            },
            'froalaEditor.file.inserted': (e: any, editor: any, $file: any, response: any) => {

                if (this.attachFile) {
                    $file[0].remove();
                }

                editor.selection.save();
                response = JSON.parse(response);
                this.currentFile.link = response.link;
                response.name = this.currentFile.name;
                response.lastModified = this.currentFile.lastModified;
                response.type = this.currentFile.type;
                response.disposition = 'attachment';
                this.setFile.emit(response);
                this.currentFile = null;

            },
            'froalaEditor.file.uploaded': (e: any, editor: any, file: any) => {

            },
            'froalaEditor.image.removed': (e: any, editor: any, $img: any) => {

            },
            'froalaEditor.image.beforeUpload': (e: any, editor: any, images: any) => {
                this.currentFile = images[0];
            },
            'froalaEditor.image.inserted': (e: any, editor: any, $images: any) => {
                editor.selection.save();
            },
            'froalaEditor.image.uploaded': (e: any, editor: any, images: any) => {
                images = JSON.parse(images);
                this.currentFile.link = images.link;
                images.name = this.currentFile.name;
                images.type = this.currentFile.type;
                images.disposition = 'inline';
                this.setFile.emit(images);
                this.currentFile = null;
            },
            'froalaEditor.keyup': (e: any, editor: any, key: any) => {
                editor.selection.save();
                let rolle: string = '';
                const emptyFile: any = document.getElementsByClassName('data-isFile');
                if (emptyFile.length) {
                    for (let i = 0; i < emptyFile.length; i++) {
                        if (emptyFile[i] && !emptyFile[i].innerText) {

                            document.getElementsByClassName('data-isFile')[i].remove();
                        }
                    }
                }
                if (key.keyCode === 8 || (window as any).getSelection().toString()) {
                    rolle = 'remove';
                }
                this.changeEditorText.emit(rolle);
            },
            'froalaEditor.initialized': (e: any, editor: any): any => {
                this.core = editor;

                $('button[id^=\'emoticons-\']').on('click', () => {
                    $('.fr-popup.fr-active').css({
                        'top': '-230px',
                        'border-bottom': '4px solid #00acc1',
                    });

                    $('.fr-arrow').css({
                        'border-top': '5px solid #00acc1',
                        'border-bottom': 'none',
                        'top': '228px',
                    });
                });

                this.atWhoSettings();
                this.changeElementsStyles();
            },
        };
    }

    public initEditorConfigs(): void {
        const self: any = this;

        $.Editor.DefineIconTemplate('font_awesome', '<i class="la la-[NAME]"></i>');
        $.Editor.DefineIcon('customFont', {NAME: 'font'});
        $.Editor.RegisterCommand('customFont', {
            title: 'Fonts',
            focus: !!0,
            undo: !!0,
            refreshAfterCallback: !!0,
            callback(): void {
                const currentElements: NodeList = this.$box[0].firstElementChild.childNodes;

                Object.keys(currentElements).forEach((index: string): void => {

                    if (+index >= 1 && +index <= 4)
                        if (self.isOpenedFontsBlock)
                            currentElements[index].style.display = 'none';
                        else
                            currentElements[index].style.display = 'block';
                });

                self.isOpenedFontsBlock = !self.isOpenedFontsBlock;
            },
        });
    }

    private changeElementsStyles(): void {
        const paperClipElements: any = document.querySelectorAll('button[id*=insertFile-] i');

        if (paperClipElements.length > 0)
            for (const element of paperClipElements)
                element.setAttribute('class', 'la la-fw la-paperclip');
    }

    private atWhoSettings(): void {
        if (this.editorType !== 'note' || !this.service)
            return;

        const dataSource: Array<string> = [];
        let atWhoCallback: FunctionConstructor;
        const  checkAtWhoClick: () => void = (): void => {
                if (this.core.$el.atwho('isSelecting'))
                    atWhoCallback(null);
            },
            names: any = $.map(dataSource, (value: any, i: number) => {
                return {
                    id: i, name: value, email: value + '@email.com',
                };
            }),
            config: any = {
                at: '@',
                data: names,
                displayTpl: '<li>${name} <small>${email}</small></li>',
                insertTpl: '<span data-id=\'${id}\' >${name}</span>',
                limit: 200,
                callbacks: {
                    remoteFilter: (query: any, callback: any): void => {
                        atWhoCallback = callback;

                        this.service.searchUser(query).then((data: any): void => {
                            if (data.success && data.data.length > 0) {
                                data.data.forEach((user: any, index: number): void => {
                                    data.data[index].name = user.first_name + user.last_name;
                                });

                                callback(data.data);
                            } else {
                                callback(null);
                            }
                        });
                    },
                },
            };

        this.core.$el.atwho(config).on('inserted.atwho', () =>
            this.core.$el.find('.atwho-inserted').removeAttr('contenteditable'));

        this.core.$tb.on('click', checkAtWhoClick);
        this.core.$tb.find('.fr-btn').on('click', checkAtWhoClick);

        this.core.events.on('keydown', (e?: any) => {
            if (e.which === e.view.Keyboard.ENTER && this.core.$el.atwho('isSelecting'))
                return !!0;
        }, true);
    }
}
