import Link from 'next/link';

export default function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-[14px] text-colorlight/60 hover:text-colorlight no-underline transition-colors duration-300"
    >
      {children}
    </Link>
  );
}
