import { Box, Progress, PasswordInput, Group, Text, Center, rem } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconCheck, IconLock, IconX } from '@tabler/icons-react';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Turi bent vieną numerį' },
  { re: /[a-z]/, label: 'Turi bent vieną mažąją raidę' },
  { re: /[A-Z]/, label: 'Turi bent vieną didžiąją raidę' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Turi bent vieną specialųjį simbolį' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

interface PasswordStrengthProps {
  formHandle: any;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ formHandle }) => {
  const [value, setValue] = useInputState('');
  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    formHandle.onChange(e.target.value);
    setValue(e.target.value);
  };

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <PasswordInput
        leftSectionPointerEvents="none"
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        value={formHandle.value}
        onChange={inputPassword}
        placeholder="Įveskite slaptažodį"
        label="Slaptažodis"
        required
        error={formHandle.error}
        onFocus={formHandle.onFocus}
        onBlur={formHandle.onBlur}
      />

      <Group gap={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label="Turi bent 6 simbolius" meets={value.length > 5} />
      {checks}
    </div>
  );
};

export default PasswordStrength;
