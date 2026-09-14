import { authStorage } from "@/shared/storage/authStorage";
import Spinner from "@/shared/ui/spinner/Spinner";
import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import PageNotFound from "./PageNotFound";
import { routes } from "./routes";

// AUTH
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const ProfilePage = lazy(() => import("@/features/auth/pages/ProfilePage"));

// STATISTICS
const Statistics = lazy(() => import("@/features/statistics"));

// BLOGS
const BlogsPage = lazy(() => import("@/features/blogs/pages/BlogsPage"));
const BlogsMainPage = lazy(
  () => import("@/features/blogs/pages/BlogsMainPage"),
);
const CreateBlogPage = lazy(
  () => import("@/features/blogs/pages/CreateBlogPage"),
);
const UpdateBlogPage = lazy(
  () => import("@/features/blogs/pages/UpdateBlogPage"),
);
const BlogSeoPage = lazy(() => import("@/features/blogs/pages/BlogSeoPage"));

// PAGES BUILDER
const AllPagesPage = lazy(
  () => import("@/features/pagesBuilder/pages/AllPagesPage"),
);
const CreatePageBuilder = lazy(
  () => import("@/features/pagesBuilder/pages/CreatePageBuilder"),
);
const UpdatePageBuilder = lazy(
  () => import("@/features/pagesBuilder/pages/UpdatePageBuilder"),
);

const Footer = lazy(() => import("@/features/footer/pages/Footer"));

// PROJECTS
const ProjectsPage = lazy(
  () => import("@/features/projects/pages/ProjectsPage"),
);
const ProjectsSeoPage = lazy(
  () => import("@/features/projects/pages/AllProjectsSeoPage"),
);
const ProjectsMainPage = lazy(
  () => import("@/features/projects/pages/ProjectsMainPage"),
);
const CreateProjectPage = lazy(
  () => import("@/features/projects/pages/CreateProjectPage"),
);
const UpdateProjectPage = lazy(
  () => import("@/features/projects/pages/UpdateProjectPage"),
);

// SOLUTIONS
const SolutionsPage = lazy(
  () => import("@/features/solutions/pages/SolutionsPage"),
);
const SolutionsMainPage = lazy(
  () => import("@/features/solutions/pages/SolutionsMainPage"),
);
const SolutionsSeoPage = lazy(
  () => import("@/features/solutions/pages/AllSolutionsSeoPage"),
);
const CreateSolutionPage = lazy(
  () => import("@/features/solutions/pages/CreateSolutionPage"),
);
const UpdateSolutionPage = lazy(
  () => import("@/features/solutions/pages/UpdateSolutionPage"),
);

const Header = lazy(() => import("@/features/header/pages/Header"));
const Clients = lazy(() => import("@/features/clients/pages/Clients"));
const Settings = lazy(() => import("@/features/settings/pages/Settings"));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<Spinner />}>{element}</Suspense>;
}

function RequireAuth({ children }: { children: ReactNode }) {
  const token = authStorage.getToken();
  return token ? <>{children}</> : <Navigate to={routes.login} replace />;
}

function RequireGuest({ children }: { children: ReactNode }) {
  const token = authStorage.getToken();
  return !token ? <>{children}</> : <Navigate to={routes.statistics} replace />;
}

export default function Navigation() {
  return (
    <Routes>
      {/* Public route */}
      <Route
        path={routes.login}
        element={<RequireGuest>{withSuspense(<LoginPage />)}</RequireGuest>}
      />

      {/* Protected routes */}
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={withSuspense(<Statistics />)} />

        <Route path={routes.blogs}>
          <Route index element={<Navigate replace to={routes.manageBlogs} />} />
          <Route
            path={routes.manageBlogs}
            element={withSuspense(<BlogsPage />)}
          />
          <Route
            path={routes.blogsMainPage}
            element={withSuspense(<BlogsMainPage />)}
          />
          <Route
            path={routes.blogsSeo}
            element={withSuspense(<BlogSeoPage />)}
          />
          <Route
            path={routes.createBlog}
            element={withSuspense(<CreateBlogPage />)}
          />
          <Route
            path={routes.updateBlog}
            element={withSuspense(<UpdateBlogPage />)}
          />
        </Route>

        <Route path={routes.pagesBuilder}>
          <Route index element={withSuspense(<AllPagesPage />)} />
          <Route
            path={routes.createPage}
            element={withSuspense(<CreatePageBuilder />)}
          />
          <Route
            path={routes.updatePage}
            element={withSuspense(<UpdatePageBuilder />)}
          />
        </Route>

        <Route path={routes.footer} element={withSuspense(<Footer />)} />

        <Route path={routes.projects}>
          <Route
            index
            element={<Navigate replace to={routes.manageProjects} />}
          />
          <Route
            path={routes.manageProjects}
            element={withSuspense(<ProjectsPage />)}
          />
          <Route
            path={routes.projectsMainPage}
            element={withSuspense(<ProjectsMainPage />)}
          />
          <Route
            path={routes.projectsSeo}
            element={withSuspense(<ProjectsSeoPage />)}
          />
          <Route
            path={routes.createProject}
            element={withSuspense(<CreateProjectPage />)}
          />
          <Route
            path={routes.updateProject}
            element={withSuspense(<UpdateProjectPage />)}
          />
        </Route>

        <Route path={routes.solutions}>
          <Route
            index
            element={<Navigate replace to={routes.manageSolutions} />}
          />
          <Route
            path={routes.manageSolutions}
            element={withSuspense(<SolutionsPage />)}
          />
          <Route
            path={routes.solutionsMainPage}
            element={withSuspense(<SolutionsMainPage />)}
          />
          <Route
            path={routes.solutionsSeo}
            element={withSuspense(<SolutionsSeoPage />)}
          />
          <Route
            path={routes.createSolution}
            element={withSuspense(<CreateSolutionPage />)}
          />
          <Route
            path={routes.updateSolution}
            element={withSuspense(<UpdateSolutionPage />)}
          />
        </Route>

        <Route path={routes.header} element={withSuspense(<Header />)} />
        <Route path={routes.clients} element={withSuspense(<Clients />)} />
        <Route path={routes.settings} element={withSuspense(<Settings />)} />
        <Route path={routes.profile} element={withSuspense(<ProfilePage />)} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
