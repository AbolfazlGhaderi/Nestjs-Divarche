import { Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getAllCategories(){
    return await this.categoryService.getAllCategories()
  }

  @Get(':category')
  async findCategory(@Param('category') categoryName:string){
    return await this.categoryService.findCategoryByName(categoryName)
  }
}
