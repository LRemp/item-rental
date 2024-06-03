import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Text,
  TextInput,
  Textarea,
  Timeline,
  Title,
  rem,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import useApiResult from '@/hooks/useApiResult';
import api from '@/api';
import { theme } from '@/theme';
import { IconArrowRight } from '@tabler/icons-react';
import { format } from 'path';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import TimeAgo from 'timeago-react';

type MessageDTO = {
  author: {
    name: string;
    avatarUrl: string;
  };
  text: string;
  created: Date;
};

type ConversationProps = {
  messages: MessageDTO[];
};

function ChatWindow() {
  const { id } = useParams();
  const { result, loading } = useApiResult(() => api.Order.getMessages(id || ''), []);
  const { request: create } = useApiResult(api.Order.createMessage);
  const [messages, setMessages] = useState<any[]>([]);
  const auth = useAuthUser<any>();

  console.log(auth);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([
        ...messages,
        {
          text: input,
          created: new Date().toISOString(),
          author: {
            username: auth.username,
            name: auth.name,
            surname: auth.surname,
          },
        },
      ]);
      create(id, { text: input });
      setInput('');
    }
  };

  useEffect(() => {
    if (!loading) {
      setMessages(result);
    }
  }, [result]);

  return (
    <Paper p="lg" shadow="md" radius="sm">
      <Title order={3} mb={'md'}>
        Pokalbių langas
      </Title>

      <ScrollArea h={500}>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <Timeline lineWidth={0} bulletSize={24}>
            {messages.map((message: MessageDTO, index: number) => (
              <Timeline.Item
                key={index}
                bullet={
                  <Avatar src={message.author.avatarUrl} alt={message.author.name} size={24} />
                }
                title={message.author.name}
              >
                <Paper shadow="sm" p="xs" style={{ marginBottom: 2 }}>
                  <Text size="sm">{message.text}</Text>
                </Paper>
                <Group>
                  <Text size="xs" c="dimmed">
                    <TimeAgo datetime={message.created} locale="lt" />
                  </Text>
                </Group>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </ScrollArea>

      <Box style={{ display: 'flex' }}>
        <TextInput
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          placeholder="Type your message..."
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <Button onClick={handleSend}>Send</Button>
      </Box>
    </Paper>
  );
}

export default ChatWindow;
