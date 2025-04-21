
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { CourseGenerator } from "@/components/CourseGenerator";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const courses = [
    {
      id: 1,
      title: "Engineer like Google",
      reviewCount: 130,
      description: "Learn system design principles and coding techniques used at Google. Build scalable applications and ace technical interviews.",
      hourlyRate: 60,
      skills: ["React", "TypeScript", "System Design"]
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      reviewCount: 156,
      description: "Comprehensive course covering front-end and back-end technologies for modern web applications.",
      hourlyRate: 55,
      skills: ["JavaScript", "Node.js", "MongoDB"]
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      reviewCount: 212,
      description: "Master fundamental data structures and algorithms essential for technical interviews and efficient coding.",
      hourlyRate: 65,
      skills: ["Algorithms", "Problem Solving", "Java"]
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      reviewCount: 98,
      description: "Introduction to machine learning concepts, techniques, and practical applications with Python.",
      hourlyRate: 70,
      skills: ["Python", "TensorFlow", "Data Science"]
    },
    {
      id: 5,
      title: "Mobile App Development",
      reviewCount: 87,
      description: "Build cross-platform mobile applications using React Native. From concept to deployment on App Store and Google Play.",
      hourlyRate: 60,
      skills: ["React Native", "JavaScript", "Mobile"]
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      reviewCount: 119,
      description: "Comprehensive guide to Amazon Web Services. Learn to design, deploy, and manage applications in the cloud.",
      hourlyRate: 75,
      skills: ["AWS", "DevOps", "Cloud"]
    },
    {
      id: 7,
      title: "UI/UX Design for Developers",
      reviewCount: 76,
      description: "Learn design principles and user experience fundamentals to create more intuitive and appealing interfaces.",
      hourlyRate: 55,
      skills: ["UI Design", "Figma", "User Experience"]
    },
    {
      id: 8,
      title: "Cybersecurity Essentials",
      reviewCount: 94,
      description: "Introduction to cybersecurity principles, threat modeling, and secure coding practices for software engineers.",
      hourlyRate: 65,
      skills: ["Security", "Encryption", "Risk Assessment"]
    },
    {
      id: 9,
      title: "Blockchain Development",
      reviewCount: 68,
      description: "Learn to develop decentralized applications and smart contracts on blockchain platforms.",
      hourlyRate: 80,
      skills: ["Solidity", "Ethereum", "Smart Contracts"]
    }
  ];
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 px-6 md:px-12">
          <div className="container mx-auto">
            <CourseGenerator />
            <h1 className="text-4xl font-bold text-center mb-4">Connect with experienced professionals</h1>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Connect with experienced professionals who can guide you through your CS career journey
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div>
                <Label htmlFor="search">Search Course</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="search"
                    placeholder="Search by title or skill..."
                    className="pl-10 bg-cssecondary border-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="expertise">Expertise</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="expertise" className="mt-2 bg-cssecondary border-gray-800">
                    <SelectValue placeholder="All Expertise" />
                  </SelectTrigger>
                  <SelectContent className="bg-csdark border-gray-800">
                    <SelectItem value="all">All Expertise</SelectItem>
                    <SelectItem value="frontend">Frontend Development</SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="fullstack">Full Stack Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="availability" className="mt-2 bg-cssecondary border-gray-800">
                    <SelectValue placeholder="Any Availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-csdark border-gray-800">
                    <SelectItem value="all">Any Availability</SelectItem>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="mornings">Mornings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id}
                  title={course.title}
                  reviewCount={course.reviewCount}
                  description={course.description}
                  hourlyRate={course.hourlyRate}
                  skills={course.skills}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;

