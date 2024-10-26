import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityContent extends BaseEntity {
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
