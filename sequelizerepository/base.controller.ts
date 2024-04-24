import { Body, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { IBaseService } from './ibase.service';

export class BaseController<T> {
  constructor(private readonly IBaseService: IBaseService<T>) {}

  @Get('getoptionlist')
  @ApiQuery({
    name: 'sort_by',
    required: false,
    description: 'Sort by this field',
  })
  @ApiQuery({ name: 'column', required: false, description: 'Column name' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async getoptionlist(@Req() req: Request): Promise<T[]> {
    return this.IBaseService.getoptionlist(req);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async getall(@Req() req: Request): Promise<T[]> {
    return this.IBaseService.getall(req);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the entity' })
  @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Entity does not exist' })
  async get(@Param('id') id: any): Promise<T> {
    return this.IBaseService.get(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() entity: T): Promise<T> {
    return this.IBaseService.create(entity);
  }

  @Put(':id')
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 201, description: 'Entity updated successfully.' })
  async update(@Param('id') id: any, @Body() entity: T): Promise<T> {
    return this.IBaseService.update(id, entity);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async delete(@Param('id') id: any): Promise<any> {
    return;
    return this.IBaseService.delete(id);
  }
}
