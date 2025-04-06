
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Factory, Globe, Users } from "lucide-react";

export default function Index() {
  const features = [
    {
      title: "For Factories",
      description: "Expand your export reach without hiring a dedicated team",
      icon: Factory,
      benefits: [
        "Get global visibility for your products",
        "Receive qualified leads from interested buyers",
        "Pay only for results, not for marketing efforts",
        "Customize your digital factory profile"
      ],
      cta: {
        label: "Join as Factory",
        link: "/signup"
      }
    },
    {
      title: "For Marketers",
      description: "Earn by connecting factories with international buyers",
      icon: Users,
      benefits: [
        "Choose products you understand and can promote",
        "Work with real factories and real products",
        "Earn commission on successful deals",
        "Build your expertise in international trade"
      ],
      cta: {
        label: "Join as Marketer",
        link: "/signup"
      }
    },
    {
      title: "For Buyers",
      description: "Source quality Egyptian products with personalized support",
      icon: Globe,
      benefits: [
        "Discover verified Egyptian manufacturers",
        "Get personalized assistance from local marketers",
        "Access detailed product information and specs",
        "Communicate easily through our platform"
      ],
      cta: {
        label: "Browse Products",
        link: "/products"
      }
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative hero-gradient py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
                Connect Egyptian <span className="gradient-text">Factories</span> to <span className="gradient-text">Global Markets</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                The first digital platform empowering local marketers to connect Egyptian 
                manufacturers with international buyers through a distributed export model.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-export-blue-600 hover:bg-export-blue-700 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-16">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Export Base platform" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-export-blue-600 mb-2">40k+</p>
              <p className="text-gray-600">Egyptian Factories</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-export-blue-600 mb-2">100+</p>
              <p className="text-gray-600">Export Markets</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-export-blue-600 mb-2">500+</p>
              <p className="text-gray-600">Active Marketers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-export-blue-600 mb-2">10k+</p>
              <p className="text-gray-600">Products Listed</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">How Export Base Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform connects three key stakeholders in a win-win-win model
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 flex flex-col h-full">
                <div className="p-3 bg-export-blue-100 rounded-full w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-export-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-export-blue-600 mr-2 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to={feature.cta.link} className="mt-auto">
                  <Button className="w-full">
                    {feature.cta.label}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold font-heading">Featured Products</h2>
            <Link to="/products">
              <Button variant="ghost">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Link to={`/products/${item}`} key={item} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/random/300x200?furniture&sig=${item}`} 
                      alt="Product" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-export-orange-500 font-medium mb-1">Furniture</div>
                    <h3 className="font-heading font-bold text-lg mb-2">Premium Wooden Chair</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Handcrafted wooden chair with premium leather upholstery, perfect for luxury hotels and residences.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-export-navy-700 font-medium">$120 - $150</span>
                      <span className="text-sm text-gray-500">MOQ: 50 pcs</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/products">
              <Button>
                Explore All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-export-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from factories and marketers who have grown their business with Export Base
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="mr-4 h-14 w-14 rounded-full bg-export-blue-100 flex items-center justify-center">
                  <Factory className="h-8 w-8 text-export-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Ahmed Mahmoud</h4>
                  <p className="text-gray-600">Al-Mahmoud Furniture, Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Export Base helped us reach new markets we never thought possible. Within 3 months, we received orders from 5 different countries, all through marketers on the platform."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="mr-4 h-14 w-14 rounded-full bg-export-blue-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-export-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sarah Hassan</h4>
                  <p className="text-gray-600">Export Marketer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I started as a fresh graduate with zero export experience. Through Export Base, I've connected 3 factories with buyers in the Gulf region and earned significant commissions."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-export-navy-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Grow Your Export Business?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Join Export Base today and connect with factories, marketers, or buyers from around the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup?role=factory">
                <Button size="lg" className="bg-export-orange-500 hover:bg-export-orange-600 text-black">
                  Register as Factory
                </Button>
              </Link>
              <Link to="/signup?role=marketer">
                <Button size="lg" className="bg-export-blue-600 hover:bg-export-blue-700">
                  Register as Marketer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
