import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageSquare, Clock, CheckCircle, Upload } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Request, SendRequest } from "@shared/schema";
import { sendRequestSchema } from "@shared/schema";
import { format } from "date-fns";

export default function RequestsPage() {
  const [showForm, setShowForm] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<SendRequest>({
    resolver: zodResolver(sendRequestSchema),
    defaultValues: {
      subject: "",
      description: "",
      attachmentUrl: "",
    },
  });

  // Fetch user requests
  const { data: requests = [], isLoading } = useQuery<Request[]>({
    queryKey: ["/api/requests"],
  });

  // Create request mutation
  const createRequestMutation = useMutation({
    mutationFn: async (data: SendRequest) => {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create request");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests"] });
      form.reset();
      toast({
        title: "Request submitted successfully",
        description: "Your request has been sent to the admin panel",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to submit request",
        description: error.message || "Please try again",
      });
    },
  });

  const onSubmit = (data: SendRequest) => {
    createRequestMutation.mutate(data);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", icon: Clock },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-800",
      icon: Clock,
    };
    
    return (
      <Badge className={config.color}>
        <config.icon className="mr-1 h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Send Request</h1>
        <div className="flex space-x-2">
          <Button
            variant={showForm ? "default" : "outline"}
            onClick={() => setShowForm(true)}
          >
            New Request
          </Button>
          <Button
            variant={!showForm ? "default" : "outline"}
            onClick={() => setShowForm(false)}
          >
            Request History
          </Button>
        </div>
      </div>

      {showForm ? (
        /* Send Request Form */
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Send Request to Admin Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter request subject"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your request in detail..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attachmentUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Attachment (Optional)</FormLabel>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-sm text-gray-600 mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX, XLS, XLSX up to 10MB
                          </p>
                          <Input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // In a real app, you'd upload the file here
                                field.onChange(file.name);
                              }
                            }}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => {
                              const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                              input?.click();
                            }}
                          >
                            Choose File
                          </Button>
                          {field.value && (
                            <p className="text-sm text-green-600 mt-2">
                              Selected: {field.value}
                            </p>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={createRequestMutation.isPending}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    {createRequestMutation.isPending ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Request History */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Request History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No requests found</p>
                  <p className="text-sm mt-2">Submit your first request using the form above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{request.subject}</h3>
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {request.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Created: {format(new Date(request.createdAt!), "MMM dd, yyyy")}</span>
                            {request.attachmentUrl && (
                              <span className="flex items-center">
                                <Upload className="mr-1 h-3 w-3" />
                                Attachment
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}