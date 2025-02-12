import { Metadata } from 'next';
import { LayoutProps } from '@/types';
import { NavMain, NavProjects, NavUser, TeamSwitcher } from '@/components/Sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@workspace/ui/components/sidebar';
import { userDetail, navMainDetails, projectsDetails, teamDetails } from './details';

export const metadata: Metadata = {
  title: 'Dashboard | Fullstack Starter',
  description: 'Dashboard in Turborepo Fullstack Starter Next.js App',
};

/**
 * DashboardPageLayout is the main layout component for the dashboard page.
 * It provides a sidebar with collapsible icons, header, content, footer, and rail.
 * The sidebar content includes team switcher, main navigation, project navigation, and user navigation.
 * The children of this component are rendered inside the SidebarInset.
 *
 * @param {LayoutProps} props - The properties passed to the layout component.
 *
 * Detafetch: https://ui.shadcn.com/docs/components/sidebar#data-fetching
 */
export default async function DashboardPageLayout(props: LayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible='icon' {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={teamDetails} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navMainDetails} />
          <NavProjects projects={projectsDetails} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userDetail} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
