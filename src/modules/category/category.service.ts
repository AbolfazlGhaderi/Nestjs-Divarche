import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/models/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  // get All categories
  async getAllCategories(){

    const categories = await this.categoryRepository.find()

    if(!categories[0]) throw new HttpException('Categories Not Found',404)

    return categories
  }

  // Find category By Name
  async findCategoryByName(categoryName: string) {

    const category = await this.categoryRepository.findOne({
      where: { category_name: categoryName.toString()},
    });

    if(!category) throw new HttpException('Category Not Found',404)

    return category
  }
}
