import { View, ViewProps } from 'react-native';

import type { TagItem } from '~/lib/supabase/supabaseAPI';
import { cn } from '~/lib/utils';

import TagPill from './TagPill';

type TagsRowProps = Pick<ViewProps, 'className'> & {
  tags: TagItem[];
};

export default function TagsRow({ tags, className }: TagsRowProps) {
  const viewStyle = cn({
    'flex-row flex-wrap gap-2': true,
    [`${className}`]: !!className,
  });

  return (
    <View className={viewStyle}>
      {tags.map((tag) => (
        <TagPill key={`${tag.id}`} tag={tag} />
      ))}
    </View>
  );
}
