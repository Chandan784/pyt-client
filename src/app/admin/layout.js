"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  MapPinned,
  Image,
  LogOut,
  SlidersHorizontal,
  Users,
  MessageSquare,
  FileText,
  CalendarCheck,
  CreditCard,
  Star,
  Upload,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Sales & CRM",
    items: [
      {
        name: "Enquiries",
        href: "/admin/enqueries",
        icon: MessageSquare,
      },
      {
        name: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
      {
        name: "Quotations",
        href: "/admin/quotation",
        icon: FileText,
      },
      {
        name: "Bookings",
        href: "/admin/bookings",
        icon: CalendarCheck,
      },
    ],
  },

  {
    title: "Finance",
    items: [
      {
        name: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
      },
    ],
  },

  {
    title: "Content",
    items: [
      {
        name: "Destinations",
        href: "/admin/destination",
        icon: MapPinned,
      },
      {
        name: "Hero / Sliders",
        href: "/admin/hero",
        icon: SlidersHorizontal,
      },
      {
        name: "Reviews",
        href: "/admin/upload",
        icon: Star,
      },

    ],
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [openGroups, setOpenGroups] = useState({
    "Sales & CRM": true,
    Finance: true,
    Content: true,
  });

  const [checkingAuth, setCheckingAuth] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | AUTH CHECK
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    // Keep your existing auth logic here if required.

    /*
    const token = localStorage.getItem("admin_token");

    if (!token && pathname !== "/admin/login") {
      window.location.href = "/admin/login";
      return;
    }
    */

    setCheckingAuth(false);
  }, [pathname]);

  /*
  |--------------------------------------------------------------------------
  | AUTO OPEN ACTIVE GROUP
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    navigation.forEach((group) => {
      const hasActiveItem = group.items.some((item) =>
        pathname === item.href || pathname.startsWith(`${item.href}/`)
      );

      if (hasActiveItem) {
        setOpenGroups((prev) => ({
          ...prev,
          [group.title]: true,
        }));
      }
    });
  }, [pathname]);

  /*
  |--------------------------------------------------------------------------
  | GROUP TOGGLE
  |--------------------------------------------------------------------------
  */

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | ACTIVE ROUTE
  |--------------------------------------------------------------------------
  */

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    window.location.href = "/admin/login";
  };

  /*
  |--------------------------------------------------------------------------
  | PAGE TITLE
  |--------------------------------------------------------------------------
  */

  const getPageTitle = () => {
    for (const group of navigation) {
      const activeItem = group.items.find((item) => isActive(item.href));

      if (activeItem) {
        return activeItem.name;
      }
    }

    return "Dashboard";
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8]">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-900">
      {/* ============================================================
          MOBILE OVERLAY
      ============================================================ */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ============================================================
          SIDEBAR
      ============================================================ */}

      <aside
        className={`
          fixed
          left-0
          top-0
          bottom-0
          z-50
          flex
          flex-col
          bg-[#0b0d10]
          text-white
          border-r
          border-white/[0.06]
          transition-all
          duration-300
          
          ${
            collapsed
              ? "w-[82px]"
              : "w-[270px]"
          }

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ========================================================
            BRAND
        ======================================================== */}

        <div
          className={`
            h-[72px]
            flex
            items-center
            border-b
            border-white/[0.06]
            px-5
            ${
              collapsed
                ? "justify-center"
                : "justify-between"
            }
          `}
        >
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm">
                TA
              </div>

              <div>
                <h1 className="text-sm font-semibold tracking-tight">
                  Travel Admin
                </h1>

                <p className="text-[10px] text-gray-500 mt-0.5">
                  Management Panel
                </p>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm">
              TA
            </div>
          )}

          {/* Mobile Close */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* ========================================================
            NAVIGATION
        ======================================================== */}

        <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin">
          {navigation.map((group) => {
            const isGroupOpen = openGroups[group.title];

            return (
              <div key={group.title} className="mb-5">
                {/* GROUP HEADER */}

                {!collapsed ? (
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      px-3
                      mb-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-gray-500
                      hover:text-gray-300
                    "
                  >
                    <span>{group.title}</span>

                    {isGroupOpen ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                ) : (
                  <div className="h-px bg-white/[0.06] mx-3 mb-3" />
                )}

                {/* GROUP ITEMS */}

                {(collapsed || isGroupOpen) && (
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          title={collapsed ? item.name : undefined}
                          className={`
                            group
                            relative
                            flex
                            items-center
                            ${
                              collapsed
                                ? "justify-center"
                                : "gap-3"
                            }
                            min-h-[44px]
                            px-3
                            rounded-xl
                            text-sm
                            transition-all
                            duration-200
                            
                            ${
                              active
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
                            }
                          `}
                        >
                          {/* Active indicator */}

                          {active && !collapsed && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-black" />
                          )}

                          <Icon
                            size={18}
                            strokeWidth={active ? 2.2 : 1.8}
                            className={`
                              shrink-0
                              ${
                                active
                                  ? "text-black"
                                  : "text-gray-500 group-hover:text-white"
                              }
                            `}
                          />

                          {!collapsed && (
                            <span className="flex-1 truncate font-medium">
                              {item.name}
                            </span>
                          )}

                          {/* Active dot in collapsed mode */}

                          {active && collapsed && (
                            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================
            BOTTOM
        ======================================================== */}

        <div className="border-t border-white/[0.06] p-3">
          {/* ADMIN PROFILE */}

          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/[0.04]">
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                A
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  Administrator
                </p>

                <p className="text-[11px] text-gray-500 truncate">
                  Travel Management
                </p>
              </div>
            </div>
          )}

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`
              w-full
              flex
              items-center
              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
              px-3
              min-h-[44px]
              rounded-xl
              text-sm
              text-gray-400
              hover:bg-red-500/10
              hover:text-red-400
              transition
            `}
          >
            <LogOut size={18} />

            {!collapsed && (
              <span className="font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ============================================================
          MAIN AREA
      ============================================================ */}

      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ${
            collapsed
              ? "lg:pl-[82px]"
              : "lg:pl-[270px]"
          }
        `}
      >
        {/* ========================================================
            TOPBAR
        ======================================================== */}

        <header
          className="
            sticky
            top-0
            z-30
            h-[72px]
            bg-white/90
            backdrop-blur-xl
            border-b
            border-gray-200
          "
        >
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-3">
              {/* Mobile Menu */}

              <button
                onClick={() => setSidebarOpen(true)}
                className="
                  lg:hidden
                  w-10
                  h-10
                  rounded-xl
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                "
              >
                <Menu size={19} />
              </button>

              {/* Desktop Collapse */}

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="
                  hidden
                  lg:flex
                  w-10
                  h-10
                  rounded-xl
                  border
                  border-gray-200
                  items-center
                  justify-center
                  hover:bg-gray-50
                  transition
                "
                title={
                  collapsed
                    ? "Expand sidebar"
                    : "Collapse sidebar"
                }
              >
                {collapsed ? (
                  <PanelLeftOpen size={18} />
                ) : (
                  <PanelLeftClose size={18} />
                )}
              </button>

              <div className="hidden sm:block">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                  Admin
                </p>

                <h2 className="text-lg font-semibold tracking-tight">
                  {getPageTitle()}
                </h2>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-2">
              {/* Search */}

              <button
                className="
                  hidden
                  md:flex
                  items-center
                  gap-3
                  h-10
                  px-3
                  min-w-[190px]
                  rounded-xl
                  border
                  border-gray-200
                  text-gray-400
                  text-sm
                  hover:bg-gray-50
                "
              >
                <Search size={16} />

                <span>Search...</span>

                <span className="ml-auto text-[10px] border border-gray-200 rounded px-1.5 py-0.5">
                  /
                </span>
              </button>

              {/* Notification */}

              <button
                className="
                  relative
                  w-10
                  h-10
                  rounded-xl
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                "
              >
                <Bell size={18} />

                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>

              {/* Profile */}

              <div className="hidden sm:flex items-center gap-2 ml-1 pl-3 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
                  A
                </div>

                <div className="hidden xl:block">
                  <p className="text-sm font-medium">
                    Admin
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================
            PAGE CONTENT
        ======================================================== */}

        <main className="p-4 sm:p-6 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}