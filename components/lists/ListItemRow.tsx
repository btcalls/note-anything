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
