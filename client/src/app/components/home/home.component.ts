import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
    templateUrl: '../../html/home/home.component.html',
    styleUrls: ['./landing.css'],
})

export class HomeComponent implements OnInit {
    public cloud: any = showed;
    public url: string = '';
    public ngOnInit(): void {}
}
