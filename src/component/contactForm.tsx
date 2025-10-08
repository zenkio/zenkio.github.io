'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '89bdb317-0997-4c33-9cc9-c38c28ab783b');
    try {
      const name = formData.get('name');
      const message = formData.get('message');
      const subject = `${message?.slice(0, 50)}...`;
      formData.set('subject', subject);
      formData.set('from_name', name as string);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.custom(
          () => (
            <div className="rounded-full bg-zinc-800 text-white px-4 py-2 text-sm shadow-md dark:bg-white dark:text-zinc-900">
              ✉️ Message sent successfully!
            </div>
          ),
          { duration: 2500 }
        );
        form.reset();
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.custom(
        () => (
          <div className="rounded-full bg-zinc-800 text-white px-4 py-2 text-sm shadow-md dark:bg-white dark:text-zinc-900">
            ⚠️ Failed to send message. Please try again.
          </div>
        ),
        { duration: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="mt-3 grid grid-cols-1 gap-3" onSubmit={handleSubmit}>
        <div className="grid gap-1">
          <label htmlFor="name" className="text-xs text-zinc-600 dark:text-zinc-400">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/60"
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="email" className="text-xs text-zinc-600 dark:text-zinc-400">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/60"
            placeholder="you@domain.com"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="message" className="text-xs text-zinc-600 dark:text-zinc-400">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="resize-none rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/60"
            placeholder="Tell me a bit about your project…"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:translate-y-[-1px] hover:shadow-lg disabled:opacity-70 dark:bg-white dark:text-zinc-900"
        >
          {loading ? 'Sending…' : 'Send'} <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-xs text-zinc-500">
          This form sends messages using Web3Forms. No backend required 🎉
        </p>
      </form>
    </div>
  );
}
