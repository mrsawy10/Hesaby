import FrontNav from "@/components/front-navbar/FrontNav";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// /testAuth();
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout--font">
      <FrontNav />
      <div className="layout--container mt-10">{children}</div>
    </div>
  );
}
