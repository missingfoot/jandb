import type { TabType } from '@/types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  accentColor?: string;
}

const TABS: { id: TabType; label: string }[] = [
  { id: 'chat', label: 'Chat' },
  { id: 'links', label: 'Links' },
  { id: 'images', label: 'Images' },
  { id: 'files', label: 'Files' },
  { id: 'settings', label: 'Settings' },
];

export function TabNavigation({ activeTab, onTabChange, accentColor = '#0d6efd' }: TabNavigationProps) {
  return (
    <div className="flex border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)]">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 px-4 py-3 text-sm font-medium transition-all relative"
            style={{
              color: isActive ? accentColor : 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {tab.label}
            {isActive && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
