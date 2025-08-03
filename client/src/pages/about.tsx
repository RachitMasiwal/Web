import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Building2, Users, Award, Globe, Truck, Shield,
  CheckCircle, MapPin, Phone, Mail, Linkedin
} from "lucide-react";
import { Link } from "wouter";
import { pageTransition, fadeInUp, staggerContainer } from "@/lib/animations";

const milestones = [
  { year: "1999", title: "Company Founded", description: "Started as a small freight forwarding company" },
  { year: "2005", title: "Global Expansion", description: "Opened offices in 25 countries" },
  { year: "2010", title: "Technology Integration", description: "Launched advanced tracking systems" },
  { year: "2015", title: "Supply Chain Solutions", description: "Expanded into comprehensive logistics consulting" },
  { year: "2020", title: "Digital Transformation", description: "Implemented AI-powered optimization" },
  { year: "2024", title: "Sustainable Logistics", description: "Leading green logistics initiatives" }
];

const team = [
  {
    name: "John Martinez",
    position: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "25+ years in international logistics and supply chain management",
    linkedin: "#"
  },
  {
    name: "Sarah Chen",
    position: "COO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b739?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "Expert in operational excellence and global logistics networks",
    linkedin: "#"
  },
  {
    name: "Michael Rodriguez",
    position: "CTO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "Technology innovator specializing in logistics automation",
    linkedin: "#"
  },
  {
    name: "Emma Thompson",
    position: "VP of Sales",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    bio: "Building strategic partnerships across global markets",
    linkedin: "#"
  }
];

const certifications = [
  {
    title: "ISO 9001:2015",
    description: "Quality Management Systems",
    icon: Award
  },
  {
    title: "ISO 14001:2015",
    description: "Environmental Management",
    icon: Shield
  },
  {
    title: "AEO Certification",
    description: "Authorized Economic Operator",
    icon: CheckCircle
  },
  {
    title: "C-TPAT Certified",
    description: "Customs-Trade Partnership",
    icon: Globe
  }
];

const offices = [
  {
    city: "New York",
    country: "USA",
    address: "123 Logistics Ave, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "ny@unitaslogistix.com"
  },
  {
    city: "London",
    country: "UK",
    address: "456 Freight St, London EC1A 1BB",
    phone: "+44 20 7123 4567",
    email: "london@unitaslogistix.com"
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "789 Shipping Blvd, Singapore 018956",
    phone: "+65 6123 4567",
    email: "singapore@unitaslogistix.com"
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "321 Trade Center, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "dubai@unitaslogistix.com"
  }
];

export default function About() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About <span className="text-yellow-400">Unitas LogistiX</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                With over 25 years of experience in international logistics, we have become 
                a trusted partner for businesses seeking reliable, efficient, and cost-effective 
                supply chain solutions across the globe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-full"
                  >
                    Partner With Us
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-full"
                  >
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern corporate office building"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 150, suffix: "+", label: "Countries Served" },
              { value: 50000, suffix: "+", label: "Shipments Delivered" },
              { value: 25, suffix: "+", label: "Years Experience" },
              { value: 99, suffix: "%", label: "Customer Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  className="text-blue-600 text-3xl md:text-4xl"
                />
                <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to global logistics leadership
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-300 transform md:-translate-x-1/2" />
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                      {milestone.year.slice(-2)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 md:w-5/12">
                      <Card className="bg-white shadow-lg border-none">
                        <CardContent className="p-6">
                          <Badge className="bg-blue-100 text-blue-800 mb-3">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Leadership <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals driving our success
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center h-full bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      whileHover={{ scale: 1.1 }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <motion.a
                      href={member.linkedin}
                      className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Certifications & <span className="gradient-text">Standards</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality and compliance
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full bg-white border-none shadow-lg">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <cert.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Global <span className="gradient-text">Presence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our offices around the world
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{office.city}</h3>
                        <p className="text-blue-600 text-sm">{office.country}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-600">{office.address}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-600">{office.phone}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-600">{office.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
