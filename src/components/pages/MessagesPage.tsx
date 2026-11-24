import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Copy,
  Eye,
  EyeOff,
  Inbox,
  Lock,
  LogOut,
  Mail,
  MailOpen,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';
import { AdminUser, ContactMessage } from '../../types';
import {
  deleteMessage,
  fetchCurrentAdmin,
  fetchMessages,
  loginAdmin,
  logoutAdmin,
  updateMessageReadStatus,
} from '../../lib/api';

interface MessagesPageProps {
  onNavigateHome: () => void;
}

type StatusFilter = 'all' | 'unread' | 'read';

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export const MessagesPage: React.FC<MessagesPageProps> = ({ onNavigateHome }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Inbox state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [inboxError, setInboxError] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const loadMessages = useCallback(async () => {
    setLoadingMessages(true);
    setInboxError('');
    try {
      const res = await fetchMessages({ status: statusFilter, search: searchQuery });
      setMessages(res.messages);
      setTotalCount(res.totalCount);
      setUnreadCount(res.unreadCount);
      setSelectedId((prev) => {
        if (prev && res.messages.some((m) => m.id === prev)) return prev;
        return res.messages[0]?.id ?? null;
      });
    } catch (err) {
      setInboxError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    let active = true;
    fetchCurrentAdmin()
      .then((user) => {
        if (active) setAdmin(user);
      })
      .catch(() => {
        if (active) setAdmin(null);
      })
      .finally(() => {
        if (active) setCheckingAuth(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (admin) {
      loadMessages();
    }
  }, [admin, loadMessages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!email.trim() || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setLoggingIn(true);
    try {
      const user = await loginAdmin(email.trim(), password);
      setAdmin(user);
      setPassword('');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAdmin(null);
    setMessages([]);
    setSelectedId(null);
  };

  const handleSelectMessage = async (msg: ContactMessage) => {
    setSelectedId(msg.id);
    setConfirmDeleteId(null);

    if (!msg.is_read) {
      try {
        const { message: updated } = await updateMessageReadStatus(msg.id, true);
        setMessages((prev) => prev.map((item) => (item.id === msg.id ? updated : item)));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch {
        // Keep selection functional even if read status toggle fails
      }
    }
  };

  const handleToggleRead = async (msg: ContactMessage) => {
    const nextRead = !msg.is_read;
    try {
      const { message: updated } = await updateMessageReadStatus(msg.id, nextRead);
      setMessages((prev) => {
        const mapped = prev.map((item) => (item.id === msg.id ? updated : item));
        if (statusFilter === 'unread' && nextRead) {
          return mapped.filter((item) => !item.is_read);
        }
        if (statusFilter === 'read' && !nextRead) {
          return mapped.filter((item) => item.is_read);
        }
        return mapped;
      });
      setUnreadCount((prev) => (nextRead ? Math.max(0, prev - 1) : prev + 1));
    } catch (err) {
      setInboxError(err instanceof Error ? err.message : 'Unable to update read status');
    }
  };

  const handleDelete = async (id: number) => {
    const target = messages.find((m) => m.id === id);
    try {
      await deleteMessage(id);
      const remaining = messages.filter((m) => m.id !== id);
      setMessages(remaining);
      setTotalCount((prev) => Math.max(0, prev - 1));
      if (target && !target.is_read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      setConfirmDeleteId(null);
      setSelectedId(remaining[0]?.id ?? null);
    } catch (err) {
      setInboxError(err instanceof Error ? err.message : 'Failed to delete message');
    }
  };

  const handleCopySenderEmail = (senderEmail: string) => {
    navigator.clipboard.writeText(senderEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const selectedMessage = messages.find((m) => m.id === selectedId) ?? null;

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#070708] text-[#f4f4f5] flex items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm font-mono text-zinc-400">
          <span className="w-4 h-4 rounded-full border-2 border-[#10b981] border-t-transparent animate-spin" />
          <span>Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-[#070708] text-[#f4f4f5] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </button>

          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981]">
                <Lock className="w-3.5 h-3.5" />
                <span>ADMIN ACCESS</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Sign in to view messages
              </h1>
              <p className="text-sm text-zinc-400">
                Enter your administrator credentials to access contact form submissions.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-xs font-mono text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="admin-email" className="text-xs font-mono text-zinc-400">
                  Admin Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="premnanda532@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="admin-password" className="text-xs font-mono text-zinc-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loggingIn ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Login to Inbox</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070708] text-[#f4f4f5]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#070708]/90 backdrop-blur-md border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              title="Back to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white">
                PN.
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Contact Messages
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[11px] font-mono text-[#10b981]">
                    {unreadCount} unread
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-500">
                  Signed in as {admin.email} · {totalCount} total
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={loadMessages}
              disabled={loadingMessages}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-red-300 hover:border-red-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0c0d11] border border-white/[0.08] w-fit">
            {(['all', 'unread', 'read'] as StatusFilter[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                  statusFilter === tab
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, email, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0d11] border border-white/[0.08] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/25"
            />
          </div>
        </div>

        {inboxError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-xs font-mono text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{inboxError}</span>
          </div>
        )}

        {/* Master-Detail Inbox */}
        {loadingMessages && messages.length === 0 ? (
          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-16 flex flex-col items-center justify-center text-center gap-3">
            <span className="w-5 h-5 rounded-full border-2 border-[#10b981] border-t-transparent animate-spin" />
            <p className="text-xs font-mono text-zinc-400">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-16 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400">
              <Inbox className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">No messages found</h2>
            <p className="text-sm text-zinc-400 max-w-md">
              {searchQuery || statusFilter !== 'all'
                ? 'Try clearing your search or switching the status filter.'
                : 'When visitors submit the contact form on your portfolio, their messages will appear here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Message List (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0c0d11] border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06] max-h-[70vh] overflow-y-auto">
              {messages.map((msg) => {
                const isSelected = msg.id === selectedMessage?.id;
                return (
                  <button
                    key={msg.id}
                    type="button"
                    onClick={() => handleSelectMessage(msg)}
                    className={`w-full text-left p-4 sm:p-5 transition-colors ${
                      isSelected
                        ? 'bg-white/[0.07]'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        {!msg.is_read && (
                          <span
                            className="w-2 h-2 rounded-full bg-[#10b981] shrink-0"
                            title="Unread"
                          />
                        )}
                        <span
                          className={`text-sm truncate ${
                            msg.is_read ? 'font-medium text-zinc-300' : 'font-bold text-white'
                          }`}
                        >
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                        {formatTimestamp(msg.created_at)}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-sm truncate ${
                        msg.is_read ? 'text-zinc-400' : 'text-zinc-200 font-medium'
                      }`}
                    >
                      {msg.subject}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                      {msg.message}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Message Detail (7 cols) */}
            <div className="lg:col-span-7">
              {selectedMessage ? (
                <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/[0.06]">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                            selectedMessage.is_read
                              ? 'bg-white/[0.03] border-white/10 text-zinc-400'
                              : 'bg-[#10b981]/10 border-[#10b981]/25 text-[#10b981]'
                          }`}
                        >
                          {selectedMessage.is_read ? 'Read' : 'Unread'}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">
                          {formatTimestamp(selectedMessage.created_at)}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {selectedMessage.subject}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
                        <span className="font-medium text-white">{selectedMessage.name}</span>
                        <span className="text-zinc-600">·</span>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="font-mono text-xs text-[#10b981] hover:underline"
                        >
                          {selectedMessage.email}
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopySenderEmail(selectedMessage.email)}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                          title="Copy sender email"
                        >
                          {copiedEmail ? (
                            <Check className="w-3.5 h-3.5 text-[#10b981]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleRead(selectedMessage)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                      >
                        {selectedMessage.is_read ? (
                          <>
                            <Mail className="w-3.5 h-3.5" />
                            <span>Mark Unread</span>
                          </>
                        ) : (
                          <>
                            <MailOpen className="w-3.5 h-3.5" />
                            <span>Mark Read</span>
                          </>
                        )}
                      </button>

                      {confirmDeleteId === selectedMessage.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleDelete(selectedMessage.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-xs font-mono text-red-300 hover:bg-red-500/30 transition-colors"
                          >
                            Confirm Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(selectedMessage.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-red-300 hover:border-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedMessage.message}
                  </div>

                  {/* Reply CTA */}
                  <div className="pt-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                        `Re: ${selectedMessage.subject}`
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#0c0d11] border border-white/[0.08] p-12 text-center text-sm text-zinc-400">
                  Select a message from the list to view its details.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
