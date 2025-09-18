import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';

import FormTagsRow from '~/components/forms/FormTagsRow';
import FormTextInput from '~/components/forms/FormTextInput';
import SkeletonTagsRow from '~/components/skeleton/SkeletonTagsRow';
import ThemedView from '~/components/ThemedView';
import { useGetTagsQuery } from '~/lib/supabase/supabaseAPI';

const schema = yup.object({
  name: yup
    .string()
    .min(4, 'Must be at least ${min} characters.')
    .required('You must provide a name for your list.'),
  tags: yup
    .array()
    .of(yup.number().positive().integer().required('At least one tag is needed.'))
    .min(1)
    .required(),
});

type FormData = yup.InferType<typeof schema>;

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
    resolver: yupResolver(schema),
  });
  const { data: tags, isLoading } = useGetTagsQuery();

  const onSubmit = (data: FormData) => console.log(data);

  // TODO: Handle errors
  return (
    <ThemedView className="items-start justify-end gap-4 px-4 py-8">
      <FormTextInput<FormData>
        name="name"
        control={control}
        error={errors.name}
        label="Your List Is..."
        placeholder="e.g. My Favorites"
        autoFocus
        clearButtonMode="while-editing"
        enterKeyHint="done"
        autoCorrect={false}
      />

      {isLoading ? (
        <SkeletonTagsRow />
      ) : (
        tags && (
          <FormTagsRow<FormData>
            name="tags"
            control={control}
            tags={tags}
            label="Which is About..."
          />
        )
      )}

      <View className="spacer" />

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
