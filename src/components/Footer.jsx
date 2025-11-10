const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Mini Boutique. All rights reserved.</p>
        <p className="mb-0 text-muted small">Built with React, Bootstrap & Context API</p>
      </div>
    </footer>
  );
};

export default Footer;
