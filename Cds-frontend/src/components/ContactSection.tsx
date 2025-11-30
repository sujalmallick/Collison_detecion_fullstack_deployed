import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  MapPin, 
  Phone,
  Send,
  User,
  Users
} from 'lucide-react';

const ContactSection = () => {
  const teamMembers = [
    {
      name: 'Sujal Mallick',
      role: '3rd Year Coe Student',
      image: '/sujal.jpg',
      social: { linkedin: 'https://www.linkedin.com/in/sujalmallick', github: 'https://github.com/sujalmallick', instagram: 'https://www.instagram.com/sujal.mallickk/' }
    },
    {
      name: 'Rohan Malhotra',
      role: '3rd Year Coe Student',
      image: '/rohan.jpg',
      social: { linkedin: '#', github: '#', instagram: '#' }
    },
    {
      name: 'Vansh Bhasin',
      role: '3rd Year Coe Student',
      image: '/vansh.jpg',
      social: { linkedin: '#', github: '#', instagram: '#' }
    },
    {
      name: 'Pranav Keswani',
      role: '3rd Year Coe Student',
      image: '/pranav.jpg',
      social: { linkedin: '#', github: '#', instagram: '#' }
    }
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'group6@gmail.com', href: 'mailto:sujalmallick123@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 666666666', href: 'tel:+91 0000000' },
    { icon: MapPin, label: 'Location', value: 'Thapar University, Punjab', href: '#' }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Meet the</span>{' '}
            <span className="text-gradient-primary">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our project team is focused on building a practical and accurate system for detecting vehicle collisions using AI. We aim to explore real-time detection techniques and create a working prototype that demonstrates the concepts learned in class
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} className="p-2 rounded-full bg-card/50 hover:bg-primary/20 transition-colors group">
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                    <a href={member.social.github} className="p-2 rounded-full bg-card/50 hover:bg-primary/20 transition-colors group">
                      <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                    <a href={member.social.instagram} className="p-2 rounded-full bg-card/50 hover:bg-primary/20 transition-colors group">
                      <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass border-primary/20 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
                  <Users className="w-6 h-6 mr-3 text-primary" />
                  Get in Touch
                </h3>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Ready to revolutionize your collision detection capabilities? 
                  Our team is here to help you integrate our cutting-edge technology 
                  into your systems.
                </p>

                {/* Contact Info */}
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <contact.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{contact.label}</p>
                        <a href={contact.href} className="text-foreground font-medium hover:text-primary transition-colors">
                          {contact.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <p className="text-sm text-muted-foreground mb-4">Follow our project</p>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: '#', label: 'GitHub' },
                      { icon: Linkedin, href: '#', label: 'LinkedIn' },
                      { icon: Instagram, href: '#', label: 'Instagram' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="p-3 rounded-lg bg-card/50 hover:bg-primary/20 transition-all duration-300 group"
                        title={social.label}
                      >
                        <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass border-primary/20 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
                  <Send className="w-6 h-6 mr-3 text-primary" />
                  Send us a Message
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <input type="text" placeholder="John" className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <input type="text" placeholder="Doe" className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground"/>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <input type="text" placeholder="Your Company" className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground"/>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea rows={4} placeholder="Tell us about your project and how we can help..." className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground resize-none"/>
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
