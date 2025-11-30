import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Eye, 
  Zap, 
  Shield, 
  Clock, 
  Gauge,
  CheckCircle,
  TrendingUp 
} from 'lucide-react';

const OverviewSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'Neural Networks',
      description: 'Deep learning models trained on hundreds of collision scenarios for good accuracy.',
      color: 'text-primary'
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'Real-time object detection and tracking using state-of-the-art vision algorithms.',
      color: 'text-secondary'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'millisecond detection times enable real-time collision prevention systems.',
      color: 'text-accent'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Designed with safety-critical applications in mind, ensuring reliable protection.',
      color: 'text-primary'
    },
    {
      icon: Clock,
      title: 'Predictive Analysis',
      description: 'Anticipate potential collisions before they happen with trajectory prediction.',
      color: 'text-secondary'
    },
    {
      icon: Gauge,
      title: 'YOLO V4',
      description: 'Used YOLO v4 for detection of the collison.',
      color: 'text-accent'
    }
  ];

  const stats = [
    { icon: CheckCircle, value: '90% +', label: 'Detection Accuracy', description: 'precision' },
    { icon: Zap, value: '<5s', label: 'Response Time', description: 'low latency processing' },

    { icon: Shield, value: '24/7', label: 'Uptime', description: 'Continuous monitoring' }
  ];

  return (
    <section id="overview" className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Revolutionary</span>{' '}
            <span className="text-foreground">Collision Detection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our cutting-edge machine learning system combines computer vision, deep learning, and 
            CNN to deliver the most accurate collision detection technology available.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-20 justify-items-center"


        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-lg p-6 text-center border border-primary/20"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.value === '99.9%' ? 'text-primary' : stat.value === '<0.5ms' ? 'text-secondary' : stat.value === '10M+' ? 'text-accent' : 'text-primary'}`} />
              <div className="text-2xl font-bold text-gradient-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-card/50 mr-4 ${feature.color} glow-primary`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gradient-accent">
            Why Choose Our System?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Proven Technology',
                description: 'tested  videos using autonomous vehicles, and industrial applications worldwide.'
              },
              {
                title: 'Easy Integration',
                description: 'RESTful APIs and SDKs make integration into existing systems quick and seamless.'
              },
              {
                title: 'CNN-Powered Detection',
description: 'Uses convolutional neural networks to identify accidents with high precision.'

              }
            ].map((benefit, index) => (
              <div key={index} className="glass rounded-lg p-6 border border-primary/20">
                <h4 className="text-lg font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;