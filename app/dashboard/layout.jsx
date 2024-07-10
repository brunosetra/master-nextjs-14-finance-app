import PageHeader from "../../components/page-header";

export default function Layout({ children }) {
  return (
    <>
      <PageHeader className="my-8" />
      <main>{children}</main>
      <footer className="text-center mt-auto py-4">Footer</footer>
    </>
  );
}
