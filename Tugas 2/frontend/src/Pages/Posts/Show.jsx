import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [post, setPost] = useState(null);

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setPost(data.post);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id && post.user_id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {post ? (
        <div
          key={post.id}
          className="mt-6 rounded-[2rem] bg-white p-10 shadow-2xl shadow-slate-200"
        >
          <div className="mb-8 flex items-start justify-between border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">{post.title}</h2>
              <p className="mt-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                Created by <span className="text-indigo-600">{post.user.name}</span> on{" "}
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-600">
            {post.body}
          </div>

          {user && user.id === post.user_id && (
            <div className="mt-10 flex items-center justify-end gap-3 border-t border-slate-100 pt-8">
              <Link
                to={`/posts/update/${post.id}`}
                className="update-btn"
              >
                Update Post
              </Link>

              <form onSubmit={handleDelete}>
                <button className="delete-btn">
                  Delete Post
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className="title">Post Not Found!</p>
      )}
    </>
  );
}
