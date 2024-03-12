"use client";
import { useState } from "react";
import Link from "next/link";
import { useLogout } from "../../hooks/useLogout";
import useAuthContext from "../../hooks/useAuthContext";
import styles from "./styles.module.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const toggle = () => {
    console.log("toggling"),
      isAdminExpanded,
      setIsAdminExpanded(!isAdminExpanded);
  };

  return (
    <header className="navbar bg-base-100">
      <div className="navbar-center hidden lg:flex w-full">
        <ul className="menu menu-horizontal px-1 w-full justify-between">
          {/* left aligned */}
          <li>
            <ul>
              <li>
                <Link href="/">
                  <h1>Home</h1>
                </Link>
              </li>
            </ul>
          </li>

          {/* center aligned */}
          <li>
            <ul>
              <li>
                {!user || (user && !user.email) ? (
                  <ul className="menu menu-horizontal px-1 pt-0">
                    <li>
                      <Link href="/signup">
                        <h1>Signup</h1>
                      </Link>
                    </li>
                    <li>
                      <Link href="/login">
                        <h1>Login</h1>
                      </Link>
                    </li>
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
          </li>
          {/* right aligned */}
          <li>
            <ul>
              <li>
                <div
                  open={isAdminExpanded}
                  onClick={toggle}
                  className={`${styles.accountIconContainer} p-0 self-end`}
                >
                  <img
                    src="/icon.png"
                    alt="account profile pic"
                    className={`${styles.accountIcon} p-0`}
                  />
                </div>
                {isAdminExpanded && (
                  <ul className="p-2">
                    <li>
                      <Link
                        href="/account/storeDetails/create"
                        onClick={toggle}
                      >
                        Create Store
                      </Link>
                    </li>
                    <li>
                      <Link href="/account/storeDetails" onClick={toggle}>
                        Store Profile
                      </Link>
                    </li>
                  </ul>
                )}

                {/* <Link href="/account">
              <h1>Account</h1>
            </Link> */}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
