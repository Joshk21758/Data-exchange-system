import { CardDescription, CardTitle } from "./ui/card";

export default function PostCard({ post }) {
  return (
    <div className="postCard">
      <CardTitle>Applicant name</CardTitle>
      <CardDescription>{post.appName}</CardDescription>

      <CardTitle>Application type</CardTitle>
      <CardDescription>{post.applicationType}</CardDescription>

      <CardTitle>Address</CardTitle>
      <CardDescription>{post.address}</CardDescription>

      <CardTitle>Description</CardTitle>
      <CardDescription>{post.applicationDescription}</CardDescription>
    </div>
  );
}
