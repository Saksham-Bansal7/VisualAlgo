import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg">
          Made by{" "}
          <span className="font-semibold text-purple-400">
            {" "}
            <a
              href="https://github.com/Saksham-Bansal7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saksham
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
