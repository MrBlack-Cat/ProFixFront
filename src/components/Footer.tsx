const Footer = () => (
    <footer id="contact" className="bg-blue-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
        <p className="mb-2">
          Have questions? Email us at{' '}
          <a href="mailto:support@profix.com" className="underline">
            support@profix.com
          </a>
        </p>
        <p>© {new Date().getFullYear()} ProFix. All rights reserved.</p>
      </div>
    </footer>
  );
  
  export default Footer;
  