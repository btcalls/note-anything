import { Text, TouchableOpacity } from 'react-native';

import { TagItem } from '~/lib/supabase/supabaseAPI';
import { cn } from '~/lib/utils';

export type SelectableTagItem = TagItem & {
  isSelected: boolean;
};

type Props = {
  tag: SelectableTagItem;
  onToggle: (tag: SelectableTagItem) => void;
};

export default function SelectableTagPill({ tag, onToggle }: Props) {
  return (
    <TouchableOpacity onPress={() => onToggle({ ...tag, isSelected: !tag.isSelected })}>
      <Text
        className={cn({
          'px-4 py-2 rounded-md w-fit font-semibold text-lg': true,
          'border border-label text-label': !tag.isSelected,
          'color-white border border-brand bg-brand': tag.isSelected,
        })}
      >
        {tag.name}
      </Text>
    </TouchableOpacity>
  );
}
