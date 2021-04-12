import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column('text')
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;
}

let connection:Connection;

export async function getProductRepository(): Promise<Repository<Product>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'myangularapp',
      synchronize: true,
      entities: [
        Product
      ],
    });
  }
  return connection.getRepository(Product);
}