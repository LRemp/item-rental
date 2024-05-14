import { Modal, Button, Fieldset, TextInput, Select } from '@mantine/core';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { useForm } from '@mantine/form';
import { Error, Success } from '@/utils/Notifications';
import { notifications } from '@mantine/notifications';

interface UpdateCategoryModalProps {
  refresh: Function;
  data: any;
  open: any;
  opened: any;
  close: any;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  data,
  refresh,
  open,
  opened,
  close,
}) => {
  const { result: categories } = useApiResult(() => api.Category.getAll(), []);
  const { loading: updating, request: update } = useApiResult(api.Category.update);

  const form = useForm({
    initialValues: {
      name: data.name,
      label: data.label,
      parent: data.parent,
    },
    validate: {
      name: (value) => (value.length <= 0 ? 'Įveskite kategorijos pavadinimą' : null),
      label: (value) => (value.length <= 0 ? 'Įveskite kategorijos žymę' : null),
    },
  });

  const createCategory = async (values: any) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Vykdoma',
      message: 'Atnaujinama kategorija...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await update(data.id, {
        name: values.name,
        label: values.label,
        parent: values.parent,
      });

      close();

      notifications.update(
        Success({
          id: notificationId,
          title: 'Kategorija atnaujinta',
          message: 'Kategorija sėkmingai atnaujinta sistemoje!',
        })
      );

      refresh();
    } catch (e: any) {
      notifications.update(Error({ id: notificationId, title: 'Klaida', message: e.description }));
    }
  };

  const selectCategories = categories?.map((x: any) => x.name);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Redaguoti kategoriją" centered>
        <form onSubmit={form.onSubmit((values) => createCategory(values))}>
          <Fieldset disabled={updating} variant="unstyled">
            <TextInput
              label="Vardas"
              placeholder="Įveskite kategorijos vardą"
              {...form.getInputProps('name')}
            />

            <TextInput
              label="Pavadinimas"
              placeholder="Įveskite kategorijos pavadinimą"
              {...form.getInputProps('label')}
            />

            <Select
              label="Tėvinė kategorija"
              placeholder="Pasirinkite tėvinę kategoriją"
              data={selectCategories}
              {...form.getInputProps('parent')}
            ></Select>

            <Button mt="md" type="submit" loading={updating}>
              Pridėti
            </Button>
          </Fieldset>
        </form>
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;
