import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Cascade,
} from "@mikro-orm/core";
import { LocalizedString } from "./localizedString.entity";

export enum BookGenre {
  crime = "crime",
  fantasy = "fantasy",
  horror = "horror",
  romance = "romance",
}

@Entity()
export class Genre {
  @PrimaryKey()
  id!: string;

  @Property()
  type: BookGenre;

  @ManyToOne({ cascade: [Cascade.ALL], eager: true, nullable: false })
  title: LocalizedString;

  constructor(type: BookGenre, title: LocalizedString) {
    this.type = type;
    this.title = title;
  }
}
