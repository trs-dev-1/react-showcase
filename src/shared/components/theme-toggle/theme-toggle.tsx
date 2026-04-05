import { Toggle } from '@/shared/components/ui/toggle';
import { cn } from '@/shared/lib/utils';
import { useUIState } from '@/shared/state/use-ui-state';
import { Moon, Sun } from 'lucide-react';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { state, setState } = useUIState();

  return (
    <Toggle
      className={cn('size-9', className)}
      defaultPressed={state.themeMode === 'dark'}
      onPressedChange={(active) =>
        setState({
          themeMode: active ? 'dark' : 'light'
        })
      }
    >
      {state.themeMode === 'dark' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
