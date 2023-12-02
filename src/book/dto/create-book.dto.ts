import { Category } from '../schemas/book.schemas';

export class CreateBookDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly author: string;
  readonly category: Category;
}
