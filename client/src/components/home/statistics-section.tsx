import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Globe, Package, Clock, Award } from "lucide-react";

const statistics = [
  {
    icon: Globe,
    value: 150,
    suffix: "+",
    label: "Countries Served",
    description: "Global reach across all continents"
  },
  {
    icon: Package,
    value: 50000,
    suffix: "+",
    label: "Shipments Delivered",
    description: "Successful deliveries annually"
  },
  {
    icon: Clock,
    value: 25,
    suffix: "+",
    label: "Years Experience",
    description: "Decades of logistics expertise"
  },
  {
    icon: Award,
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Consistently high customer ratings"
  }
];

export function StatisticsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our commitment to excellence is reflected in our track record of success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm animate-morphing"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.8 }
                }}
              >
                <stat.icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <div className="mb-2">
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  className="text-white"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>
              
              <p className="text-blue-100 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
