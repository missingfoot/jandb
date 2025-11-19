import type { TabType } from '@/types';
import { ChatIcon, LinksIcon, ImagesIcon, FilesIcon, SettingsIcon } from '@/components/shared/Icons';

interface SideNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  accentColor?: string;
}

const TABS: { id: TabType; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string }[] = [
  { id: 'chat', Icon: ChatIcon, label: 'Chat' },
  { id: 'links', Icon: LinksIcon, label: 'Links' },
  { id: 'images', Icon: ImagesIcon, label: 'Images' },
  { id: 'files', Icon: FilesIcon, label: 'Files' },
  { id: 'settings', Icon: SettingsIcon, label: 'Settings' },
];

export function SideNavigation({ activeTab, onTabChange, accentColor = '#0d6efd' }: SideNavigationProps) {
  return (
    <div className="w-24 flex flex-col border-r border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)]">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.Icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="h-20 flex flex-col items-center justify-center gap-1 transition-all relative"
            style={{
              backgroundColor: isActive ? `${accentColor}20` : 'transparent',
              color: isActive ? accentColor : '#999999',
            }}
            aria-label={tab.label}
          >
            <Icon />
            <span className="text-xs">{tab.label}</span>
            {isActive && (
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
