import { useLocalization } from '@fluent/react';

interface AgentHeaderProps {
  title: string;
  profileInfo?: string;
  onChangeProfile?: () => void;
}

export function AgentHeader({ title, profileInfo, onChangeProfile }: AgentHeaderProps) {
  const { l10n } = useLocalization();
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-borderSubtle">
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full bg-blockTeal mr-2" />
        <span className="text-sm">
          <span className="text-textSubtle">{l10n.getString('agent-label')}</span>{' '}
          <span className="text-textStandard">{title}</span>
        </span>
      </div>
      {profileInfo && (
        <div className="flex items-center text-sm">
          <span className="text-textSubtle">{profileInfo}</span>
          {onChangeProfile && (
            <button onClick={onChangeProfile} className="ml-2 text-blockTeal hover:underline">
              {l10n.getString('change-profile')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
