import { Text, TouchableOpacity } from 'react-native';

import { TagItem } from '~/lib/supabase/supabaseAPI';
import { cn } from '~/lib/utils';

export type SelectableTagItem = TagItem & {
  isSelected: boolean;
};

type Props = {
  tag: TagItem;
  isSelected: boolean;
  onToggle: (tagId: number, isSelected: boolean) => void;
};

export default function SelectableTagPill({ tag, isSelected, onToggle }: Props) {
  return (
    <TouchableOpacity
      className={cn({
        'h-12 w-fit items-center justify-center rounded-md px-4': true,
        'border border-label': !isSelected,
        'border border-brand bg-brand': isSelected,
      })}
      onPress={() => onToggle(tag.id, !isSelected)}
    >
      <Text
        className={cn({
          'text-lg font-semibold': true,
          'text-label': !isSelected,
          'text-white': isSelected,
        })}
      >
        {tag.name}
      </Text>
    </TouchableOpacity>
  );
}
