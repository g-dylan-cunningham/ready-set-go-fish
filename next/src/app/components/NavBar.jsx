"use client";
import Link from "next/link";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  console.log("user", user);

  return (
    <header className="navbar bg-base-100">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">
              <h1>Home</h1>
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/todo">
              <h1>Todos</h1>
            </Link>
          </li>

          <li>
            {" "}
            {!user || (user && !user.email) ? (
              <ul className="menu menu-horizontal px-1 pt-0">
                <li><Link href="/signup">
                  <h1>Signup</h1>
                </Link></li>
                <li><Link href="/login">
                  <h1>Login</h1>
                </Link></li>
              </ul>
            ) : (
              <span>{user.email}</span>
            )}
          </li>

          <li>
            {" "}
            {user?.email && (
              <div>
                <button type="button" onClick={logout}>
                  LOGOUT
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
