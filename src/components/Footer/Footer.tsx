import { GitHubLogoIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <footer className="flex select-none bg-white text-gray-400">
      <div
        about="footer-container"
        className="container flex h-10 items-center justify-center gap-4 text-sm"
      >
        <p>&copy; Nikita Leshchenko 2024</p>
        <a
          target="_blank"
          href="https://github.com/QKeeper/urfu-react-2024"
          className="flex items-center gap-1 hover:underline"
        >
          <GitHubLogoIcon />
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
