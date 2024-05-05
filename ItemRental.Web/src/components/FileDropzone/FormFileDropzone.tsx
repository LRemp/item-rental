import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Center, Text, CloseButton } from '@mantine/core';

export function FormFileDropzone({
  onChange,
  value,
  error,
}: {
  onChange: any;
  value?: File[];
  error?: any;
}) {
  const selectedFiles = value?.map((file, index) => (
    <Text key={file.name}>
      <b>{file.name}</b> ({(file.size / 1024).toFixed(2)} kb)
      <CloseButton
        size="xs"
        onClick={() => {
          const files = value.filter((_, i) => i !== index);
          onChange(files);
        }}
      />
    </Text>
  ));

  return (
    <>
      <Dropzone
        h={120}
        p={0}
        mt={10}
        multiple
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg]}
        onDrop={(files) => {
          onChange([...(value ?? []), ...files]);
        }}
      >
        <Center h={120}>
          <Dropzone.Idle>Užveskite nuotraukas čia</Dropzone.Idle>
          <Dropzone.Accept>Užveskite nuotraukas čia</Dropzone.Accept>
          <Dropzone.Reject>Nuotraukos formatas nepalaikomas</Dropzone.Reject>
        </Center>
      </Dropzone>

      {error && (
        <Text c="red" mt={5}>
          {error}
        </Text>
      )}

      {selectedFiles && selectedFiles.length > 0 && (
        <>
          <Text mb={5} mt="md">
            Įkeltos nuotraukos:
          </Text>
          {selectedFiles}
        </>
      )}
    </>
  );
}
