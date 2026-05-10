/**
 * Widget layout — overrides the app root layout's chrome so the iframe
 * renders a clean chat surface with no header / footer / nav.
 */
export default function WidgetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      {children}
    </div>
  );
}
