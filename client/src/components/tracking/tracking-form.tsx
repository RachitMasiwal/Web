import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Search, Package } from "lucide-react";
import { trackingRequestSchema, type TrackingRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TrackingFormProps {
  onTrackingResult: (data: any) => void;
}

export function TrackingForm({ onTrackingResult }: TrackingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<TrackingRequest>({
    resolver: zodResolver(trackingRequestSchema),
    defaultValues: {
      trackingNumber: "",
      serviceType: undefined,
    },
  });

  const onSubmit = async (data: TrackingRequest) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/tracking", data);
      const result = await response.json();
      onTrackingResult(result);
      toast({
        title: "Tracking Found",
        description: "Your shipment details have been loaded.",
      });
    } catch (error) {
      toast({
        title: "Tracking Not Found",
        description: "Please check your tracking number and try again.",
        variant: "destructive",
      });
      onTrackingResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white shadow-xl border-none">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Search className="w-6 h-6" />
            Track Your Shipment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Tracking Number</FormLabel>
                    <FormControl>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          {...field}
                          placeholder="Enter tracking number (e.g., ULX123456789)"
                          className="form-input text-lg py-3"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">Service Type (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <SelectTrigger className="form-input text-lg py-3">
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </motion.div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Air Freight">Air Freight</SelectItem>
                        <SelectItem value="Ocean Freight">Ocean Freight</SelectItem>
                        <SelectItem value="Ground Transport">Ground Transport</SelectItem>
                        <SelectItem value="Warehousing">Warehousing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-logistics-primary py-4 text-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="loading-spinner w-5 h-5" />
                      Tracking...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Track Shipment
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Sample Tracking Numbers:</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div>• ULX123456789 (Air Freight - Out for Delivery)</div>
              <div>• ULX987654321 (Ocean Freight - In Transit)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
