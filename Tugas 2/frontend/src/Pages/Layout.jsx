import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <>
      <header>
        <div className="header-inner">
          <nav>
            <Link to="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-lg transition-transform group-hover:rotate-12">
                <span className="text-xl font-black italic">B</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-white">BLOGAPI</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/" className="nav-link">
                Home
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden h-10 w-[1px] bg-white/20 sm:block"></div>
                  <div className="hidden sm:block">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/50">Member</p>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                  </div>
                  
                  <Link to="/create" className="nav-link">
                    New Post
                  </Link>

                  <form onSubmit={handleLogout}>
                    <button className="rounded-full bg-white/10 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-rose-500">
                      Logout
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-[1px] bg-white/20"></div>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="min-h-screen">
        <Outlet />
      </main>

      <footer>
        <div className="mx-auto max-w-screen-xl px-8">
          <p className="text-sm font-bold text-slate-400">
            © {new Date().getFullYear()} <span className="text-indigo-600">BLOGAPI</span>. Built with Passion.
          </p>
        </div>
      </footer>
    </>
  );
}
