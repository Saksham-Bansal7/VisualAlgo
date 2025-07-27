import React, { useState } from "react";
import {
  ArrowRight,
  Code,
  GitBranch,
  Zap,
  Eye,
  Download,
  Play,
  CheckCircle,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const [activeExample, setActiveExample] = useState("javascript");
  const { handleTryNow } = useAuth();

  const examples = {
    javascript: {
      code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
      description: "Binary Search Algorithm",
    },
    python: {
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      description: "Bubble Sort Algorithm",
    },
    java: {
      code: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
}`,
      description: "Quick Sort Algorithm",
    },
  };

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Multi-Language Support",
      description:
        "Support for JavaScript, Python, Java, and C++ with syntax highlighting and intelligent parsing.",
      color: "text-blue-500",
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Beautiful Flowcharts",
      description:
        "Generate beautiful flowcharts that help visualize your algorithm's logic flow.",
      color: "text-green-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Generation",
      description:
        "AI-powered analysis generates flowcharts in seconds, saving you hours of manual diagramming.",
      color: "text-yellow-500",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visual Understanding",
      description:
        "Transform complex algorithms into easy-to-understand visual representations.",
      color: "text-purple-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Algorithm Analysis",
      description:
        "Get insights into your algorithm's complexity and performance characteristics.",
      color: "text-indigo-500",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Paste Your Code",
      description:
        "Simply paste your algorithm code into our intelligent editor with syntax highlighting.",
    },
    {
      step: "2",
      title: "Select Language",
      description:
        "Choose from JavaScript, Python, Java, or C++ - our AI understands them all.",
    },
    {
      step: "3",
      title: "Generate Flowchart",
      description:
        "Click generate and watch as AI analyzes your code and creates a beautiful flowchart.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar isLandingPage={true} />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Transform Code into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {" "}
                Visual Magic
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Convert your algorithms into beautiful, interactive flowcharts
              instantly. Perfect for learning, teaching, and understanding
              complex code logic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleTryNow}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
              >
                <Play className="mr-2" size={20} />
                Try It Now
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Powerful Features for
              <span className="text-purple-600"> Every Developer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to visualize, understand, and share your
              algorithms effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              How It <span className="text-purple-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get from code to flowchart in just four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              See It In <span className="text-purple-600">Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore real examples of how VisualAlgo transforms code into
              beautiful flowcharts.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Language Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg">
                {Object.keys(examples).map((lang) => (
                  <button
                    key={lang}
                    className={`px-6 py-2 rounded-md transition-colors ${
                      activeExample === lang
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveExample(lang)}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {examples[activeExample].description}
                </h3>
                <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{examples[activeExample].code}</pre>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <ArrowRight
                    className="text-purple-600 mx-auto mb-4"
                    size={48}
                  />
                  <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-lg font-semibold text-gray-900">
                      Beautiful Flowchart
                    </p>
                    <p className="text-gray-600">Generated instantly with AI</p>
                    <button
                      onClick={handleTryNow}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors mt-4 flex items-center mx-auto"
                    >
                      <Play className="mr-2" size={16} />
                      Try This Example
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Visualize Your Code?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers, students, and educators who use
            VisualAlgo to understand and teach algorithms better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleTryNow}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Code className="mr-2" size={20} />
              Start Creating Flowcharts
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
