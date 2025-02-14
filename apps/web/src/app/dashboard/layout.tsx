import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { type LayoutProps } from '@/types';
import { NavMain, NavProjects, NavUser, TeamSwitcher } from '@/components/Sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@workspace/ui/components/sidebar';
import { Separator } from '@workspace/ui/components/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@workspace/ui/components/breadcrumb';

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
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
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
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
}
