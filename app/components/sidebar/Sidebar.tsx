import DesktopSidebar from './DesktopSidebar';

interface SidebarProps {
	children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
	return (
		<div className="h-full">
			<DesktopSidebar />
			<main className="h-full lg:pl-20">{children}</main>
		</div>
	);
};

export default Sidebar;
