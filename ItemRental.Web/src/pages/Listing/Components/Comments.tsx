import TimeAgo from 'react-timeago';
//import lithuanianStrings from 'react-timeago/lib/language-strings/lt';
//import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Loader,
  Paper,
  Text,
  Textarea,
  Title,
  rem,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { theme } from '@/theme';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';

//const dateFormatter = buildFormatter(lithuanianStrings);

const Comment: React.FC<IComment> = ({ author, createdAt, text }) => (
  <Box my="md">
    <Group>
      <Avatar alt={author.name} radius="xl" color="cyan">
        {author.name[0].toUpperCase()}
      </Avatar>
      <div>
        <Text size="sm">
          {author.name} {author.surname}
        </Text>
        <Text size="xs" c="dimmed">
          <TimeAgo date={createdAt} />
        </Text>
      </div>
    </Group>
    <Text pl={54} pt="sm" size="sm">
      {text}
    </Text>
  </Box>
);

interface CommentsProps {
  id: string;
}

const Comments: React.FC<CommentsProps> = ({ id }) => {
  const { result, loading } = useApiResult(() => api.RentListing.getComments(id), []);

  /*const { loading: createLoading, request: createRequest } = useApiResult(
    api.RentListing.createComment
  );

  const createComment = (e: React.ChangeEvent<HTMLElement>) => {};*/

  return (
    <Paper p="md" shadow="md" radius="sm">
      <Title fw={600} order={2} mb="md">
        Komentarai
      </Title>

      <>
        <Textarea
          placeholder="Įveskite komentarą"
          autosize
          rightSection={
            <ActionIcon size={32} color={theme.primaryColor} variant="filled">
              <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          }
        />
      </>
      {loading ? (
        <Center>
          <Loader />
          Loading comments
        </Center>
      ) : (
        <>
          {result?.map((comment: IComment, index: number) => <Comment key={index} {...comment} />)}
        </>
      )}
    </Paper>
  );
};

export default Comments;
