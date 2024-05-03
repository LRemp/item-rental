import {
  Button,
  Center,
  Fieldset,
  Input,
  Loader,
  Modal,
  NumberInput,
  Select,
  TagsInput,
  TextInput,
  Textarea,
} from '@mantine/core';
import React from 'react';
import { FormFileDropzone } from '../../FileDropzone/FormFileDropzone';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Error, Success } from '@/utils/Notifications';
import { notifications } from '@mantine/notifications';
import useUploadImage from '@/hooks/useUploadImage';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';
import { DatePickerProps } from '@mantine/dates';

interface CreateItemModalProps {
  opened: boolean;
  close: any;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({ opened, close }) => {
  const uploadImage = useUploadImage();
  const form = useForm({
    initialValues: { name: '', description: '', category: '', files: [] },
    validate: {
      name: (value) => (value.length <= 0 ? 'You must enter the item name' : null),
      category: (value) => (value.length <= 0 ? 'You must select a category' : null),
    },
  });

  const detailsForm = useForm();

  const [adding, add] = useDisclosure(false);

  const { result, loading, error, request } = useApiResult(api.Item.create);

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

    var imageUpload;

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

    var details: any = [];
    var scheme = categories.find((item: any) => item.name === form.values.category).scheme;
    for (var key in scheme) {
      if (detailsForm.values[scheme[key].name]) {
        details.push({
          name: scheme[key].name,
          value: detailsForm.values[scheme[key].name] + '',
        });
      }
    }

    try {
      const createRequest = await request({
        name: data.name,
        description: data.description,
        category: data.category,
        images: imageUpload?.data,
        details: details,
        serialNumber: data.serialNumber,
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
    } catch (error: any) {
      notifications.update(
        Error({ id: notificationId, title: 'Error', message: error.description })
      );
      add.close();
    }
  };

  const changeCategory = (value: string | null) => {};

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Add new item"
      centered
      size={'lg'}
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
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')}></TextInput>
            <Textarea
              label="Description"
              placeholder="Description"
              autosize
              {...form.getInputProps('description')}
            ></Textarea>

            <TextInput
              label="Serial number"
              placeholder="Enter item serial number"
              {...form.getInputProps('serialNumber')}
            />

            <FormFileDropzone {...form.getInputProps('files')} />

            <Select
              label="Category"
              placeholder="Select category"
              data={categories.map((item: any) => ({ value: item.name, label: item.label }))}
              {...form.getInputProps('category')}
            />

            {form.values.category &&
              categories
                .find((item: any) => item.name === form.values.category)
                .scheme?.map((item: any, index: number) => {
                  if (item.type === 'string') {
                    return (
                      <TextInput
                        key={index}
                        label={item.label}
                        placeholder={item.label}
                        {...detailsForm.getInputProps(item.name)}
                      ></TextInput>
                    );
                  } else if (item.type == 'select') {
                    return (
                      <Select
                        key={index}
                        label={item.label}
                        placeholder={`Select ${item.label.toLowerCase()}`}
                        data={item.options}
                        {...detailsForm.getInputProps(item.name)}
                      />
                    );
                  } else if (item.type == 'number') {
                    return (
                      <NumberInput
                        key={index}
                        label={item.label}
                        placeholder={item.label}
                        min={item.min}
                        max={item.max}
                        {...detailsForm.getInputProps(item.name)}
                      ></NumberInput>
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
              Add Item
            </Button>
          </Fieldset>
        </form>
      )}
    </Modal>
  );
};

export default CreateItemModal;
