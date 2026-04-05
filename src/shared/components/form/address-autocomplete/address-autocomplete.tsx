import { environment } from '@/environment';
import { AddressAutocompleteType } from '@/shared/interfaces/forms/address-autocomplete.interfaces';
import { AddressAutocompleteValueDef } from '@/shared/schemas/address-autocomplete.schema';
import { APIProvider } from '@vis.gl/react-google-maps';
import { CommandGroup } from 'cmdk';
import { FocusEventHandler, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Command, CommandItem, CommandList } from '../../ui/command';
import { Input } from '../../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Spinner } from '../../ui/spinner';
import { useAddressAutocomplete } from './use-address-autocomplete';

type AddressAutocompleteProps = {
  className?: string;
  defaultValue?: AddressAutocompleteValueDef;
  onChange: (value: AddressAutocompleteValueDef) => void;
  placeholderKey?: string;
  type?: AddressAutocompleteType;
  id?: string;
};

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  id,
  className,
  defaultValue,
  onChange,
  placeholderKey = 'address',
  type = 'address'
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [inputWidth, setInputWidth] = useState(200);

  const { handleChange, handleSelect, predictions, isLoading } =
    useAddressAutocomplete({
      inputRef,
      defaultValue,
      type,
      apiLoaded,
      onChange
    });

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [isOpened]);

  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsOpened(true);
    e.target.setSelectionRange(0, e.target.value.length);
  };

  return (
    <APIProvider
      apiKey={environment.googleAPIKey}
      onLoad={() => setApiLoaded(true)}
      language="en"
      libraries={['places']}
    >
      <Popover open={isOpened && !!predictions.length} modal>
        <PopoverTrigger asChild>
          <div className={className || ''}>
            <div className="relative">
              <Input
                id={id}
                className={className || ''}
                placeholder={t(placeholderKey)}
                type="text"
                ref={inputRef}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={() => setTimeout(() => setIsOpened(false), 100)}
              />
              {isLoading && (
                <Spinner
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  size="small"
                />
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="bg-popover dark p-0"
          style={{ width: inputWidth }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandList>
              <CommandGroup onClick={(e) => e.stopPropagation()}>
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    value={prediction.place_id}
                    onSelect={handleSelect}
                  >
                    {prediction.description}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </APIProvider>
  );
};
