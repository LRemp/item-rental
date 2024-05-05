import { useCallback } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useUploadImage = () => {
  const authHeader = useAuthHeader();

  const upload = useCallback(async (files: File[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const response = await fetch('/api/Image', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: authHeader || '',
      },
    });

    if (response.ok) {
      return {
        success: true,
        data: await response.json(),
      };
    }

    return {
      success: false,
      error: await response.json(),
    };
  }, []);

  return upload;
};

export default useUploadImage;
