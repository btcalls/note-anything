import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import FormField from '~/components/FormField';
import EditableTagsRow from '~/components/lists/tags/EditableTagsRow';
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
    <ThemedView className="items-start justify-end py-8 px-4 gap-4">
      <FormField<FormData>
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

      {tags && <EditableTagsRow tags={tags} label="Which is About..." />}

      <View className="flex-1" />

      <View className="flex-row gap-4 pt-6 border-t border-gray-400">
        <TouchableOpacity
          className="flex-1 border-2 border-destructive bg-destructive rounded-xl items-center justify-center h-14"
          onPress={() => router.back()}
        >
          <Text className="font-semibold text-lg text-destructiveForeground">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl bg-background border-foreground border-2 items-center justify-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-semibold text-lg text-foreground">Create!</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
