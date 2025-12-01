import { useState } from "react";
import { Link } from "wouter";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Download, 
  Calendar as CalendarIcon, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  User
} from "lucide-react";
import { mockAssessments, severityData, pdfData, timelineData } from "@/lib/mock-admin-data";
import logo from "@assets/i. AGT High Res Logo_1764417999633.png";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssessments = mockAssessments.filter(
    (a) => 
      a.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-foreground">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="AGT Logo" className="h-8 w-auto" />
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <span className="font-semibold text-lg text-gray-700">Admin Dashboard</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-primary mb-1">156</div>
              <div className="text-sm text-muted-foreground font-medium">Total Assessments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-[#2E8BC0] mb-1">23</div>
              <div className="text-sm text-muted-foreground font-medium">This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-800 mb-2">Difficulty Focusing</div>
              <div className="text-sm text-muted-foreground font-medium">Top Issue Identified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-gray-800 mb-1">7.2 <span className="text-lg font-normal text-muted-foreground">years</span></div>
              <div className="text-sm text-muted-foreground font-medium">Average Child Age</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search parent name or email..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white shadow-sm">
            <Download className="h-4 w-4 mr-2" /> Export to CSV
          </Button>
        </div>

        {/* Data Table */}
        <Card className="overflow-hidden border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[180px]">Date</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Age</TableHead>
                  <TableHead>Top Issue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((assessment) => (
                  <TableRow key={assessment.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{format(new Date(assessment.date), "yyyy-MM-dd")}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(assessment.date), "hh:mm a")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {assessment.parentName.charAt(0)}
                        </div>
                        {assessment.parentName}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{assessment.email}</TableCell>
                    <TableCell className="text-center">{assessment.childAge}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {assessment.topIssue}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                        View Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="bg-gray-50/50 border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">Page 1 of 8</span>
            <Button variant="outline" size="sm">
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Analytics Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">📊</span> Analytics Overview
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Concern Severity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Concern Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={severityData} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" fill="#3FA9F5" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* PDF Recommendations Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top PDF Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pdfData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pdfData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {pdfData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                        {entry.name}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessments Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assessments Over Time (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="assessments" stroke="#3FA9F5" strokeWidth={3} dot={{ r: 4, fill: "#3FA9F5", strokeWidth: 2, stroke: "#fff" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
