import { useLocation } from 'react-router-dom';
import PlanEventModal from '../components/PlanEventModal';

export default function PlanYourEvent() {
  const location = useLocation();
  const initialCategory = location.state?.category || 'Weddings';

  return <PlanEventModal open={true} onClose={() => window.history.back()} initialCategory={initialCategory} />;
}
