import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '~/components/ThemedText';
import { ThemedView } from '~/components/ThemedView';

export default function ListModal() {
  return (
    <ThemedView className="items-center justify-end h-80 p-4 gap-4">
      <ThemedText type="subtitle" className="justify-start w-full flex-1">
        Tags
      </ThemedText>

      <View className="flex-row gap-4 h-16">
        <TouchableOpacity
          className="flex-1 bg-red-600 rounded-xl items-center justify-center shadow-sm shadow-label/35"
          onPress={() => router.back()}
        >
          <Text className="font-semibold text-lg text-white">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 rounded-xl bg-background border-foreground border-2 items-center justify-center shadow-sm shadow-label/35">
          <Text className="font-semibold text-lg text-foreground">Create!</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
