import { LoadingIcon } from './Icons';

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export function LoadingSpinner({ size = 24, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8">
      <LoadingIcon width={size} height={size} />
      {text && <p className="text-sm text-neutral-400">{text}</p>}
    </div>
  );
}
