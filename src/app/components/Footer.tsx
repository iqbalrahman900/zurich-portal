interface FooterProps {
    text?: string;
  }
  
  export default function Footer({ text = '© 2025 Zurich Insurance Group' }: FooterProps) {
    return (
      <footer className="bg-gray-100 p-4 mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          {text}
        </div>
      </footer>
    );
  }