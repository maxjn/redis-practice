"use server";

import { client } from "../../utils/db";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createBook(formData) {
  const { title, rating, author, blurb } = Object.fromEntries(formData);

  // Create Unique Numeric Id
  const numericId = parseInt(uuidv4().replace(/-/g, ""), 16);

  // Crate Hash
  await client.hSet(`rp_books:${numericId}`, {
    title,
    author,
    rating,
    blurb,
  });

  redirect('/')
}
