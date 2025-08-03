import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle, Clock, MapPin, Truck } from "lucide-react";
import { format } from "date-fns";

interface TrackingTimelineProps {
  shipment: any;
  events: any[];
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "package collected":
    case "delivered":
      return CheckCircle;
    case "in transit":
    case "out for delivery":
      return Truck;
    case "arrived at hub":
      return Package;
    default:
      return Clock;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-500";
    case "out for delivery":
      return "bg-blue-500";
    case "in transit":
    case "arrived at hub":
      return "bg-yellow-500";
    case "package collected":
      return "bg-gray-500";
    default:
      return "bg-gray-400";
  }
};

export function TrackingTimeline({ shipment, events }: TrackingTimelineProps) {
  if (!shipment || !events) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Shipment Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Package className="w-6 h-6" />
            Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-blue-600 font-medium">Tracking Number</p>
              <p className="text-lg font-semibold text-blue-900">{shipment.trackingNumber}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Service Type</p>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                {shipment.serviceType}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Origin</p>
              <p className="text-gray-900">{shipment.origin}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Destination</p>
              <p className="text-gray-900">{shipment.destination}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Current Status</p>
            <Badge className={`${getStatusColor(shipment.status)} text-white`}>
              {shipment.status}
            </Badge>
          </div>
          {shipment.estimatedDelivery && (
            <div>
              <p className="text-sm text-blue-600 font-medium">Estimated Delivery</p>
              <p className="text-gray-900">
                {format(new Date(shipment.estimatedDelivery), "PPP")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Tracking Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-300" />
            
            <div className="space-y-6">
              {events.map((event, index) => {
                const StatusIcon = getStatusIcon(event.status);
                const isLast = index === events.length - 1;
                
                return (
                  <motion.div
                    key={event.id}
                    className="relative flex items-start gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${getStatusColor(event.status)}`}>
                      <StatusIcon className="w-6 h-6" />
                    </div>
                    
                    {/* Event Content */}
                    <motion.div
                      className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{event.status}</h4>
                        <Badge variant="outline" className="text-xs">
                          {format(new Date(event.timestamp), "MMM dd, HH:mm")}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{event.description}</p>
                      
                      {event.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
