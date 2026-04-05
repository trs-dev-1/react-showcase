import { ImageUploader } from '@/shared/components/form/images-uploader/images-uploader';
import { Field, FieldError, FieldGroup } from '@/shared/components/ui/field';
import { Controller, useFormContext } from 'react-hook-form';
import { AddPropertyStepperType } from '../../schemas/add-property-stepper.schema';

type PhotosStepProps = {
  isSubmitting?: boolean;
};

export const PhotosStep: React.FC<PhotosStepProps> = ({ isSubmitting }) => {
  const form = useFormContext<AddPropertyStepperType>();

  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name="photosStep.photos"
        render={({ field, fieldState }) => (
          <Field className="flex min-h-52 flex-col items-center justify-center">
            <ImageUploader
              data={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error?.message]} />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
