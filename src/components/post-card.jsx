export default function PostCard({ post = {} }) {
  return (
    <div className="border-class">
      <p style={{ fontSize: 20 }}>Applicant Name</p>
      <p style={{ fontSize: 25, marginBottom: 30, fontFamily: "serif" }}>
        {post.appName}
      </p>
      <p style={{ fontSize: 20 }}>Application Type</p>
      <p style={{ fontSize: 25, marginBottom: 30, fontFamily: "serif" }}>
        {post.applicationType}
      </p>
      <p style={{ fontSize: 20 }}>Ministry</p>
      <p style={{ fontSize: 25, marginBottom: 20, fontFamily: "serif" }}>
        {post.ministry}
      </p>
      <p style={{ fontSize: 20 }}>Description</p>
      <p style={{ fontSize: 25, marginBottom: 20, fontFamily: "serif" }}>
        {post.applicationDescription}
      </p>
    </div>
  );
}
