import { HeartIcon } from './Icons';

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  accentColor?: string;
}

const sizeClasses = {
  xs: 'w-9 h-9',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
  '2xl': 'w-32 h-32',
};

const iconSizes = {
  xs: 18,
  sm: 16,
  md: 20,
  lg: 32,
  xl: 40,
  '2xl': 64,
};

export function Avatar({ name, avatarUrl, size = 'md', accentColor = '#0d6efd' }: AvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}
      style={{ backgroundColor: avatarUrl ? 'transparent' : 'rgba(255, 255, 255, 0.1)' }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <HeartIcon
          width={iconSizes[size]}
          height={iconSizes[size]}
          style={{ color: accentColor }}
        />
      )}
    </div>
  );
}
