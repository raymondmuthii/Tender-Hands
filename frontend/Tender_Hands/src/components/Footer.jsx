// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    about: {
      title: 'About',
      links: [
        { name: 'Our Mission', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Impact', href: '/impact' },
        { name: 'Team', href: '/team' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Donor Resources', href: '/resources' },
        { name: 'Charity Application', href: '/apply' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Donation Policy', href: '/donation-policy' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-xl font-bold">
              DonationPlatform
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Empowering change through regular giving. Join us in making a lasting impact
              on communities worldwide.
            </p>
          </div>

          {/* Footer Sections */}
          {Object.values(footerSections).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} DonationPlatform. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{link.name}</span>
                  {/* You would typically use social media icons here */}
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
