import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircularProgress } from '@/components/shared/CircularProgress';
import { Bot, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AIAssistant = () => {
  const { chatMessages, setChatMessages, quickActions, health } = useApp();
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setChatMessages([
      ...chatMessages,
      {
        id: String(Date.now()),
        role: 'user',
        content: inputValue,
        timestamp: new Date().toISOString(),
      },
      {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: "I understand your question. Based on your health profile, I can provide personalized recommendations. Is there anything specific you'd like to know about blood donation?",
        timestamp: new Date().toISOString(),
        suggestions: ['Tell me more', 'Check eligibility', 'Find drives'],
      },
    ]);
    setInputValue('');
  };

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-fade-in">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-card rounded-xl border border-border">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">HemaBot</h2>
            <p className="text-xs text-muted-foreground">AI Health Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleQuickAction(suggestion)}
                        className="text-xs bg-background/20 hover:bg-background/30 px-3 py-1 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.slice(0, 4).map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.prompt)}
                className="gap-2"
              >
                <Sparkles className="w-3 h-3" />
                {action.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask HemaBot anything..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="hidden lg:block w-80 space-y-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Your Health</h3>
          <div className="flex justify-center mb-4">
            <CircularProgress value={health.healthScore} max={100} size={100}>
              <div className="text-center">
                <p className="text-xl font-bold text-primary">{health.healthScore}</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </CircularProgress>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hemoglobin</span>
              <span className="font-medium">{health.hemoglobin} g/dL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Iron Level</span>
              <span className="font-medium">{health.ironLevel}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days to Eligibility</span>
              <span className="font-medium">{health.eligibilityDaysRemaining}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
