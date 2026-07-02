import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany // Importa o OneToMany
} from 'typeorm';
import Game from '@modules/gamesp/typeorm/entities/Game'; // Vamos criar isto a seguir

@Entity('playstation_networks')
export default class PlayStationNetwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  profile_name: string;

  @Column({ unique: true })
  psn_id: string;

  @Column()
  region: string;

  // Adiciona a relação aqui: Um perfil tem muitos jogos
  @OneToMany(() => Game, (game: Game) => game.psn)
  games: Game[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}