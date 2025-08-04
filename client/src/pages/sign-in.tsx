import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Truck, Eye, EyeOff, Users, Shield } from "lucide-react";
import { signInSchema, type SignIn } from "@shared/schema";
import { useSignIn } from "@/hooks/useAuth";

export default function SignInPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'admin' | null>(null);
  const { toast } = useToast();
  const signInMutation = useSignIn();

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      recaptcha: "test-token", // In real app, this would be from reCAPTCHA
    },
  });

  const onSubmit = async (data: SignIn) => {
    try {
      await signInMutation.mutateAsync(data);
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "Please check your credentials",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Unitas LogistiX</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Choose your role and sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedRole ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">Select Your Role</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => setSelectedRole('customer')}
                  >
                    <Users className="w-6 h-6 text-blue-600" />
                    <span className="font-medium">Customer Portal</span>
                    <span className="text-xs text-gray-500">Access your shipments and quotes</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => setSelectedRole('admin')}
                  >
                    <Shield className="w-6 h-6 text-blue-600" />
                    <span className="font-medium">Admin Portal</span>
                    <span className="text-xs text-gray-500">Manage operations and clients</span>
                  </Button>
                </div>
                
                <div className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <a className="text-blue-600 hover:text-blue-800 font-medium">
                      Sign Up
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {selectedRole === 'customer' ? (
                      <Users className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Shield className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="font-medium text-gray-900">
                      {selectedRole === 'customer' ? 'Customer Portal' : 'Admin Portal'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRole(null)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Change Role
                  </Button>
                </div>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                  className="h-11"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...form.register("password")}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
                )}
              </div>

              {/* Note: In production, integrate Google reCAPTCHA here */}
              <div className="bg-gray-50 p-3 rounded-lg text-center text-sm text-gray-600">
                reCAPTCHA validation (simulated)
              </div>

              <Button
                type="submit"
                className="w-full btn-logistics-primary h-11"
                disabled={signInMutation.isPending}
              >
                {signInMutation.isPending ? "Signing In..." : "Sign In"}
              </Button>

                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signup">
                      <a className="text-blue-600 hover:text-blue-800 font-medium">
                        Sign Up
                      </a>
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}