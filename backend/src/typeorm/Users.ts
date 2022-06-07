import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Profile } from "./Profile";


@Entity()
export class User{
    
    @PrimaryGeneratedColumn({
        type: 'bigint',
       
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    username: string;

    @Column({
        nullable: false,
        default: ''
    })
    password: string;

    // @OneToOne(type )

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

   

}