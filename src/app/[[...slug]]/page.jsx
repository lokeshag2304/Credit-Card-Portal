'use client';

import dynamic from 'next/dynamic';

// Dynamically import the main App component with SSR disabled
// since it uses react-router-dom (BrowserRouter) which relies on window APIs.
const ClientApp = dynamic(() => import('../../App'), { ssr: false });

export default function Page() {
  return <ClientApp />;
}
