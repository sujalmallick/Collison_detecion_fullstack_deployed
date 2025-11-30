import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowDown } from 'lucide-react';
import dataCollectionIcon from '@/assets/data-collection-icon.png';
import mlModelIcon from '@/assets/ml-model-icon.png';
import detectionOutputIcon from '@/assets/detection-output-icon.png';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: 'Data Collection',
      description: 'Sensors and cameras capture real-time environmental data including object positions, velocities, and trajectories.',
      details: [
        'Multi-sensor fusion (LiDAR, cameras, radar)',
        'Real-time data streaming at 100+ FPS',
        'Advanced preprocessing and noise filtering',
        'Temporal data buffering for context'
      ],
      icon: dataCollectionIcon,
      color: 'text-primary'
    },
    {
      id: 2,
      title: 'ML Processing',
      description: 'Our neural network analyzes the data using computer vision and predictive algorithms to identify potential collision scenarios.',
      details: [
        'Deep CNN for accident detection',
        'YOLO for high-speed inference',
        'Attention mechanisms for focus areas',
        'Real-time inference optimization'
      ],
      icon: mlModelIcon,
      color: 'text-secondary'
    },
    {
      id: 3,
      title: 'Detection Output',
      description: 'The system provides instant alerts with collision probability, time to impact, and recommended actions.',
      details: [
        'Risk assessment with confidence scores',
        'Multi-level alert system (warning, critical)',
        'Actionable recommendations',
        'Seamless integration with existing safety systems'
      ],
      icon: detectionOutputIcon,
      color: 'text-accent'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">How It</span>{' '}
            <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our three-stage pipeline processes data in real-time to deliver accurate collision predictions 
            with minimal latency and maximum reliability.
          </p>
        </motion.div>

        {/* Process Flow */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-start relative">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex-1 max-w-sm"
                  >
                    <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                      <CardContent className="p-8 text-center">
                        {/* Step Number */}
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto glow-primary">
                          {step.id}
                        </div>

                        {/* Icon */}
                        <div className="mb-6">
                          <img 
                            src={step.icon} 
                            alt={step.title}
                            className="w-24 h-24 mx-auto filter brightness-110 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-semibold mb-4 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                          {step.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                              {detail}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      className="flex items-center justify-center px-8 pt-20"
                    >
                      <ArrowRight className="w-8 h-8 text-primary" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Step Number */}
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 glow-primary">
                          {step.id}
                        </div>

                        <div className="flex-1">
                          {/* Icon */}
                          <img 
                            src={step.icon} 
                            alt={step.title}
                            className="w-16 h-16 mb-4 filter brightness-110"
                          />
                          
                          {/* Content */}
                          <h3 className="text-lg font-semibold mb-2 text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                            {step.description}
                          </p>

                          {/* Details */}
                          <div className="space-y-1">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center text-xs text-muted-foreground">
                                <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                {detail}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="flex justify-center"
                  >
                    <ArrowDown className="w-6 h-6 text-primary" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gradient-accent">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Processing Speed', value: '100+ FPS' },
              { label: 'Detection Range', value: '100m+' },
              { label: 'Accuracy Rate', value: '90%' },
              { label: 'Response Time', value: '<5s' }
            ].map((spec, index) => (
              <div key={index} className="glass rounded-lg p-4 border border-primary/20">
                <div className="text-lg font-bold text-gradient-primary mb-1">
                  {spec.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;