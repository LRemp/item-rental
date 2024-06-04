import {
  Button,
  Center,
  Fieldset,
  Loader,
  Modal,
  NumberInput,
  Select,
  TagsInput,
  TextInput,
  Textarea,
} from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { FormFileDropzone } from '../../FileDropzone/FormFileDropzone';
import { Error, Success } from '@/utils/Notifications';
import useUploadImage from '@/hooks/useUploadImage';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

interface CreateItemModalProps {
  opened: boolean;
  close: any;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({ opened, close }) => {
  const uploadImage = useUploadImage();
  const form = useForm({
    initialValues: {
      name: 'Demonstracinis daiktas',
      description: 'Demonstracinis aprašymas',
      category: 'other',
      serialNumber: 'BU98S-FRHK2-KSO1Y-ETA52-AMWB3',
      files: [],
      tags: ['Demonstracija', 'Naujas'],
    },
    validate: {
      name: (value) => (value.length <= 0 ? 'You must enter the item name' : null),
      category: (value) => (value.length <= 0 ? 'You must select a category' : null),
    },
  });

  const detailsForm = useForm();

  const [adding, add] = useDisclosure(false);

  const { request } = useApiResult(api.Item.create);

  const { result: categories, loading: loadingCategories } = useApiResult(
    () => api.Category.getAll(),
    []
  );

  const addItem = async (data: any) => {
    if (adding) return;
    add.open();

    const notificationId = notifications.show({
      loading: true,
      title: 'Loading',
      message: 'Creating item...',
      autoClose: false,
      withCloseButton: false,
    });

    let imageUpload;

    if (data.files.length > 0) {
      imageUpload = await uploadImage(data.files);

      if (!imageUpload.success) {
        add.close();
        return notifications.update(
          Error({
            id: notificationId,
            title: 'Error',
            message: 'Failed to upload images',
            autoClose: 2000,
          })
        );
      }
    }

    const details: any = [];
    const { scheme } = categories.find((item: any) => item.name === form.values.category);
    // eslint-disable-next-line no-restricted-syntax
    for (const key in scheme) {
      if (detailsForm.values[scheme[key].name]) {
        details.push({
          label: scheme[key].label,
          name: scheme[key].name,
          value: `${detailsForm.values[scheme[key].name]}`,
        });
      }
    }

    try {
      await request({
        name: data.name,
        description: data.description,
        category: data.category,
        images: imageUpload?.data,
        details,
        serialNumber: data.serialNumber,
        tags: data.tags,
      });

      notifications.update(
        Success({
          id: notificationId,
          title: 'Success',
          message: 'Item created!',
        })
      );
      close();
      add.close();
    } catch (e: any) {
      notifications.update(Error({ id: notificationId, title: 'Error', message: e.description }));
      add.close();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Pridėti naują daiktą"
      centered
      size="lg"
      closeOnClickOutside={!adding}
      closeOnEscape={!adding}
      withCloseButton={!adding}
    >
      {loadingCategories ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <form onSubmit={form.onSubmit((values) => addItem(values))}>
          <Fieldset disabled={adding} variant="unstyled">
            <TextInput
              label="Pavadinimas"
              placeholder="Pavadinimas"
              {...form.getInputProps('name')}
            />
            <Textarea
              label="Aprašymas"
              placeholder="Aprašymas"
              autosize
              {...form.getInputProps('description')}
            />

            <TextInput
              label="Serijinis numeris"
              placeholder="Įveskite serijinį numerį"
              {...form.getInputProps('serialNumber')}
            />

            <FormFileDropzone {...form.getInputProps('files')} />

            <Select
              label="Kategorija"
              placeholder="Pasirinkite kategoriją"
              data={categories.map((item: any) => ({ value: item.name, label: item.label }))}
              {...form.getInputProps('category')}
            />

            {form.values.category &&
              categories
                .find((item: any) => item.name === form.values.category)
                // eslint-disable-next-line array-callback-return
                .scheme?.map((item: any, index: number) => {
                  if (item.type === 'string') {
                    return (
                      <TextInput
                        key={index}
                        label={item.label}
                        placeholder={item.label}
                        {...detailsForm.getInputProps(item.name)}
                      />
                    );
                  }
                  if (item.type === 'select') {
                    return (
                      <Select
                        key={index}
                        label={item.label}
                        placeholder={`Select ${item.label.toLowerCase()}`}
                        data={item.options}
                        {...detailsForm.getInputProps(item.name)}
                      />
                    );
                  }
                  if (item.type === 'number') {
                    return (
                      <NumberInput
                        key={index}
                        label={item.label}
                        placeholder={item.label}
                        min={item.min}
                        max={item.max}
                        {...detailsForm.getInputProps(item.name)}
                      />
                    );
                  }
                })}

            <TagsInput
              label="Žymės"
              placeholder="Įveskite žymę"
              clearable
              {...form.getInputProps('tags')}
            />

            <Button fullWidth mt="md" type="submit" loading={adding}>
              Sukurti daiktą
            </Button>
          </Fieldset>
        </form>
      )}
    </Modal>
  );
};

export default CreateItemModal;
