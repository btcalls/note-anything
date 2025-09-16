import { Text } from 'react-native';

import type { TagItem } from '~/lib/supabase/supabaseAPI';

export default function TagPill({ tag }: { tag: TagItem }) {
  return (
    <Text className="w-fit rounded-md bg-brand px-2 py-1 font-medium color-white">{tag.name}</Text>
  );
}
