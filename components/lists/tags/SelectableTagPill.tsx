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
          'w-fit rounded-md px-4 py-2 text-lg font-semibold': true,
          'border border-label text-label': !tag.isSelected,
          'border border-brand bg-brand color-white': tag.isSelected,
        })}
      >
        {tag.name}
      </Text>
    </TouchableOpacity>
  );
}
