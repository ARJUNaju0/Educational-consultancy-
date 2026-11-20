import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import PartnerColleges from "@/components/PartnerColleges";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import EnquiryForm from "@/components/EnquiryForm";
import Impact from "@/components/Impact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Impact />
      <About />
      <Courses />
      <PartnerColleges />
      <WhyChooseUs />
      <Contact />
      <EnquiryForm />
    </>
  );
}
