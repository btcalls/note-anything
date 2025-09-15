import { useState } from 'react';
import { View, ViewProps } from 'react-native';

import { ThemedText } from '~/components/ThemedText';
import { TagItem } from '~/lib/supabase/supabaseAPI';
import { cn } from '~/lib/utils';

import type { SelectableTagItem } from './SelectableTagPill';
import SelectableTagPill from './SelectableTagPill';

type EditableTagsRowProps = Pick<ViewProps, 'className'> & {
  tags: TagItem[];
  label?: string;
};

export default function EditableTagsRow({ tags: items, label, className }: EditableTagsRowProps) {
  const [tags, setTags] = useState<SelectableTagItem[]>(
    items.map((i) => ({ ...i, isSelected: false }))
  );

  const viewStyle = cn({
    'flex-1 gap-2': true,
    [`${className}`]: !!className,
  });

  const onTagToggle = (selectedTag: SelectableTagItem) => {
    setTags(
      tags.map((tag) => {
        if (tag.id === selectedTag.id) {
          return selectedTag;
        } else {
          return tag;
        }
      })
    );
  };

  return (
    <View className={viewStyle}>
      {label && (
        <ThemedText type="subtitle" className="w-full">
          {label}
        </ThemedText>
      )}

      <View className="flex-row flex-wrap gap-4">
        {tags.map((tag) => (
          <SelectableTagPill key={`${tag.id}`} tag={tag} onToggle={onTagToggle} />
        ))}
      </View>
    </View>
  );
}
