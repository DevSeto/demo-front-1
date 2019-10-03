import {Component, OnInit, ViewChild} from '@angular/core';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';
@Component({
    selector: 'app-track',
    template: `
        <ngx-y2-player
                [class.youtube-iframe] = "!!1"
                [videoId]="videoId"
                [playerOptions]="playerOptions"
                (ready)="onReady($event)"
                (stateChange)="onStateChange($event)"
        >
        </ngx-y2-player>
    <button class="new-way__video-play" *ngIf="showPlay" (click)="play()" aria-label="Play Video">
        <span class="new-way__video-play-triangle"></span>
    </button>
    `,
    styles: [`.max-width-1024 { max-width: 1024px; margin: 0 auto; }`],
})
export class TrackComponent implements OnInit {
    public showPlay: boolean = !!1;
    @ViewChild('video') video: any;
    public videoId =  'ZVjo86OEeFc'; // string or string array;

    public playerOptions: NgxY2PlayerOptions = {
        height: 783, // you can set 'auto', it will use container width to set size
        width: 454,
        // when container resize, it will call resize function, you can custom this by set resizeDebounceTime, default is 200
        resizeDebounceTime: 0,
        playerVars: {
            autoplay: 0,
            rel: 0,
            showinfo: 0,
            enablejsapi: 0,
        },
        // aspectRatio: (3 / 4), // you can set ratio of aspect ratio to auto resize with
    };
    constructor() { }

    public ngOnInit(): void  {
    }
    public pause(): void  {
        this.video.pauseVideo();
    }
    public play(): void  {
        console.log(this.video)
        this.video.playVideo();
        this.showPlay = !!0;
    }
    public stop(): void {
        this.video.stopVideo();
    }
    public go(second : any) : void {
        this.video.seekTo(second, true);
    }

    public onReady(event: any): void {
        this.video = event.target;
        console.log('ready');
        console.log(event);
    }

    public onStateChange(event: any ) : void {
        if(event.data == 2){
            this.showPlay = !!1;
        }else{
            this.showPlay = !!0;
        }
        // console.log('change');
        // console.log(event);
    }

}
