import { Container, Text } from '@mantine/core';
import { Header } from '@/components/Nagivation/Header';
import Actions from './Components/Actions';

const AdminPage: React.FC = () => (
  <>
    <Header />
    <Container>
      <Text py="lg" fw="500" size="xl">
        Administratoriaus menu
      </Text>
      <Actions />
    </Container>
  </>
);

export default AdminPage;
