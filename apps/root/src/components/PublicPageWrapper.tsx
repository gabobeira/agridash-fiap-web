'use client';

import { AuthGuard } from '@repo/ui';

interface PublicPageWrapperProps {
  children: React.ReactNode;
}

export function PublicPageWrapper({ children }: PublicPageWrapperProps) {
  return (
    <AuthGuard requireAuth={false} redirectUrl="/dashboard">
      {children}
    </AuthGuard>
  );
}
