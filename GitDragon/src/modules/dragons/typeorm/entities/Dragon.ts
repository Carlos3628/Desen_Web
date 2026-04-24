import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('dragons')
export default class Dragon { 
@PrimaryGeneratedColumn('uuid') 
id: string; 
@Column() 
name: string; 
@Column('int') 
nivel: number; 
@Column() 
elemento: string;
@Column('decimal')
vida: number;
@Column('decimal')
poder: number; 
@CreateDateColumn() 
created_at: Date; 
@UpdateDateColumn() 
updated_at: Date; 
}