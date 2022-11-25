import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Bistro {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    name: string
    @Column({ nullable: true })
    image?: string
    @Column({ nullable: true })
    description?: string
    @Column()
    ownerId?: string
}
