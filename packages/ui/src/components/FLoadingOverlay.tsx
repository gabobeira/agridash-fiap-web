import { LoadingOverlay } from '@mantine/core';

export default function FLoadingOverlay() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <LoadingOverlay
        visible={true}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ size: 'lg', type: 'bars' }}
      />
    </div>
  );
}
