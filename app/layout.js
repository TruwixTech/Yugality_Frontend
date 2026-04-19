import { Manrope } from 'next/font/google';
import "./globals.css";
import StyledJsxRegistry from "./registry";

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export const metadata = {
  title: "Yugality — AI Workspace",
  description: "Yugality is an AI-powered workspace for documents, research, notes, calendars, and case timelines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="antialiased">
        <StyledJsxRegistry>
          {children}
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
