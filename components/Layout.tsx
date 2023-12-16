import Footer from "./Footer";
import Header from "./Header";

interface LayoutType {
  children: React.ReactChild | React.ReactChild[];
}

export function MainLayout({ children }: LayoutType) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function FolderLayout({ children }: LayoutType) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function SharedLayout({ children }: LayoutType) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function SignLayout({ children }: LayoutType) {
  return <>{children}</>;
}
