import { getClientEnv, getServerEnv } from '@/lib/env';

describe('env', () => {
  const originalProcessEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalProcessEnv };
  });

  afterAll(() => {
    process.env = originalProcessEnv;
  });

  it('can retrieve client-side environment variables', () => {
    process.env.NEXT_PUBLIC_BASE_URL = 'http://test.example.com';
    const env = getClientEnv();
    expect(env).toBeDefined();
    expect(env.NODE_ENV).toBe('test');
    expect(env.NEXT_PUBLIC_BASE_URL).toBe('http://test.example.com');
  });

  it('can retrieve server-side environment variables', () => {
    process.env.NEXT_PUBLIC_BASE_URL = 'http://test.example.com';
    process.env.NEXTAUTH_URL = 'http://test.example.com';
    process.env.NEXTAUTH_SECRET = 'test-secret';
    process.env.NEXTAUTH_DEBUG = '0';
    const env = getServerEnv();
    expect(env).toBeDefined();
    expect(env.NODE_ENV).toBe('test');
    expect(env.NEXT_PUBLIC_BASE_URL).toBe('http://test.example.com');
    expect(env.NEXTAUTH_URL).toBe('http://test.example.com');
    expect(env.NEXTAUTH_SECRET).toBe('test-secret');
    expect(env.NEXTAUTH_DEBUG).toBe('0');
  });
});
