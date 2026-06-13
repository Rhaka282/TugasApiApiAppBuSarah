import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="title">Latest Posts</h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-black leading-tight text-slate-900 line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {post.user.name} • {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <p className="mb-6 line-clamp-3 text-slate-600">
                {post.body}
              </p>

              <div className="mt-auto pt-4">
                <Link 
                  to={`/posts/${post.id}`} 
                  className="text-link text-sm uppercase tracking-widest"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-bold text-slate-400">There are no posts yet.</p>
      )}
    </>
  );
}
