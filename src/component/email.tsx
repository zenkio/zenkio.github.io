'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const Email = ({ email }: { email: string }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setClicked(true);

    try {
      window.location.href = `mailto:${email}`;

      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText(email);
          showStyledToast('Email copied');
        } catch (err) {
        }
      }, 600);
    } catch (err) {
      await navigator.clipboard.writeText(email);
      showStyledToast('Email copied');
    } finally {
      setClicked(false);
    }
  };

  /** Custom toast with simple grey style */
  const showStyledToast = (message: string) => {
    toast.custom(
      () => (
        <div className="rounded-full bg-zinc-800 text-white px-4 py-2 text-sm shadow-md dark:bg-white dark:text-zinc-900">
          {message}
        </div>
      ),
      { duration: 2500 }
    );
  };

  return (
    <div>
      <a
        href={`mailto:${email}`}
        onClick={handleClick}
        className={`mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white shadow-md transition hover:translate-y-[-1px] hover:shadow-lg dark:bg-white dark:text-zinc-900 ${
          clicked ? 'opacity-80' : ''
        }`}
      >
        <Mail className="h-4 w-4" /> {email}
      </a>
    </div>
  );
};

export default Email;
