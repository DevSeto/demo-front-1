import {CategoryDtoInterface} from '../interfaces/category-dto.interface';

export class CannedRepliesInterface {

    body: string;
    category: CategoryDtoInterface;
    category_id: number;
    created_at: string;
    deleted_at: string|null;
    id: number;
    mailbox_id: string;
    name: string;
    updated_at: string;
    user_id: number;

}