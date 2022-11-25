import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Order } from './order.entity'

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Order, (order) => order.items, { nullable: true })
    order: Order

    @Column()
    menuId: string

    @Column({ nullable: true })
    menuPrice: number

    @Column({ nullable: true })
    menuName: string

    @Column({ nullable: true })
    menuImage: string

    @Column()
    quantity: number

    @Column({ default: false })
    isDelete: boolean

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
}
