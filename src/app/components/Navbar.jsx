"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiStar,
  FiMapPin,
  FiGlobe,
  FiHome,
  FiPhone,
  FiMail,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiCalendar,
  FiShield,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";

import { logout } from "@/store/slices/authSlice";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);

  const menuRef = useRef(null);
  const accountRef = useRef(null);

  /* --------------------------------
     USER / ROLE
  -------------------------------- */

  const normalizedRole = String(
    user?.role ?? user?.type ?? ""
  ).toLowerCase();

  const isAdmin =
    normalizedRole === "admin" || user?.isAdmin === true;

  const userInitial = useMemo(() => {
    const value =
      user?.name?.trim() ||
      user?.email?.trim() ||
      "U";

    return value.charAt(0).toUpperCase();
  }, [user]);

  /* --------------------------------
     DESTINATIONS
  -------------------------------- */

  const domesticDestinations = useMemo(() => {
    return destinations.filter(
      (item) =>
        String(item.type || "").toLowerCase() === "domestic"
    );
  }, [destinations]);

  const internationalDestinations = useMemo(() => {
    return destinations.filter(
      (item) =>
        String(item.type || "").toLowerCase() === "international"
    );
  }, [destinations]);

  /* --------------------------------
     FETCH DESTINATIONS
  -------------------------------- */

  useEffect(() => {
    const controller = new AbortController();

    const loadDestinations = async () => {
      try {
        const response = await fetch(
          `${API_URL}/destinations`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load destinations: ${response.status}`
          );
        }

        const data = await response.json();

        setDestinations(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Destination loading error:",
            error
          );
        }
      }
    };

    loadDestinations();

    return () => controller.abort();
  }, []);

  /* --------------------------------
     CLOSE MENUS ON OUTSIDE CLICK
  -------------------------------- */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }

      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* --------------------------------
     ESCAPE KEY
  -------------------------------- */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setActiveMenu(null);
        setAccountOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* --------------------------------
     LOCK BODY WHEN MOBILE DRAWER OPEN
  -------------------------------- */

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* --------------------------------
     ACTIVE ROUTE
  -------------------------------- */

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /* --------------------------------
     CLOSE EVERYTHING
  -------------------------------- */

  const closeMenus = () => {
    setActiveMenu(null);
    setAccountOpen(false);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    closeMenus();
  };

  /* --------------------------------
     LOGOUT
  -------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    closeDrawer();

    router.replace("/");
  };

  /* --------------------------------
     DESTINATION LINK
  -------------------------------- */

  const DestinationLink = ({ destination }) => {
    const slug =
      destination.slug ||
      destination._id ||
      destination.id;

    return (
      <Link
        href={`/destinations/${slug}`}
        onClick={closeMenus}
        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-slate-50"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <FiMapPin size={15} />
        </div>

        <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 group-hover:text-blue-600">
          {destination.state ||
            destination.title ||
            "Destination"}
        </span>

        <FiArrowRight
          size={14}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
        />
      </Link>
    );
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / MAIN HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">

          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenus}
            className="group shrink-0"
          >
            <div className="relative flex items-center">
              <img
                src="/pvjlogo.png"
                alt="Prime Vista Journey"
                className="w-[205px] object-contain sm:w-[335px] lg:w-[155px]"
              />

             
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav
            ref={menuRef}
            className="hidden items-center gap-1 md:flex"
          >

            {/* HOME */}

            <Link
              href="/"
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <FiHome size={17} />
              Home
            </Link>

            {/* DOMESTIC */}

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setAccountOpen(false);
                  setActiveMenu(
                    activeMenu === "domestic"
                      ? null
                      : "domestic"
                  );
                }}
                aria-expanded={activeMenu === "domestic"}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeMenu === "domestic"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <FiMapPin size={17} />
                Domestic

                <FiChevronDown
                  size={15}
                  className={`transition-transform ${
                    activeMenu === "domestic"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {activeMenu === "domestic" && (
                <div className="absolute left-0 top-[calc(100%+10px)] w-[350px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                  <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <FiMapPin size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Explore India
                        </p>

                        <p className="text-xs text-slate-500">
                          Discover beautiful Indian destinations
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-[340px] overflow-y-auto p-2">
                    {domesticDestinations.length > 0 ? (
                      domesticDestinations.map(
                        (destination) => (
                          <DestinationLink
                            key={
                              destination._id ||
                              destination.id
                            }
                            destination={destination}
                          />
                        )
                      )
                    ) : (
                      <p className="px-3 py-6 text-center text-sm text-slate-400">
                        No domestic destinations available.
                      </p>
                    )}
                  </div>

                  <Link
                    href="/destinations"
                    onClick={closeMenus}
                    className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    View all destinations
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>

            {/* INTERNATIONAL */}

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setAccountOpen(false);
                  setActiveMenu(
                    activeMenu === "international"
                      ? null
                      : "international"
                  );
                }}
                aria-expanded={
                  activeMenu === "international"
                }
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  activeMenu === "international"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <FiGlobe size={17} />
                International

                <FiChevronDown
                  size={15}
                  className={`transition-transform ${
                    activeMenu === "international"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {activeMenu === "international" && (
                <div className="absolute left-0 top-[calc(100%+10px)] w-[350px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                  <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <FiGlobe size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Explore the World
                        </p>

                        <p className="text-xs text-slate-500">
                          International holidays made easy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-[340px] overflow-y-auto p-2">
                    {internationalDestinations.length >
                    0 ? (
                      internationalDestinations.map(
                        (destination) => (
                          <DestinationLink
                            key={
                              destination._id ||
                              destination.id
                            }
                            destination={destination}
                          />
                        )
                      )
                    ) : (
                      <p className="px-3 py-6 text-center text-sm text-slate-400">
                        No international destinations
                        available.
                      </p>
                    )}
                  </div>

                  <Link
                    href="/destinations"
                    onClick={closeMenus}
                    className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    View all destinations
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>

            {/* CONTACT */}

            <Link
              href="/contact"
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive("/contact")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <FiPhone size={17} />
              Contact
            </Link>
          </nav>

          {/* RIGHT SIDE */}

          <div className="hidden items-center gap-2 md:flex">

            {/* AUTH */}

            {!isAuthenticated ? (
              <Link
                href="/auth"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <FiLogIn size={17} />
                Login
              </Link>
            ) : (
              <div
                ref={accountRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu(null);
                    setAccountOpen(!accountOpen);
                  }}
                  aria-expanded={accountOpen}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {userInitial}
                  </span>

                  <span className="max-w-[110px] truncate text-sm font-semibold text-slate-700">
                    {user?.name || "Account"}
                  </span>

                  <FiChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform ${
                      accountOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-[calc(100%+10px)] w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                    {/* USER HEADER */}

                    <div className="bg-slate-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                          {userInitial}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {user?.type || "User"}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user?.email || ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">

                      <Link
                        href="/account"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <FiUser size={17} />
                        My Account
                      </Link>

                      <Link
                        href="/account/bookings"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <FiCalendar size={17} />
                        My Bookings
                      </Link>

                      <Link
                        href="/account/profile"
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <FiSettings size={17} />
                        Profile Settings
                      </Link>

                      {/* ADMIN */}

                      {isAdmin && (
                        <>
                          <div className="my-2 border-t border-slate-100" />

                          <Link
                            href="/admin"
                            onClick={closeMenus}
                            className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                          >
                            <FiShield size={17} />
                            Admin View
                            <FiArrowRight
                              size={15}
                              className="ml-auto"
                            />
                          </Link>
                        </>
                      )}

                      <div className="my-2 border-t border-slate-100" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
                      >
                        <FiLogOut size={17} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BOOK NOW */}

            <Link
              href="/packages"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              <FiStar
                size={16}
                fill="currentColor"
              />
              Book Now
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
          >
            <FiMenu size={21} />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {drawerOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeDrawer}
          className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[88%] max-w-[390px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          drawerOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* MOBILE HEADER */}

        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-slate-100 px-5">

          <Link
            href="/"
            onClick={closeDrawer}
            className="flex items-center"
          >
            <img
              src="/pvjlogo.png"
              alt="Prime Vista Journey"
              className="w-[150px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* =================================================
            ONE MOBILE MENU SECTION
        ================================================== */}

        <div className="flex-1 overflow-y-auto px-4 py-4">

          {/* ACCOUNT / LOGIN FIRST */}

          {!isAuthenticated ? (
            <Link
              href="/auth"
              onClick={closeDrawer}
              className="mb-2 flex items-center gap-3 rounded-2xl bg-blue-600 p-3.5 text-white shadow-sm transition active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <FiLogIn size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold">
                  Login / Create Account
                </p>

                <p className="mt-0.5 text-xs text-blue-100">
                  Manage your bookings and profile
                </p>
              </div>

              <FiArrowRight size={17} />
            </Link>
          ) : (
            <Link
              href="/account"
              onClick={closeDrawer}
              className="mb-2 flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 transition active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {userInitial}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900">
                  {user?.name || "My Account"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {user?.email || "View your account"}
                </p>
              </div>

              <FiArrowRight
                size={17}
                className="shrink-0 text-slate-400"
              />
            </Link>
          )}

          {/* NAVIGATION */}

          <div className="mt-2">

            {/* HOME */}

            <Link
              href="/"
              onClick={closeDrawer}
              className={`flex items-center gap-4 rounded-xl px-3.5 py-3.5 transition ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FiHome size={19} />

              <span className="flex-1 text-sm font-semibold">
                Home
              </span>

              <FiArrowRight
                size={15}
                className="text-slate-300"
              />
            </Link>

            {/* PACKAGES */}

            <Link
              href="/packages"
              onClick={closeDrawer}
              className={`flex items-center gap-4 rounded-xl px-3.5 py-3.5 transition ${
                isActive("/packages")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FiBriefcase size={19} />

              <span className="flex-1 text-sm font-semibold">
                Packages
              </span>

              <FiArrowRight
                size={15}
                className="text-slate-300"
              />
            </Link>

            {/* DESTINATIONS */}

            <Link
              href="/destinations"
              onClick={closeDrawer}
              className={`flex items-center gap-4 rounded-xl px-3.5 py-3.5 transition ${
                isActive("/destinations")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FiMapPin size={19} />

              <span className="flex-1 text-sm font-semibold">
                Destinations
              </span>

              <FiArrowRight
                size={15}
                className="text-slate-300"
              />
            </Link>

            {/* CONTACT */}

            <Link
              href="/contact"
              onClick={closeDrawer}
              className={`flex items-center gap-4 rounded-xl px-3.5 py-3.5 transition ${
                isActive("/contact")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FiPhone size={19} />

              <span className="flex-1 text-sm font-semibold">
                Contact Us
              </span>

              <FiArrowRight
                size={15}
                className="text-slate-300"
              />
            </Link>

            {/* ABOUT */}

            <Link
              href="/about"
              onClick={closeDrawer}
              className={`flex items-center gap-4 rounded-xl px-3.5 py-3.5 transition ${
                isActive("/about")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FiGlobe size={19} />

              <span className="flex-1 text-sm font-semibold">
                About Us
              </span>

              <FiArrowRight
                size={15}
                className="text-slate-300"
              />
            </Link>

            {/* ACCOUNT LINKS */}

            {isAuthenticated && (
              <>
                <div className="my-3 border-t border-slate-100" />

                <Link
                  href="/account/bookings"
                  onClick={closeDrawer}
                  className="flex items-center gap-4 rounded-xl px-3.5 py-3.5 text-slate-700 transition hover:bg-slate-50"
                >
                  <FiCalendar size={19} />

                  <span className="flex-1 text-sm font-semibold">
                    My Bookings
                  </span>

                  <FiArrowRight
                    size={15}
                    className="text-slate-300"
                  />
                </Link>

                <Link
                  href="/account/profile"
                  onClick={closeDrawer}
                  className="flex items-center gap-4 rounded-xl px-3.5 py-3.5 text-slate-700 transition hover:bg-slate-50"
                >
                  <FiSettings size={19} />

                  <span className="flex-1 text-sm font-semibold">
                    Profile Settings
                  </span>

                  <FiArrowRight
                    size={15}
                    className="text-slate-300"
                  />
                </Link>
              </>
            )}

            {/* ADMIN */}

            {isAuthenticated && isAdmin && (
              <>
                <div className="my-3 border-t border-slate-100" />

                <Link
                  href="/admin"
                  onClick={closeDrawer}
                  className="flex items-center gap-4 rounded-xl bg-blue-50 px-3.5 py-3.5 text-blue-600 transition hover:bg-blue-100"
                >
                  <FiShield size={19} />

                  <span className="flex-1 text-sm font-bold">
                    Admin View
                  </span>

                  <FiArrowRight size={15} />
                </Link>
              </>
            )}

            {/* LOGOUT */}

            {isAuthenticated && (
              <>
                <div className="my-3 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-4 rounded-xl px-3.5 py-3.5 text-red-500 transition hover:bg-red-50"
                >
                  <FiLogOut size={19} />

                  <span className="flex-1 text-left text-sm font-semibold">
                    Logout
                  </span>

                  <FiArrowRight size={15} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE BOTTOM CTA */}

        <div className="shrink-0 border-t border-slate-100 bg-white p-4">

          <Link
            href="/packages"
            onClick={closeDrawer}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition active:scale-[0.98]"
          >
            <FiStar
              size={16}
              fill="currentColor"
            />

            Book Your Journey
          </Link>

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
            <span>✈️ 500+ destinations</span>
            <span>•</span>
            <span>24/7 support</span>
          </div>
        </div>
      </aside>
    </>
  );
}