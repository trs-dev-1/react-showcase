import { useAuthModal, useIsAuthenticated } from '@/domains/auth';
import { useToast } from '@/shared/hooks/utils/use-toast';
import { useTranslation } from 'react-i18next';
import { FaHandPointUp, FaRegHeart } from 'react-icons/fa';
import { IoChevronDownOutline, IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Choose, Otherwise, When } from '@/shared/components/conditional-rendering';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import { useAddZoneToFavoritesMutation } from './use-add-zone-to-favorites-mutation';


type DrawingControllersProps = {
  enabled: boolean;
  drawingStarted: boolean;
  hasSelection: boolean;
  startDrawing: () => void;
  cancelDrawing: () => void;
  onSelectionClear: () => void;
};

export const DrawingControllers: React.FC<DrawingControllersProps> = ({
  cancelDrawing,
  drawingStarted,
  enabled,
  hasSelection,
  onSelectionClear,
  startDrawing
}) => {
  const { toast } = useToast();
  const [t] = useTranslation();
  const isAuthenticated = useIsAuthenticated();
  const { mutate, isPending } = useAddZoneToFavoritesMutation();
  const { onOpen } = useAuthModal();

  const onAddZoneToFavorite = () => {
    if (!isAuthenticated) {
      onOpen({ redirectData: 'current_path' });
      return;
    }

    mutate();
  };

  function shareMapView(): void {
    navigator.clipboard.writeText(window.location.href);

    toast({
      message: 'the-link-has-been-copied',
      type: 'success'
    });
  }

  if (!enabled) return null;

  return (
    <div className="absolute top-1 right-2 z-10 flex translate-x-0 gap-2">
      <Choose>
        <When condition={drawingStarted}>
          <Button
            className="flex items-center gap-1"
            variant="destructive"
            onClick={cancelDrawing}
            size="sm"
          >
            {t('cancel')}
            <IoClose />
          </Button>
        </When>

        <Otherwise>
          <Choose>
            <When condition={hasSelection}>
              <Button
                className="flex items-center gap-1"
                variant="destructive"
                onClick={onSelectionClear}
                size="sm"
              >
                {t('clear-selection')}
                <MdDelete />
              </Button>
            </When>

            <Otherwise>
              <Button
                className="flex items-center gap-1"
                onClick={startDrawing}
                size="sm"
              >
                {t('select-an-area-on-the-map')}
                <FaHandPointUp />
              </Button>
            </Otherwise>
          </Choose>
        </Otherwise>
      </Choose>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="icon-sm">
            <IoChevronDownOutline />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          className="w-[--radix-popper-anchor-width]"
        >
          <DropdownMenuItem
            className="flex items-center gap-1"
            onClick={shareMapView}
          >
            {t('share-this-map-view')}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-1"
            onClick={onAddZoneToFavorite}
            disabled={!hasSelection || isPending}
          >
            {t('save-the-selected-zone')}
            <FaRegHeart className="text-destructive" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
