import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Fieldset, TextInput, Select } from '@mantine/core';
import api from '@/api';
import useApiResult from '@/hooks/useApiResult';
import { useForm } from '@mantine/form';
import { Error, Success } from '@/utils/Notifications';
import { notifications } from '@mantine/notifications';
import { request } from 'http';

interface CreateCategoryModalProps {
  refresh: Function;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ refresh }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { result: categories } = useApiResult(() => api.Category.getAll(), []);
  const { loading: creating, request: create } = useApiResult(api.Category.create);
  const add = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: '',
      label: '',
      parent: '',
    },
    validate: {
      name: (value) => (value.length <= 0 ? 'Įveskite kategorijos pavadinimą' : null),
      label: (value) => (value.length <= 0 ? 'Įveskite kategorijos žymę' : null),
      parent: (value) => (value.length <= 0 ? 'Pasirinkite tėvinę kategoriją' : null),
    },
  });

  console.log(categories);

  const createCategory = async (values: any) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Vykdoma',
      message: 'Kuriama nauja kateogrija...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      await create({
        name: values.name,
        label: values.label,
        parent: values.parent,
      });

      close();

      notifications.update(
        Success({
          id: notificationId,
          title: 'Kategorija sukurta',
          message: 'Kategorija sėkmingai užregistruota sistemoje!',
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
      <Modal opened={opened} onClose={close} title="Pridėti kategoriją" centered>
        <form onSubmit={form.onSubmit((values) => createCategory(values))}>
          <Fieldset disabled={creating} variant="unstyled">
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

            <Button mt="md" type="submit" loading={creating}>
              Pridėti
            </Button>
          </Fieldset>
        </form>
      </Modal>

      <Button my="md" onClick={open}>
        Pridėti kategoriją
      </Button>
    </>
  );
};

export default CreateCategoryModal;
