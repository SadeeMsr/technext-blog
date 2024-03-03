import Editor from "@/components/Editor";
import { createPost } from "@/graphql/mutations";
import { cookieBasedClient } from "@/utils/amplifyServerUtils";

export default function page() {
 

  async function handleCreate(params) {
  "use server";
   try {
     await cookieBasedClient.graphql({ 
       query: createPost,
       variables: { input: params },
       authMode: "userPool",
     })
     console.log("hello")
   } catch (error) {
     console.log(error)
   }
  }

  return (
    <div>
      <Editor type="Publish" handleSubmit={handleCreate} />
    </div>
  );
}
