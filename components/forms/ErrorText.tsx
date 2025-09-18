import { View } from 'react-native';

import ThemedText from '../ThemedText';

type Props = {
  error?: string;
};

export default function ErrorText({ error }: Props) {
  return (
    <View className="h-6 w-full items-start">
      {error && <ThemedText className="text-sm font-medium text-destructive">{error}</ThemedText>}
    </View>
  );
}
