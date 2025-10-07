import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import type { TagItem } from '~/lib/supabase/supabaseAPI';

// Forms
export interface BaseFormComponentProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?:
    | Omit<RegisterOptions<T, Path<T>>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>
    | undefined;
  label?: string;
}

export interface FormTextInputProps<T extends FieldValues>
  extends BaseFormComponentProps<T>,
    Omit<TextInputProps, 'onChange' | 'onChangeText' | 'onBlur' | 'ref'> {}

export interface FormTagsProps<T extends FieldValues> extends BaseFormComponentProps<T> {
  tags: TagItem[];
}

// Skeleton
export type SkeletonProps = {
  length?: number;
};
