import { View, type ViewProps } from 'react-native';

import { ListItem } from '~/lib/supabase/supabaseAPI';
import { cn } from '~/lib/utils';

import PressableLink from '../PressableLink';
import { ThemedText } from '../ThemedText';

import TagsRow from './tags/TagsRow';

type Props = Pick<ViewProps, 'className'> & {
  item: ListItem;
};

export default function ListItemRow({ item, className }: Props) {
  const linkStyle = cn({
    'gap-2 p-4 mx-4 rounded-lg shadow-sm shadow-label/35': true,
    [`${className}`]: !!className,
  });

  return (
    <PressableLink
      className={linkStyle}
      href={{ pathname: '/lists/[id]', params: { id: item.id } }}
    >
      <View className="flex-row items-center justify-between">
        <ThemedText type="title" numberOfLines={2} lineBreakMode="tail" className="flex-1 mr-4">
          {item.name}
        </ThemedText>
        <ThemedText type="details">{new Date(item.modified_at).toLocaleDateString()}</ThemedText>
      </View>

      <TagsRow tags={item.tags} />
    </PressableLink>
  );
}

export function SkeletonListItemRow() {
  return (
    <View className="justify-center gap-2 p-4 mx-4 rounded-lg shadow-sm shadow-label/35 bg-background h-[90px]">
      <View className="flex-row items-center justify-between">
        <View className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-2/4 animate-pulse" />
        <View className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse" />
      </View>

      <View className="flex-row gap-2">
        <View className="h-6 rounded-md bg-gray-200 dark:bg-gray-700 w-20 animate-pulse" />
        <View className="h-6 rounded-md bg-gray-200 dark:bg-gray-700 w-14 animate-pulse" />
      </View>
    </View>
  );
}
