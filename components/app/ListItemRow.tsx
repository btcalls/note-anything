import { Text, View, type ViewProps } from 'react-native';

import { ListItem } from '~/lib/supabase/supabaseAPI';

import PressableLink from '../PressableLink';
import { ThemedText } from '../ThemedText';

type Props = Pick<ViewProps, 'className'> & {
  item: ListItem;
};

export default function ListItemRow({ item, className }: Props) {
  return (
    <PressableLink
      className={className}
      href={{ pathname: '/details/[id]', params: { id: item.id } }}
    >
      <View className="flex-row items-center justify-between">
        <ThemedText type="title">{item.name}</ThemedText>
        <ThemedText className="color-slate-500 text-sm">
          {new Date(item.modified_at).toLocaleDateString()}
        </ThemedText>
      </View>

      <View className="mt-2 flex-row flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Text
            key={tag.name}
            className="px-2 py-1 rounded-md color-white bg-red-400 dark:bg-red-500 w-fit font-medium"
          >
            {tag.name}
          </Text>
        ))}
      </View>
    </PressableLink>
  );
}
