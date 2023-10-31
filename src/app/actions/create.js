"use server";

import { client } from "@/utils/db";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createBook(formData) {
  const { title, rating, author, blurb } = Object.fromEntries(formData);

  // Create Unique Numeric Id
  const numericId = parseInt(uuidv4().replace(/-/g, ""), 16);

  // Create a Set to avoid dublicade data
  const isUnique = await client.zAdd(
    `rp_books`,
    {
      value: title,
      score: numericId,
    },
    { NX: true }
  );

  if(!isUnique){
    return {error:'This book alredy exists.'}
  }

  // Crate Hash
  await client.hSet(`rp_books:${numericId}`, {
    title,
    author,
    rating,
    blurb,
  });

  redirect("/");
}
