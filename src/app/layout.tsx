import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className='container'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
