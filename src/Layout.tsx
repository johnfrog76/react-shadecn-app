import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeComponent } from "@/pages/home/home.component";
import { ThemeProvider } from "@/providers/theme/theme.provider";
import { ModeToggle } from "@/components/mode-toggle";
import AuthProvider from "@/providers/auth/auth.provider";
import { LoginComponent } from "./pages/login/login.component";
import RecipesProvider from "./providers/recipes/recipes.provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeComponent />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
]);

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RecipesProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="p-8 w-full">
              <div className="pb-4 flex justify-between">
                <SidebarTrigger />
                <div>
                  <ModeToggle />
                </div>
              </div>
              <RouterProvider router={router} />
            </main>
          </SidebarProvider>
        </RecipesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Layout;
