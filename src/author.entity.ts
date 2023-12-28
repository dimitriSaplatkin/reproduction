import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  OneToMany,
} from "@mikro-orm/core";
import { Book } from "./books.entity";

@Entity()
export class Author {
  @PrimaryKey()
  id!: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @OneToMany(() => Book, (book) => book.author)
  books = new Collection<Book>(this);

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
