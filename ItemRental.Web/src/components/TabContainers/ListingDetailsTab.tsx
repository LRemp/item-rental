import { Grid, Loader, Box, Text, Image } from '@mantine/core';
import api from '@/api';
import PhotoCarousel from '../Misc/PhotoCarousel';
import useApiResult from '@/hooks/useApiResult';
import NoImage from '@/assets/images/no_image.png';

interface ListingDetailsTabProps {
  id: string;
}

const ListingDetailsTab: React.FC<ListingDetailsTabProps> = ({ id }) => {
  const { result: data, loading } = useApiResult(() => api.RentListing.getListingById(id), []);
  return (
    <Grid columns={12} mt="sm">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Box>
              <Text fw={500}>Pavadinimas</Text>
              <Text>{data.title}</Text>
            </Box>
            <Box>
              <Text fw={500}>Aprašymas</Text>
              <Text>{data.description}</Text>
            </Box>
            <Box>
              <Text fw={500}>Kaina</Text>
              <Text>{data.price} Eur / dienai</Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            {data?.item?.images?.length > 0 ? (
              <PhotoCarousel images={data?.item.images} />
            ) : (
              <Image src={NoImage} />
            )}
          </Grid.Col>
        </>
      )}
    </Grid>
  );
};

export default ListingDetailsTab;
