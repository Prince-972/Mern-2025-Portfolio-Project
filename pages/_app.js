import '../styles/globals.css'
import { useEffect, useState } from 'react'

import Layout from './layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  const router = typeof window !== 'undefined' ? require('next/router').useRouter() : { pathname: '' };
  const [mounted, setMounted] = useState(false);
  const [hasPortfolio, setHasPortfolio] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (router.pathname === '/portfolio') {
      const data = localStorage.getItem('portfolio_data');
      setHasPortfolio(!!data);
    }
  }, [router.pathname]);

  const isLoginPage = router.pathname === '/' || router.pathname === '/login';
  const isPortfolioPage = router.pathname === '/portfolio';
  const isGeneratePage = router.pathname === '/generate';

  if (!mounted) {
    return null;
  }

  if (isLoginPage || isGeneratePage) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    );
  }

  if (isPortfolioPage && !hasPortfolio) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
