import React, { useState } from 'react';
import { Search, Mail, Phone, MessageCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your personal details, choose a strong password, and agree to the terms of service. Once completed, you'll receive a confirmation email to activate your account."
    },
    {
      question: "What investment options are available?",
      answer: "We offer a range of investment options including stocks and crypto. The specific options available to you may depend on your account type and risk profile. You can view all available options in the 'Investments' section of your dashboard."
    },
    {
      question: "How do I change my risk tolerance?",
      answer: "You can change your risk tolerance in the 'Settings' page. Navigate to the 'Preferences' tab and look for the 'Risk Tolerance' dropdown. Select your preferred level (Conservative, Moderate, or Aggressive) and save your changes. This will adjust your investment recommendations accordingly."
    },
    {
      question: "What fees do you charge?",
      answer: "We are free as of NOW!!"
    },
    {
      question: "How secure is my personal and financial information?",
      answer: "We take the security of your information very seriously. We use bank-level encryption, two-factor authentication, and regular security audits to protect your data. Your financial information is encrypted and never stored on your device. For more details, please review our Security Policy."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Help Center</h1>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <Mail className="w-5 h-5 inline-block mr-2" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 dark:text-gray-200">Get in touch with our support team via email.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
              abhishek.zoro@gmail.com
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Phone className="w-5 h-5 inline-block mr-2" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 dark:text-gray-200">Speak directly with our customer service representatives.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
              +91 832423434
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <MessageCircle className="w-5 h-5 inline-block mr-2" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 dark:text-gray-200">Chat with our support team in real-time.</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Start Chat</Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find quick answers to common questions.</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left font-semibold p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  <span className="text-gray-800 dark:text-gray-200">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="mt-2 p-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No matching questions found. Please try a different search term.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <FileText className="w-5 h-5 inline-block mr-2" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li><a href="#" className="text-blue-600 hover:underline dark:text-blue-400">User Guide</a></li>
            <li><a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Video Tutorials</a></li>
            <li><a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Investment Glossary</a></li>
            <li><a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Market News</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
