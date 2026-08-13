"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { LayoutDashboard, MapPinned, Image, LogOut,Sliders } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    name: "Destination",
    href: "/admin/destination",
    icon: MapPinned,
  },

  {
    name: "Reviews",
    href: "/admin/upload",
    icon: Image,
  },
  {
    name: "Sliders",
    href: "/admin/hero",
    icon: Sliders,
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const [checkingAuth, setCheckingAuth] = useState(true);

  /* ======================================================
      CHECK LOGIN
  ====================================================== */

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token && pathname !== "/admin/login") {
      window.location.href = "/admin/login";
    } else {
      setCheckingAuth(false);
    }
  }, [pathname]);

  /* ======================================================
      LOADING
  ====================================================== */

  if (checkingAuth && pathname !== "/admin/login") {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-xl font-bold text-gray-700">
            Loading Admin Panel...
          </p>
        </div>
      </div>
    );
  }

  /* ======================================================
      LOGIN PAGE
  ====================================================== */

  if (pathname === "/admin/login") {
    return children;
  }

  /* ======================================================
      LOGOUT
  ====================================================== */

  const logout = () => {
    localStorage.removeItem("admin_token");

    localStorage.removeItem("admin_user");

    window.location.href = "/admin/login";
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside className="w-[280px] bg-black text-white flex flex-col sticky top-0 h-screen">
        {/* LOGO */}

        <div className="h-20 border-b border-gray-800 flex items-center px-6 shrink-0">
          <div>
            <h1 className="text-2xl font-black">Travel Admin</h1>

            <p className="text-gray-400 text-sm mt-1">Management Panel</p>
          </div>
        </div>

        {/* MENU */}

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`
                    h-14
                    rounded-2xl
                    px-5
                    flex
                    items-center
                    gap-4
                    cursor-pointer
                    transition-all
                    duration-300
                    font-semibold
                    ${
                      active
                        ? "bg-white text-black shadow-lg"
                        : "text-gray-300 hover:bg-gray-900 hover:text-white"
                    }
                  `}
                >
                  <Icon size={22} />

                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* LOGOUT */}

        <div className="p-4 border-t border-gray-800 shrink-0">
          <button
            onClick={logout}
            className="
              w-full
              h-14
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              transition-all
              text-white
              font-bold
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ======================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* TOPBAR */}

        <header
          className="
            h-20
            bg-white
            border-b
            border-gray-200
            flex
            items-center
            justify-between
            px-8
            sticky
            top-0
            z-50
            shrink-0
          "
        >
          <div>
            <h2 className="text-2xl font-black text-gray-800">
              Admin Dashboard
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage your travel website professionally
            </p>
          </div>

          {/* PROFILE */}

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-gray-800">Admin</p>

              <p className="text-sm text-gray-500">Super Admin</p>
            </div>

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                font-black
                text-lg
              "
            >
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
