"use client";
import { useState } from "react";
import Link from "next/link";
import { useLogout } from "../../hooks/useLogout";
import useAuthContext from "../../hooks/useAuthContext";
import styles from "./styles.module.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user, details, store } = useAuthContext();
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const toggle = () => {
    isAdminExpanded, setIsAdminExpanded(!isAdminExpanded);
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
            <ul className="menu menu-horizontal px-1 pt-0">
              <li>
                {!user ||
                  (user && !user.email && (
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
                  ))}
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
                {isAdminExpanded && user?.email && (
                  <ul className="pt-2">
                    <li>
                      <span>Hello, {user.email}</span>
                    </li>
                    <li>
                      <Link href="/account/storeDetails" onClick={toggle}>
                        {store?.storeName ? "Store Settings" : "Create Store"}
                      </Link>
                    </li>
                    {store?.storePath && ( // if store is configured, show View Store link
                      <li>
                        <Link
                          href={`/store/${store?.storePath}`}
                          onClick={toggle}
                        >
                          {store?.storePath && "View Store"}
                        </Link>
                      </li>
                    )}
                    {store?.storePath && ( // if store is configured, show myStore link
                      <li>
                        <Link
                          href={`/${store?.storePath}/inventory`} // should go to add Item page if no items configured
                          onClick={toggle}
                        >
                          {store?.storePath && "Manage Store"}
                        </Link>
                      </li>
                    )}

                    <li>
                      <span>
                        <button type="button" onClick={logout}>
                          LOGOUT
                        </button>
                      </span>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
