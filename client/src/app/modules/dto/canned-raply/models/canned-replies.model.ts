import {CategoryDtoInterface} from '../interfaces/category-dto.interface';

export class CannedRepliesModel {

    public body: string = '';
    public category: CategoryDtoInterface ;
    public category_id: number = 0;
    public created_at: string = '';
    public deleted_at: string|null = '';
    public id: number = 0;
    public mailbox_id: string = '';
    public name: string = '';
    public updated_at: string = '';
    public user_id: number = 0;

}
