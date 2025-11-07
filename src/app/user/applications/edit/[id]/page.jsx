import { updateApplication } from "@/app/actions/posts";
import { ApplicationForm } from "@/components/application-form";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Edit({ params }) {
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
    <div>
      <p
        style={{
          fontSize: 33,
          marginLeft: 3,
          marginTop: -20,
          marginBottom: 20,
        }}
      >
        Edit your Application
      </p>
      {post ? (
        <ApplicationForm handler={updateApplication} post={post} />
      ) : (
        <p style={{ fontSize: 60 }}>Application Not found!</p>
      )}
    </div>
  );
}
