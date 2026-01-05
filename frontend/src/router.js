import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("../src/Home.vue"),
    meta: { requiresUser: true },
  },
  {
    path: "/",
    name: "Welcome",
    component: () => import("../src/components/Welcome.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../src/components/Products.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../src/components/Categories.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../src/components/About.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../src/components/Contact.vue"),
  },
  {
    path: "/offers",
    name: "Offers",
    component: () => import("../src/components/Offers.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../src/components/Checkout.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("../src/components/auth/AdminLogin.vue"),
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: () => import("../src/components/admin/AdminDashboard.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/add-perfume",
    name: "add-perfume",
    component: () => import("../src/components/admin/AddPerfume.vue"),
  },
  {
    path: "/admin/manage-perfumes",
    name: "manage-perfumes",
    component: () => import("../src/components/admin/ManagePerfumes.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const user = auth.user;

  if (to.meta.requiresUser) {
    if (!user || user.role !== "user") {
      return next("/");
    }
  }

  if (to.meta.requiresAdmin) {
    if (!user || user.role !== "admin") {
      return next("/admin/login");
    }
  }

  next();
});

export default router;
