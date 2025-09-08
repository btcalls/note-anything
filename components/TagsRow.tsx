import { Text, View, ViewProps } from 'react-native';

import { TagItem } from '~/lib/supabase/supabaseAPI';
import { cn } from '~/lib/utils';

type Props = Pick<ViewProps, 'className'> & {
  tags: TagItem[];
};

export default function TagsRow({ tags, className }: Props) {
  const viewStyle = cn({
    'flex-row flex-wrap gap-2': true,
    [`${className}`]: !!className,
  });

  return (
    <View className={viewStyle}>
      {tags.map((tag) => (
        <Text
          key={tag.name}
          className="px-2 py-1 rounded-md color-white bg-brand w-fit font-medium"
        >
          {tag.name}
        </Text>
      ))}
    </View>
  );
}
