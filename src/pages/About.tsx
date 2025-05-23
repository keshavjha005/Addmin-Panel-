
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="cosmic-glass bg-cosmic-dark/40 border-cosmic-light/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cosmic-light">About Astral Insights</CardTitle>
        </CardHeader>
        <CardContent className="text-cosmic-light/90 space-y-4">
          <p>
            Welcome to Astral Insights, your premier destination for cosmic wisdom and astrological guidance. 
            Founded in 2022, our platform brings together ancient wisdom and modern insights to help you 
            navigate your cosmic journey.
          </p>
          
          <h3 className="text-xl font-semibold text-cosmic-light mt-6">Our Mission</h3>
          <p>
            At Astral Insights, we believe that the alignment of celestial bodies offers profound insights 
            into our lives, relationships, and destinies. Our mission is to make this cosmic wisdom 
            accessible to everyone, helping you harness the power of the stars to illuminate your path.
          </p>
          
          <h3 className="text-xl font-semibold text-cosmic-light mt-6">Our Team</h3>
          <p>
            Our team consists of experienced astrologers, cosmic practitioners, and digital innovators 
            who are passionate about bridging the gap between ancient wisdom and modern technology. 
            With decades of combined experience, our experts bring authentic knowledge to every horoscope, 
            chart, and reading.
          </p>
          
          <h3 className="text-xl font-semibold text-cosmic-light mt-6">Our Services</h3>
          <p>
            We offer a wide range of services including personalized birth charts, compatibility analyses, 
            daily horoscopes, and cosmic guidance for important life decisions. Our custom Kundli readings 
            provide deep insights into your life's journey based on ancient Vedic astrology principles.
          </p>
          
          <h3 className="text-xl font-semibold text-cosmic-light mt-6">Our Philosophy</h3>
          <p>
            We believe that astrology is not about predetermining your fate, but about understanding the 
            energetic influences that shape your experiences. By gaining awareness of these cosmic patterns, 
            you can make more informed choices and navigate life with greater confidence and clarity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
