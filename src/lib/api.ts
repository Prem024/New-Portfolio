import { AdminUser, ContactMessage } from '../types';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const TOKEN_STORAGE_KEY = 'portfolio_admin_token';

function getStoredToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredToken(token: string | null): void {
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : {};

  if (!response.ok) {
    if (response.status >= 500 && !payload.error) {
      throw new Error(
        'Backend API is not responding. Make sure the backend server is running (npm run server:dev).'
      );
    }
    throw new Error(payload.error || `Request failed with status ${response.status}`);
  }

  return payload as T;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function submitContactMessage(data: ContactPayload) {
  return request<{ success: boolean; message: ContactMessage }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  const data = await request<{ admin: AdminUser; token?: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    setStoredToken(data.token);
  }
  return data.admin;
}

export async function logoutAdmin(): Promise<void> {
  try {
    await request<{ success: boolean }>('/api/auth/logout', { method: 'POST' });
  } finally {
    setStoredToken(null);
  }
}

export async function fetchCurrentAdmin(): Promise<AdminUser> {
  const data = await request<{ admin: AdminUser }>('/api/auth/me');
  return data.admin;
}

export interface MessagesResponse {
  messages: ContactMessage[];
  totalCount: number;
  unreadCount: number;
}

export function fetchMessages(params?: { status?: 'all' | 'unread' | 'read'; search?: string }) {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') {
    query.set('status', params.status);
  }
  if (params?.search?.trim()) {
    query.set('search', params.search.trim());
  }
  const qs = query.toString();
  return request<MessagesResponse>(`/api/messages${qs ? `?${qs}` : ''}`);
}

export function updateMessageReadStatus(id: number, isRead: boolean) {
  return request<{ message: ContactMessage }>(`/api/messages/${id}/read`, {
    method: 'PATCH',
    body: JSON.stringify({ is_read: isRead }),
  });
}

export function deleteMessage(id: number) {
  return request<{ success: boolean; id: number }>(`/api/messages/${id}`, {
    method: 'DELETE',
  });
}
