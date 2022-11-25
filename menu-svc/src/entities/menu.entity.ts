import { Entity, Column } from 'typeorm'

@Entity()
export class Menu {
    @Column({ primary: true, generated: 'uuid' })
    id: string

    @Column()
    bistroId: string

    @Column()
    name: string

    @Column()
    price: number

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    image: string
}
