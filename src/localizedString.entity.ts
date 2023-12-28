import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";

export enum Language {
  ENGLISH = "en_US",
  GERMAN = "de_DE",
}

type LocalizationType = {
  [Key in Language]?: string;
};

@Entity()
export class LocalizedString extends BaseEntity implements LocalizationType {
  @PrimaryKey()
  id!: string;

  @Property()
  de_DE: string;

  @Property()
  en_US: string;

  constructor(de: string, en: string) {
    super();
    this.de_DE = de;
    this.en_US = en;
  }
}
