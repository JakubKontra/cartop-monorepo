import Button from '@/components/organisms/Button/Button';
import { MessageCircleQuestionMark } from 'lucide-react';

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
