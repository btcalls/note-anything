import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import FormTagsRow from '~/components/forms/FormTagsRow';
import FormTextInput from '~/components/forms/FormTextInput';
import { ThemedView } from '~/components/ThemedView';
import { useGetTagsQuery } from '~/lib/supabase/supabaseAPI';

type FormData = {
  name: string;
  tags: number[];
};

export default function ListModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      tags: [],
    },
  });
  const { data: tags } = useGetTagsQuery();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <ThemedView className="items-start justify-end gap-4 px-4 py-8">
      <FormTextInput<FormData>
        name="name"
        control={control}
        rules={{ required: true, minLength: 3, maxLength: 25 }}
        error={errors.name}
        label="Your List Is..."
        placeholder="e.g. My Favorites"
        autoFocus
        clearButtonMode="while-editing"
        enterKeyHint="done"
        autoCorrect={false}
      />

      {tags && (
        <FormTagsRow<FormData>
          name="tags"
          control={control}
          rules={{ minLength: 1 }}
          tags={tags}
          label="Which is About..."
        />
      )}

      <View className="flex-1" />

      <View className="flex-row gap-4 border-t border-gray-400 pt-6">
        <TouchableOpacity className="btn-cancel" onPress={() => router.back()}>
          <Text className="text-lg font-semibold text-destructiveForeground">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity className="btn-form" onPress={handleSubmit(onSubmit)}>
          <Text className="text-lg font-semibold text-foreground">Create!</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
