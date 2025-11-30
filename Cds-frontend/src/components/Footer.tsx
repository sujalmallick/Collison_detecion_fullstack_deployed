import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUp,
  Zap,
  Shield,
  Brain
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'System',
      links: [
        { name: 'Features', href: '#overview' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Preview', href: '#demo' },
      ]
    },
    {
      title: 'Team',
      links: [
        { name: 'About Us', href: '#contact' },
       { name: 'Careers', href: '#' },
        { name: 'Contacts', href: '#' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/your-repo', label: 'GitHub Repository' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@collisionai.com', label: 'Email' },
  ];

  return (
    <footer className="bg-card border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg glow-primary flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gradient-primary">
                    CollisionAI
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Revolutionary AI-powered collision detection system that predicts and prevents 
                  accidents in real-time using advanced machine learning and computer vision.
                </p>
                
                {/* Key Features */}
                <div className="space-y-3">
                  {[
                    { icon: Zap, text: 'Real-time Processing' },
                    { icon: Shield, text: '90%+ Accuracy' },
                    { icon: Brain, text: 'Advanced AI' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <feature.icon className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-foreground font-semibold mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-muted-foreground hover:text-primary transition-colors text-sm"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2025 CollisionAI. All rights reserved. Built with <span>&lt;3</span> for safety.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-card/50 hover:bg-primary/20 transition-all duration-300 group"
                  title={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 group"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-primary group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-primary/10 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;