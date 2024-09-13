import { Link } from '@remix-run/react';

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <details open>
                <summary>Test</summary>
                <ul>
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                  <li>
                    <details open>
                      <summary>Parent</summary>
                      <ul>
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle avatar placeholder online">
            <div className="bg-primary-green text-white w-16 rounded-full">
              DT
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">Profile</Link>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
