import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { OrderItem } from './order-item.entity'

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Index()
    @Column()
    bistroId: string

    @Index()
    @Column()
    qrcodeId: string

    @Column({ nullable: true })
    qrcodeName: string

    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[]

    @Column({ nullable: true })
    isPaid: boolean

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createAt: Date

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date

    @Column({ type: 'timestamptz', nullable: true })
    closeOderTimestamp: Date
}
