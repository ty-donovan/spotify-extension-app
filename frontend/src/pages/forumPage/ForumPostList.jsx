import "./ForumPage.css";
export default function ForumPostList({ user, message, likes }) {
  return (
    <>
      <div className="student-grade-row">
        <p>User: {user}</p>
        <p>{message}</p>
      </div>
    </>
  );
}
