import Link from "next/link";
import { client } from "@/utils/db";

const getBooks = async () => {
  // Array of members & scores
  const result = await client.zRangeWithScores("rp_books", 0, -1);

  // Get All books at ones
  const books = await Promise.all(
    result.map((book) => {
      return client.hGetAll(`rp_books:${book.score}`);
    })
  );

  return books;
};

export default async function Home() {
  const books = await getBooks();

  return (
    <main>
      <nav className="flex justify-between">
        <h1 className="font-bold">Books on Redis!</h1>
        <Link href="/create" className="btn">
          Add a new book
        </Link>
      </nav>

      {books.map(({ title, rating, author, blurb }) => (
        <div key={title} className="card">
          <h2>{title}</h2>
          <p> By {author}</p>
          <p>{blurb}</p>
          <p>Rating: {rating}</p>
        </div>
      ))}
    </main>
  );
}
