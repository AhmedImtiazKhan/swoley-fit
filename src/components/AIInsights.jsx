import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

export default function AIInsights({ workout, muscles, goal }) {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (workout && workout.length > 0) {
      generateInsights();
    }
  }, [workout, muscles, goal]);

  const generateInsights = () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const newInsights = [];

      // Workout balance analysis
      const compoundCount = workout.filter(ex => ex.type === 'compound').length;
      const accessoryCount = workout.filter(ex => ex.type === 'accessory').length;
      
      if (compoundCount > accessoryCount) {
        newInsights.push({
          type: 'balance',
          icon: Target,
          title: 'Excellent Compound Focus',
          message: `Your workout has ${compoundCount} compound movements, which is perfect for building functional strength and muscle mass.`,
          color: 'text-green-400'
        });
      } else {
        newInsights.push({
          type: 'balance',
          icon: Target,
          title: 'Consider More Compounds',
          message: 'Adding more compound movements could maximize your muscle activation and time efficiency.',
          color: 'text-yellow-400'
        });
      }

      // Volume analysis
      const totalSets = workout.length;
      if (totalSets >= 12) {
        newInsights.push({
          type: 'volume',
          icon: TrendingUp,
          title: 'High Volume Session',
          message: `${totalSets} exercises detected. Make sure to get adequate rest between sessions for recovery.`,
          color: 'text-orange-400'
        });
      } else {
        newInsights.push({
          type: 'volume',
          icon: TrendingUp,
          title: 'Optimal Volume',
          message: `${totalSets} exercises is perfect for muscle stimulation without overtraining.`,
          color: 'text-green-400'
        });
      }

      // Goal-specific insights
      const goalInsights = {
        'strength_power': {
          title: 'Power Development Strategy',
          message: 'Focus on explosive movements and heavy loads. Rest 3-5 minutes between sets for full recovery.',
          color: 'text-red-400'
        },
        'growth_hypertrophy': {
          title: 'Hypertrophy Optimization',
          message: 'Perfect for muscle growth! Maintain controlled tempo and aim for muscle failure on final sets.',
          color: 'text-purple-400'
        },
        'cardiovascular_endurance': {
          title: 'Endurance Enhancement',
          message: 'Keep rest periods short (30-60s) to maintain elevated heart rate and improve conditioning.',
          color: 'text-blue-400'
        }
      };

      if (goalInsights[goal]) {
        newInsights.push({
          type: 'goal',
          icon: Zap,
          ...goalInsights[goal]
        });
      }

      // Form and safety tips
      const riskExercises = workout.filter(ex => 
        ex.name.includes('deadlift') || 
        ex.name.includes('squat') || 
        ex.name.includes('overhead')
      );

      if (riskExercises.length > 0) {
        newInsights.push({
          type: 'safety',
          icon: Brain,
          title: 'Form Focus Alert',
          message: `${riskExercises.length} technical exercises detected. Prioritize perfect form over heavy weight.`,
          color: 'text-yellow-400'
        });
      }

      // Recovery recommendations
      const muscleGroups = [...new Set(muscles)];
      if (muscleGroups.length >= 3) {
        newInsights.push({
          type: 'recovery',
          icon: Brain,
          title: 'Full Body Recovery',
          message: `Training ${muscleGroups.length} muscle groups. Allow 48-72 hours before training the same muscles again.`,
          color: 'text-cyan-400'
        });
      }

      setInsights(newInsights);
      setIsLoading(false);
    }, 1500);
  };

  if (!workout || workout.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="text-blue-400" size={24} />
        <h3 className="text-xl font-semibold text-white">AI Workout Analysis</h3>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-800 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500"
              >
                <div className="flex items-start gap-3">
                  <IconComponent className={insight.color} size={20} />
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                    <p className="text-slate-300 text-sm">{insight.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-800">
        <p className="text-sm text-blue-200">
          💡 <strong>AI Tip:</strong> These insights are generated based on exercise science principles and your workout parameters. 
          Listen to your body and adjust as needed!
        </p>
      </div>
    </div>
  );
} 