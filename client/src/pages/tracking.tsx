import { useState } from "react";
import { motion } from "framer-motion";
import { TrackingForm } from "@/components/tracking/tracking-form";
import { TrackingTimeline } from "@/components/tracking/tracking-timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Package, MapPin, Clock } from "lucide-react";
import { pageTransition } from "@/lib/animations";

export default function Tracking() {
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const features = [
    {
      icon: Search,
      title: "Real-Time Tracking",
      description: "Get instant updates on your shipment location and status"
    },
    {
      icon: Package,
      title: "Detailed Timeline",
      description: "View complete journey history with timestamps and locations"
    },
    {
      icon: MapPin,
      title: "GPS Location",
      description: "Precise location tracking with interactive mapping"
    },
    {
      icon: Clock,
      title: "Delivery Estimates",
      description: "Accurate delivery time predictions and notifications"
    }
  ];

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
              Advanced Shipment <span className="text-yellow-400">Tracking</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Real-time tracking with GPS location, automated notifications, 
              and comprehensive delivery timeline for complete visibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Tracking Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tracking Form */}
            <div>
              <TrackingForm onTrackingResult={setTrackingResult} />
            </div>

            {/* Tracking Result or Features */}
            <div>
              {trackingResult ? (
                <TrackingTimeline 
                  shipment={trackingResult.shipment}
                  events={trackingResult.events}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-white shadow-xl border-none">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Advanced Tracking Features
                      </h3>
                      <div className="space-y-6">
                        {features.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <motion.div
                              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white flex-shrink-0"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <feature.icon className="w-6 h-6" />
                            </motion.div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {feature.title}
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How to Track Section */}
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
              How to <span className="gradient-text">Track</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to track your shipment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Enter Tracking Number",
                description: "Input your tracking number in the form above"
              },
              {
                step: "2",
                title: "Select Service Type",
                description: "Choose the appropriate service type if known"
              },
              {
                step: "3",
                title: "View Real-Time Status",
                description: "Get detailed tracking information and timeline"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
