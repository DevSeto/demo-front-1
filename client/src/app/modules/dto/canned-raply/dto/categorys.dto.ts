import {Injectable} from '@angular/core';
import {DtoCategoryModel} from '../models/category.model';
import {CategoryDtoInterface} from '../interfaces/category-dto.interface';

type CATEGORY = Array<CategoryDtoInterface>;

@Injectable()
export class Categorys extends Array<DtoCategoryModel> implements CATEGORY {

    constructor() {
        super();
        (Object as any).setPrototypeOf(this, Categorys.prototype);
    }

    public set(dataCategorys: CATEGORY): void {
        for (const user in dataCategorys)
            this[user] = dataCategorys[user];
    }
}
