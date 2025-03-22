import { ProxyOptions } from 'vite';
/**
 * Generate proxy
 * @param list
 */
export default (target: string) => {
  const ProxyList: Record<string, string | ProxyOptions> = {
    '/bo/': {
      target: 'http://128.199.123.233:8081',
      changeOrigin: true,
    },
  };
  return ProxyList;
};
