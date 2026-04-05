import { SidebarProvider } from '@/shared/components/ui/sidebar';
import { Navbar } from './navbar/navbar';
import { AppSidebar } from './sidebar/app-sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="grow overflow-y-auto">{children}</main>
      <AppSidebar />
    </SidebarProvider>
  );
};
