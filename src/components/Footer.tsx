
import React from "react";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dataBlue-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DataDream</h3>
            <p className="text-dataBlue-100 mb-4">
              Transforming raw data into valuable insights through expert data engineering.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dataBlue-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-dataBlue-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-dataBlue-200 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-dataBlue-200 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Data Integration</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Data Warehouse Design</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Business Intelligence</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">DataOps & MLOps</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Data Governance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Whitepapers</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-dataBlue-200 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dataBlue-800 mt-12 pt-6 text-sm text-dataBlue-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} DataDream. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
