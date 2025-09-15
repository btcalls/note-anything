import { Text } from 'react-native';

import type { TagItem } from '~/lib/supabase/supabaseAPI';

export default function TagPill({ tag }: { tag: TagItem }) {
  return (
    <Text className="px-2 py-1 rounded-md w-fit font-medium color-white bg-brand">{tag.name}</Text>
  );
}
