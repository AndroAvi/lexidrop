import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#C04D6B] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About LexiDrop</h3>
            <p className="text-sm">
              Inspired by the DrLingua Kana bento game, LexiDrop is intended to be a fun and interactive way to learn Indian language scripts.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-[#FFD9E3]">Home</a></li>
              <li><a href="https://drlingua.com/"  target="_blank" className="hover:text-[#FFD9E3]">DrLingua Kana Bento Game</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-sm">
              Have suggestions or found a bug?<br />
              Open an issue on our <a href="https://github.com/AndroAvi/lexidrop"  target="_blank" className="hover:text-[#FFD9E3]">GitHub repository.</a>
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm border-t border-[#DB5375] pt-4">
          © {new Date().getFullYear()} LexiDrop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
