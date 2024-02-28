import { cookieBasedClient } from "@/utils/amplifyServerUtils";
import Featured from "@/components/Featured";
import Feed from "@/components/Feed";
import { listPosts } from "@/graphql/queries";

export default async function Home() {
  const posts = await cookieBasedClient.graphql({ query: listPosts });

  return (
    <main className="min-h-screen flex">
      <Feed blogs={posts.data.listPosts.items} />
      <Featured />
    </main>
  );
}



///Implementations of client side api call



// "use client";
// import { useEffect, useState } from "react";
// import { generateClient } from "aws-amplify/api";

// const client = generateClient();

// const [data, setData] = useState([]);

// useEffect(() => {
//   fetch();
// }, []);

// async function fetch() {
//   const posts = await client.graphql({ query: listPosts });

//   setData(posts);
// }
