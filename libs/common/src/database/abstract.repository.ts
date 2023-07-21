import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManger: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return await this.entityManger.save(entity);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return await this.entityRepository.findBy(where);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });

    if (!entity) {
      this.logger.warn('Entity not found with where', where);

      throw new NotFoundException('Entity not found!');
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult.affected) {
      this.logger.warn('Entity not found with where query to update', where);

      throw new NotFoundException('Entity not found to update!');
    }

    return await this.findOne(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    return await this.entityRepository.delete(where);
  }
}
