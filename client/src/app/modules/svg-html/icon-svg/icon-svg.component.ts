import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'icon-svg',
  template: `<span class="icon-svg"
              [ngClass]="{'ripple': this.ripple}"
              [innerHTML]="svg"
            ></span>`,
})

export class IconSVG implements OnInit {

  public svg: SafeHtml;
  @Input() pathToSVG: string;
  @Input() ripple = true;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    this.http.get(this.pathToSVG, { headers, responseType: 'text'})
      .subscribe( data => { 
        return this.svg = this.sanitizer.bypassSecurityTrustHtml(data)}
        )
  }
}