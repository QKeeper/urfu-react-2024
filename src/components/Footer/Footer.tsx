import { GitHubLogoIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <footer className="flex bg-white text-gray-400">
      <div
        about="footer-container"
        className="container flex h-10 items-center gap-4 text-sm"
      >
        <p>&copy; Nikita Leshchenko 2024</p>
        <a
          target="_blank"
          href="https://github.com/QKeeper/urfu-react-2024"
          className="flex items-center gap-1 underline"
        >
          <GitHubLogoIcon />
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
