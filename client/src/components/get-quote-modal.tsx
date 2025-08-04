import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getQuoteSchema, type GetQuote } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetQuoteModal({ isOpen, onClose }: GetQuoteModalProps) {
  const { toast } = useToast();

  const form = useForm<GetQuote>({
    resolver: zodResolver(getQuoteSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      email: "",
      companyName: "",
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: GetQuote) => {
      return apiRequest("/api/get-quote", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Quote request submitted!",
        description: "We'll get back to you within 24 hours with a customized quote.",
      });
      form.reset();
      onClose();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to submit quote request",
        description: error.message || "Please try again later",
      });
    },
  });

  const onSubmit = (data: GetQuote) => {
    submitQuoteMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Get a Quote
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill out the form below and we'll send you a customized quote for our logistics services.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...form.register("name")}
              className="h-10"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Enter your phone number"
              {...form.register("contactNumber")}
              className="h-10"
            />
            {form.formState.errors.contactNumber && (
              <p className="text-sm text-red-600">{form.formState.errors.contactNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...form.register("email")}
              className="h-10"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Enter your company name"
              {...form.register("companyName")}
              className="h-10"
            />
            {form.formState.errors.companyName && (
              <p className="text-sm text-red-600">{form.formState.errors.companyName.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={submitQuoteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 btn-logistics-primary"
              disabled={submitQuoteMutation.isPending}
            >
              {submitQuoteMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}