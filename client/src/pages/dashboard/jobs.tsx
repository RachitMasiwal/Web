import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Package, AlertCircle } from "lucide-react";
import type { Job, JobFile, JobFilter } from "@shared/schema";
import { format } from "date-fns";

interface JobWithFiles extends Job {
  files?: JobFile[];
}

export default function JobsPage() {
  const [filter, setFilter] = useState<JobFilter>({
    clientInvoiceNo: "",
    fromDate: "",
    toDate: "",
  });
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  // Fetch jobs with current filter
  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs", filter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter.clientInvoiceNo) params.set("clientInvoiceNo", filter.clientInvoiceNo);
      if (filter.fromDate) params.set("fromDate", filter.fromDate);
      if (filter.toDate) params.set("toDate", filter.toDate);
      
      const response = await fetch(`/api/jobs?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    },
  });

  // Fetch job details when a job is selected
  const { data: jobDetails } = useQuery<{ job: Job; files: JobFile[] }>({
    queryKey: ["/api/jobs", selectedJob],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${selectedJob}`);
      if (!response.ok) throw new Error("Failed to fetch job details");
      return response.json();
    },
    enabled: !!selectedJob,
  });

  const handleSearch = () => {
    // Query will automatically refetch due to dependency on filter
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-transit": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
        <div className="text-sm text-gray-500">
          Manage your logistics jobs and shipments
        </div>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Filter Jobs</CardTitle>
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

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Job List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No jobs found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job No</TableHead>
                    <TableHead>Job Date</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>MBL</TableHead>
                    <TableHead>MBL Date</TableHead>
                    <TableHead>PKG</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow 
                      key={job.id}
                      className={selectedJob === job.id ? "bg-blue-50" : ""}
                    >
                      <TableCell className="font-medium text-blue-600">
                        {job.jobNo}
                      </TableCell>
                      <TableCell>
                        {format(new Date(job.jobDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {job.invoiceDate ? format(new Date(job.invoiceDate), "dd/MM/yyyy") : "-"}
                      </TableCell>
                      <TableCell>{job.destination}</TableCell>
                      <TableCell>{job.mbl || "-"}</TableCell>
                      <TableCell>
                        {job.mblDate ? format(new Date(job.mblDate), "dd/MM/yyyy") : "-"}
                      </TableCell>
                      <TableCell>{job.pkg || "-"}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedJob(job.id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Details */}
      {selectedJob && jobDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">
                Selected Job: {jobDetails.job.jobNo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="files" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="files">File List</TabsTrigger>
                  <TabsTrigger value="bills">Bill List</TabsTrigger>
                  <TabsTrigger value="status">Shipment Status</TabsTrigger>
                </TabsList>
                
                <TabsContent value="files" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      File List
                    </h3>
                    {jobDetails.files.length === 0 ? (
                      <p className="text-gray-500 text-sm">No files available for this job</p>
                    ) : (
                      <div className="grid gap-2">
                        {jobDetails.files.map((file) => (
                          <div 
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <div>
                                <div className="font-medium">{file.fileName}</div>
                                <div className="text-sm text-gray-500">{file.fileType}</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="bills" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Bill List</h3>
                    <p className="text-gray-500 text-sm">
                      Bill information will be displayed here when available
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="status" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Shipment Status
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-blue-900">Status: {jobDetails.job.status}</div>
                          <div className="text-sm text-blue-700 mt-1">
                            Last updated: {format(new Date(jobDetails.job.updatedAt!), "dd/MM/yyyy HH:mm")}
                          </div>
                        </div>
                        <Badge className={getStatusBadge(jobDetails.job.status)}>
                          {jobDetails.job.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}