import { useState } from "react";
import { Mail } from "lucide-react";
import { Toaster, toast } from 'sonner';

const Email = ({ email }: { email: string }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.debug("Email link clicked");
    e.preventDefault();
    setClicked(true);

    try {
      window.location.href = `mailto:${email}`;

      const timeout = setTimeout(async () => {
        try {
          await navigator.clipboard.writeText(email);
          toast.success("Email copied");
        } catch (err) {
        }
      }, 1000);
    } catch (err) {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied");
    } finally {
      setClicked(false);
    }
  };

  return (
    <div>
      <a
        href={`mailto:${email}`}
        onClick={handleClick}
        className={`mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white shadow-md transition hover:translate-y-[-1px] hover:shadow-lg dark:bg-white dark:text-zinc-900 ${
          clicked ? "opacity-80" : ""
        }`}
      >
        <Mail className="h-4 w-4" /> {email}
      </a>
      <br />
      <br />
      <Toaster />
    </div>
  );
};

export default Email;
