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
      // 嘗試開預設 email app
      window.location.href = `mailto:${email}`;

      // 等一陣睇下有冇反應
      const timeout = setTimeout(async () => {
        try {
          await navigator.clipboard.writeText(email);
          toast.success("Email copied");
          console.debug("Email copied to clipboard after timeout");
        } catch (err) {
          console.error("Clipboard failed", err);
          alert("Failed to open email client or copy address");
        }
      }, 1000);

      // 如果用戶真係開咗 email app，其實呢個 setTimeout 都唔會干擾
      // 因為會跳走去 email client
    } catch (err) {
      // fallback: 直接 copy
      console.debug("Failed to open email client, copying instead", err);
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
