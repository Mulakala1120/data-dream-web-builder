
import React from "react";
import { 
  Star, 
  Quote 
} from "lucide-react";

const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}> = ({ quote, author, role, company, rating }) => {
  return (
    <div className="data-card">
      <div className="flex justify-between items-start mb-4">
        <Quote className="h-10 w-10 text-dataBlue-200" />
        <div className="flex">
          {Array.from({ length: rating }).map((_, index) => (
            <Star key={index} className="h-5 w-5 fill-dataTeal-500 text-dataTeal-500" />
          ))}
        </div>
      </div>
      <p className="text-foreground italic mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}, {company}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Client <span className="data-gradient">Testimonials</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — see what our clients have to say about our data engineering services.
          </p>
        </div>

        <div className="data-grid">
          <TestimonialCard
            quote="The data warehouse they built transformed how we make decisions. We now have real-time access to insights that used to take weeks to compile."
            author="Sarah Johnson"
            role="CTO"
            company="TechNova Inc."
            rating={5}
          />
          
          <TestimonialCard
            quote="Their team's expertise in designing scalable data pipelines helped us handle a 5x increase in data volume without any performance issues."
            author="Michael Chang"
            role="Data Science Director"
            company="Analytics Advantage"
            rating={5}
          />
          
          <TestimonialCard
            quote="We were struggling with data silos across our organization. Their integration solution unified our data and improved cross-departmental collaboration."
            author="Jennifer Williams"
            role="VP of Operations"
            company="Global Solutions Group"
            rating={4}
          />
          
          <TestimonialCard
            quote="The optimization work done on our existing data infrastructure reduced our cloud costs by 40% while improving query performance."
            author="David Rodriguez"
            role="IT Director"
            company="EnterpriseScale"
            rating={5}
          />
          
          <TestimonialCard
            quote="Their data governance framework helped us achieve compliance with industry regulations while maintaining data accessibility for our teams."
            author="Lisa Chen"
            role="Compliance Officer"
            company="HealthTech Systems"
            rating={5}
          />
          
          <TestimonialCard
            quote="Working with them was seamless. They understood our business requirements and translated them into an effective data architecture."
            author="Robert Mitchell"
            role="CEO"
            company="StartupInnovate"
            rating={4}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
