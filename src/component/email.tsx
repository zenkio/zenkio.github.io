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
        <div className="flex items-center justify-center w-full md:max-w-[300px] rounded-full bg-zinc-700 text-white px-4 py-2 shadow-md dark:bg-zinc-800">
          <p className="text-sm font-medium">{message}</p>
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
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Email;
