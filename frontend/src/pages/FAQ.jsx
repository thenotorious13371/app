import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const FAQ = () => {
  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          q: 'What is a DMCA takedown?',
          a: 'The Digital Millennium Copyright Act (DMCA) is a US law that protects copyright owners. A DMCA takedown is a legal request to remove copyrighted content that\'s been posted without permission. We handle the entire process for you, from drafting the notice to following up with hosting providers.'
        },
        {
          q: 'Who can use your service?',
          a: 'Any content creator who holds copyright to their work can use our service. We specialize in helping OnlyFans creators, cam models, and independent adult content producers protect their intellectual property.'
        },
        {
          q: 'Do I need to be based in the US?',
          a: 'No! We work with creators worldwide. Copyright protection applies internationally through treaties like the Berne Convention, so we can file takedowns regardless of where you\'re located.'
        }
      ]
    },
    {
      category: 'Process & Timeline',
      questions: [
        {
          q: 'How long until a takedown is completed?',
          a: 'Typical timeline is 24-72 hours after we file the DMCA notice. Some sites respond faster, others take longer. Hosting providers are legally required to respond within a reasonable timeframe. We follow up aggressively to ensure compliance.'
        },
        {
          q: 'What if my request is denied?',
          a: 'If a standard DMCA request is denied or ignored, we offer escalation services including cease & desist letters, contacting upstream providers, and legal action. VIP plan includes this escalation at no extra cost.'
        },
        {
          q: 'Can you remove content from social media?',
          a: 'Yes! Major platforms like Twitter, Instagram, Reddit, and TikTok have their own DMCA processes. We\'re experienced with filing takedowns on social platforms and can help remove unauthorized posts.'
        },
        {
          q: 'What happens if content is reuploaded?',
          a: 'With Pro and VIP plans, we continuously monitor for reuploads and automatically file new takedowns. You\'ll receive alerts when we detect your content appearing again, and we\'ll handle the removal process.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          q: 'Is this confidential?',
          a: 'Yes, absolutely. We treat every case with strict confidentiality. All files you upload are encrypted and stored securely. Only authorized team members working on your case have access. We never share your information with third parties.'
        },
        {
          q: 'Do I have to reveal my real name?',
          a: 'For DMCA filings, copyright law requires the copyright owner\'s name. However, we can work with you to minimize exposure of personal details where legally possible. Contact us to discuss privacy options.'
        },
        {
          q: 'How do you store my content?',
          a: 'All uploaded files are encrypted at rest and in transit. We use enterprise-grade security with AWS or similar providers. Files are automatically deleted 90 days after case closure unless you request longer retention.'
        }
      ]
    },
    {
      category: 'Pricing & Billing',
      questions: [
        {
          q: 'Can I cancel my subscription anytime?',
          a: 'Yes! Both Pro and VIP plans are month-to-month with no long-term commitment. You can cancel anytime from your dashboard. No penalties, no questions asked.'
        },
        {
          q: 'Do you guarantee removal?',
          a: 'While we can\'t provide absolute guarantees (final compliance is up to the hosting provider), we have a 98% success rate. If standard DMCA doesn\'t work, we escalate with legal action (included in VIP, available as add-on for other plans).'
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No. The price you see is the price you pay. If you need additional services like legal escalation or priority processing, those are clearly listed as optional add-ons with transparent pricing.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and cryptocurrency (Bitcoin, Ethereum) for your convenience and privacy.'
        }
      ]
    },
    {
      category: 'Technical Questions',
      questions: [
        {
          q: 'What proof of ownership do I need?',
          a: 'We need evidence that you created the content. This can include: original files with metadata, screenshots from your OnlyFans account, watermarked versions, or any documentation showing you\'re the creator. We\'ll guide you through what\'s needed.'
        },
        {
          q: 'Can you remove content from tube sites?',
          a: 'Yes! Tube sites are one of our specialties. Sites like Pornhub, xVideos, and similar platforms have DMCA processes. We know how to navigate their systems effectively.'
        },
        {
          q: 'What if I don\'t know where my content is posted?',
          a: 'Pro and VIP plans include proactive monitoring where we scan the web for your content. You can also try reverse image search tools like Google Images or specialized services to find unauthorized copies.'
        },
        {
          q: 'Do you handle international sites?',
          a: 'Yes. While some foreign sites are less responsive to DMCA, we have strategies for international takedowns including contacting hosting providers, payment processors, and using international copyright treaties.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about protecting your content.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem
                    key={qIndex}
                    value={`${catIndex}-${qIndex}`}
                    className="bg-white border border-gray-200 rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-900">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team is here to help. Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@contentguard.com">
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Email Us
              </button>
            </a>
            <a href="/contact">
              <button className="bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Contact Form
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;