import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/contact-form";
import { pageTransition } from "@/lib/animations";

export default function Contact() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact <span className="text-yellow-400">Our Team</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Ready to optimize your supply chain? Get in touch with our logistics experts 
              for personalized solutions and competitive quotes tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Additional CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Great Together
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Unitas LogistiX 
              for their global logistics and supply chain needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-blue-100">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">2 Hours</div>
                <div className="text-blue-100">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">150+</div>
                <div className="text-blue-100">Countries Served</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
