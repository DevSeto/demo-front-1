import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {PaginationConfig} from './pagination.config';
import {PaginationComponent} from './components/pagination.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PaginationComponent],
    exports: [PaginationComponent],
})

export class PaginationModule {

    public static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: PaginationModule,
            providers: [PaginationConfig],
        };
    }
}
