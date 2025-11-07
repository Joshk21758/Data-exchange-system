import PostCard from "@/components/post-card";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Show({ params }) {
  //get route params
  const { id } = await params;

  //get application collection
  const applicationCollection = await getCollection("applications");
  let post;
  //check if the id is 24 characters
  if (id.length === 24 && applicationCollection) {
    //find the post by id
    post = await applicationCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    //JSONify the post id
    post = JSON.parse(JSON.stringify(post));
  } else {
    console.log("Invalid post id");
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p style={{ fontSize: 40, fontFamily: "initial" }}>Application Details</p>
      {post ? (
        <PostCard post={post} />
      ) : (
        <p style={{ fontSize: 60 }}>Application Not found!</p>
      )}
    </div>
  );
}
