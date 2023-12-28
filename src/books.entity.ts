import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Author } from "./author.entity";
import { Genre } from "./genre.entity";

@Entity()
export class Book {
  @PrimaryKey()
  id!: string;

  @Property()
  name: string;

  @ManyToOne()
  author: Author;

  @ManyToOne()
  genre: Genre;

  constructor(name: string, author: Author, genre: Genre) {
    this.name = name;
    this.author = author;
    this.genre = genre;
  }
}
