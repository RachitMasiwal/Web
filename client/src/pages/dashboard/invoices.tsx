import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, DollarSign } from "lucide-react";
import type { Bill, InvoiceFilter } from "@shared/schema";
import { format } from "date-fns";

export default function InvoicesPage() {
  const [filter, setFilter] = useState<InvoiceFilter>({
    clientInvoiceNo: "",
    fromDate: "",
    toDate: "",
  });

  // Fetch bills/invoices with current filter
  const { data: bills = [], isLoading } = useQuery<Bill[]>({
    queryKey: ["/api/bills", filter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter.clientInvoiceNo) params.set("clientInvoiceNo", filter.clientInvoiceNo);
      if (filter.fromDate) params.set("fromDate", filter.fromDate);
      if (filter.toDate) params.set("toDate", filter.toDate);
      
      const response = await fetch(`/api/bills?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch bills");
      return response.json();
    },
  });

  const handleSearch = () => {
    // Query will automatically refetch due to dependency on filter
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Invoice List</h1>
        <div className="text-sm text-gray-500">
          View and manage your billing information
        </div>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Filter Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="clientInvoiceNo">Client Invoice No</Label>
              <Input
                id="clientInvoiceNo"
                placeholder="Enter invoice number"
                value={filter.clientInvoiceNo}
                onChange={(e) => setFilter(prev => ({ ...prev, clientInvoiceNo: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                id="fromDate"
                type="date"
                value={filter.fromDate}
                onChange={(e) => setFilter(prev => ({ ...prev, fromDate: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="toDate">To Date</Label>
              <Input
                id="toDate"
                type="date"
                value={filter.toDate}
                onChange={(e) => setFilter(prev => ({ ...prev, toDate: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-4 w-4" />
                Show
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Bills</p>
                <p className="text-2xl font-bold text-blue-900">{bills.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Paid</p>
                <p className="text-2xl font-bold text-green-900">
                  {bills.filter(bill => bill.status === 'paid').length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {bills.filter(bill => bill.status === 'pending').length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Overdue</p>
                <p className="text-2xl font-bold text-red-900">
                  {bills.filter(bill => bill.status === 'overdue').length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : bills.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No invoices found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill No</TableHead>
                    <TableHead>Bill Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium text-blue-600">
                        {bill.billNo}
                      </TableCell>
                      <TableCell>
                        {format(new Date(bill.billDate), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${formatAmount(bill.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(bill.status)}>
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}