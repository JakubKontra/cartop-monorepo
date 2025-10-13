import { MessageCircleQuestionMark } from 'lucide-react';

import Button from '@/components/organisms/Button/Button';

const HowItWorksButton = () => {
  return (
    <div>
      <Button variant="primary" icon={<MessageCircleQuestionMark className="size-5" />}>
        Jak to funguje?
      </Button>
    </div>
  );
};

export default HowItWorksButton;
