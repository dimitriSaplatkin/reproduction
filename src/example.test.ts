import { MikroORM } from "@mikro-orm/sqlite";
import { v4 as uuidv4 } from "uuid";
import { LocalizedString } from "./localizedString.entity";
import { BookGenre, Genre } from "./genre.entity";
import { Author } from "./author.entity";
import { Book } from "./books.entity";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init({
    dbName: "sqlite.db",
    entities: ["src/**/*.entity.ts"],
    debug: ["query", "query-params"],
    allowGlobalContext: true, // only for testing
    metadataProvider: TsMorphMetadataProvider,
  });
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
});

describe("basic CRUD example", () => {
  beforeAll(async () => {
    const string1 = orm.em.create(LocalizedString, {
      id: uuidv4(),
      de_DE: "Krimi",
      en_US: "Crime",
    });
    const string2 = orm.em.create(LocalizedString, {
      id: uuidv4(),
      de_DE: "Fantasy",
      en_US: "Fantasy",
    });
    const genreCrime = orm.em.create(Genre, {
      id: uuidv4(),
      type: BookGenre.crime,
      title: string1,
    });
    const genreFantasy = orm.em.create(Genre, {
      id: uuidv4(),
      type: BookGenre.fantasy,
      title: string2,
    });
    const author = orm.em.create(Author, {
      id: uuidv4(),
      firstName: "Jon",
      lastName: "Snow",
    });
    await orm.em.flush();
    orm.em.create(Book, {
      id: uuidv4(),
      name: "The Girl with the Dragon Tattoo",
      author,
      genre: genreCrime,
    });
    orm.em.create(Book, {
      id: uuidv4(),
      name: "Game of Thrones",
      author,
      genre: genreFantasy,
    });
    await orm.em.flush();
    orm.em.clear();
  });

  test("populate books with genre", async () => {
    const authors = await orm.em.find(
      Author,
      { firstName: "Jon" },
      { populate: ["books", "books.genre"] },
    );
    expect(authors).toHaveLength(1);
    const books = authors[0].books;
    expect(books).toHaveLength(2);
    expect(books.map((book) => book.genre.type).sort()).toEqual(
      [BookGenre.crime, BookGenre.fantasy].sort(),
    );
    // Should load title when populating books.genre according to eager: true
    expect(books.map((book) => book.genre.title.en_US).sort()).toEqual(
      ["Crime", "Fantasy"].sort(),
    );
  });
});
