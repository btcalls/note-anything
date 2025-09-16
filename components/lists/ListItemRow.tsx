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
        <ThemedText type="title" numberOfLines={2} lineBreakMode="tail" className="mr-4 flex-1">
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
    <View className="mx-4 h-[90px] justify-center gap-2 rounded-lg bg-background p-4 shadow-sm shadow-label/35">
      <View className="flex-row items-center justify-between">
        <View className="h-8 w-2/4 skeleton" />
        <View className="h-4 w-16 skeleton" />
      </View>

      <View className="flex-row gap-2">
        <View className="h-6 w-20 skeleton" />
        <View className="h-6 w-14 skeleton" />
      </View>
    </View>
  );
}
