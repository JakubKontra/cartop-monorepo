import { MessageCircleQuestionMark } from 'lucide-react';

import Button from '@/components/organisms/Button/Button';

const HowItWorksButton = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Button icon={<MessageCircleQuestionMark className="size-5" />} variant="primary">
        Jak to funguje?
      </Button>
    </div>
  );
};

export default HowItWorksButton;
