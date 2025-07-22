import { Loader } from '@mantine/core';

export default function FLoaderFullScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader />
    </div>
  );
}
