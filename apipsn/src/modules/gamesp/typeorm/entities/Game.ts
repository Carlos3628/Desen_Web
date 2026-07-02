import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PlayStationNetwork from '@modules/psn/typeorm/entities/PlayStationNetwork';

@Entity('games')
export default class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // Ex: World of Goo 2, FNaF World

  @Column()
  developer: string;

  // A chave estrangeira que fará a ligação ao perfil
  @Column('uuid')
  psn_id: string;

  // Adiciona a relação inversa: Muitos jogos pertencem a um perfil
  @ManyToOne(() => PlayStationNetwork, psn => psn.games)
  @JoinColumn({ name: 'psn_id' }) // Especifica qual coluna guarda o ID
  psn: PlayStationNetwork;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}